import os
from adapters.values.message import Message
from domain.slide_image_loader import slide_images_dir_of
from domain.values.path import Path, Directory
from gcp.gcp_wapper import firebase_storage


bucket = firebase_storage()


def download_slide(message: Message):
    slide_storage_path = __message_to_slide_storage_path(message)
    blob = bucket.blob(slide_storage_path)
    slide_path = message.slide_path

    slide_path.directory.mkdir()
    blob.download_to_filename(slide_path.full_path)


def __message_to_slide_storage_path(message: Message) -> str:
    id = message.id
    slide_filename = message.slide_filename

    return f'{id}/{slide_filename}'


def put_slide_images(id: str, slide_path: Path):
    slide_images_dir = slide_images_dir_of(slide_path.directory)
    for slide_image_file_path in slide_images_dir.files:
        slide_image_filename = slide_image_file_path.filename
        slide_image_storage_path = f'{id}/slide_images/{slide_image_filename}'
        blob = bucket.blob(slide_image_storage_path)
        blob.upload_from_filename(slide_image_file_path.full_path)
