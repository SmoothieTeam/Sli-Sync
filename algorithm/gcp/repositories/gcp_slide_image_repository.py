import os
import cv2
from domain.slide_image_loader import slide_file_dir_of, slide_file_path_of, slide_image_file_paths_of, slide_images_dir_of
from domain.values.slide_images import RawSlideImages
from gcp.gcp_wapper import firebase_storage
from pdf2image import convert_from_path


bucket = firebase_storage()


def get_slide_images(id, slide_storage_path):
    def mkdir_if_not_exists(dir):
        if not os.path.isdir(dir):
            os.mkdir(dir)

    def download_slide(slide_storage_path, slide_file_path):
        blob = bucket.get_blob(slide_storage_path)
        blob.download_to_filename(slide_file_path)

    def save_slide_images(slide_file_path, slide_images_dir):
        images = convert_from_path(slide_file_path)
        for i in range(len(images)):
            save_path = os.path.join(
                slide_images_dir, f'page{str(i).zfill(3)}.jpg')
            images[i].save(save_path, 'JPEG')

    slide_file_dir = slide_file_dir_of(id)
    slide_file_path = slide_file_path_of(id)
    slide_images_dir = slide_images_dir_of(id)

    mkdir_if_not_exists(slide_file_dir)
    mkdir_if_not_exists(slide_images_dir)

    download_slide(slide_storage_path, slide_file_path)
    save_slide_images(slide_file_path, slide_images_dir)

    slide_image_file_paths = slide_image_file_paths_of(id)
    slide_images = [cv2.imread(file_path)
                    for file_path in slide_image_file_paths]
    return RawSlideImages(slide_images)


def put_slide_images(id):
    for file_path in slide_image_file_paths_of(id):
        slide_image_storage_path = file_path
        blob = bucket.get_blob(slide_image_storage_path)
        blob.upload_from_filename(file_path)
