import os
from domain.slide_image_loader import has_slide_images, load_slide_images, slide_file_dir_of, slide_file_path_of, slide_images_dir_of

from domain.values.slide_images import SlideImages
from pdf2image import convert_from_path


def get_slide_images(id, path) -> SlideImages:
    def mkdir_if_not_exists(dir):
        if not os.path.isdir(dir):
            os.mkdir(dir)

    def save_slide_images(slide_file_path, slide_images_dir):
        images = convert_from_path(slide_file_path)
        for i in range(len(images)):
            save_path = os.path.join(
                slide_images_dir, f'page{str(i).zfill(3)}.jpg')
            images[i].save(save_path, 'JPEG')

    if not has_slide_images(id):
        slide_file_dir = slide_file_dir_of(id)
        slide_file_path = slide_file_path_of(id)
        slide_images_dir = slide_images_dir_of(id)

        mkdir_if_not_exists(slide_file_dir)
        mkdir_if_not_exists(slide_images_dir)
        save_slide_images(slide_file_path, slide_images_dir)
    return load_slide_images(id)


def put_slide_images(id):
    pass
