import os
import cv2
from domain.common_loader import working_dir_of

from domain.values.slide_images import SlideImages


def slide_file_dir_of(id: str):
    return working_dir_of(id)


def slide_file_path_of(id: str):
    return os.path.join(slide_file_dir_of(id), 'slide.pdf')


def slide_images_dir_of(id: str):
    return os.path.join(slide_file_dir_of(id), 'slide_images')


def slide_image_file_names_of(id: str):
    slide_images_dir = slide_images_dir_of(id)
    filenames = os.listdir(slide_images_dir)
    filenames = sorted(list(filenames))
    return filenames


def slide_image_file_paths_of(id: str):
    slide_images_dir = slide_images_dir_of(id)
    filenames = slide_image_file_names_of(id)
    paths = list(map(lambda filename: os.path.join(slide_images_dir, filename),
                     filenames))
    return paths


def load_slide_images(id: str):
    slide_image_file_paths = slide_image_file_paths_of(id)
    slide_images = [cv2.imread(file_path)
                    for file_path in slide_image_file_paths]
    return SlideImages(slide_images)
