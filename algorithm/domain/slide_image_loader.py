import cv2

from domain.values.path import Path, Directory
from domain.values.slide_images import SlideImages
from pdf2image import convert_from_path


def extract_slide_images(slide_path: Path):
    slide_file_dir = slide_path.directory
    slide_images_dir = slide_images_dir_of(slide_file_dir)

    slide_file_dir.mkdir()
    slide_images_dir.mkdir()
    __save_slide_images(slide_path, slide_images_dir)


def slide_images_dir_of(slide_file_dir: Directory) -> Directory:
    slide_images_dir = Directory('slide_images')
    return slide_file_dir.append(slide_images_dir)


def __save_slide_images(slide_file_path: Path, slide_images_dir: Directory):
    images = convert_from_path(slide_file_path.full_path)
    for i in range(len(images)):
        slide_image_path = _slide_image_path(slide_images_dir, i)
        images[i].save(slide_image_path.full_path, 'JPEG')


def _slide_image_path(slide_images_dir: Directory, index: int) -> Path:
    return Path(slide_images_dir, f'page{str(index).zfill(3)}.jpg')


def get_slide_images(path: Path) -> SlideImages:
    slide_images_dir = slide_images_dir_of(path.directory)
    paths = slide_images_dir.files
    slide_images = [cv2.imread(path.full_path) for path in paths]

    return SlideImages(slide_images)
