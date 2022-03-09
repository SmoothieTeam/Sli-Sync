import os
from domain.slide_image_loader import load_slide_images, slide_file_dir_of, slide_file_path_of, slide_image_file_paths_of, slide_images_dir_of
from domain.video_loader import mkdir_if_not_exists
from gcp.gcp_wapper import firebase_storage
from pdf2image import convert_from_path


bucket = firebase_storage()


def get_slide_images(id, slide_storage_path):
    def download_slide(slide_storage_path, slide_file_path):
        blob = bucket.blob(slide_storage_path)
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
    return load_slide_images(id)


def put_slide_images(id):
    for slide_image_file_path in slide_image_file_paths_of(id):
        slide_image_filename = slide_image_file_path.split(os.sep)[-1]
        slide_image_storage_path = f'{id}/slide_images/{slide_image_filename}'
        blob = bucket.blob(slide_image_storage_path)
        blob.upload_from_filename(slide_image_file_path)
