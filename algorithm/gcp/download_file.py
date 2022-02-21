import os
from google.cloud import storage
from gcp_settings import BUCKET_ID

client = storage.Client()
bucket = client.get_bucket(BUCKET_ID)


def __getFile(cloud_path, destination) -> None:
    blob = bucket.get_blob(cloud_path)
    blob.download_to_filename(destination)


def getVideoFile(filename) -> str:
    destination = f'./{filename}'
    __getFile(f'posts/video/{filename}', destination)
    return destination


def getPDFFile(filename) -> str:
    destination = f'./{filename}'
    __getFile(f'posts/pdf/{filename}', destination)
    return destination


def uploadPDFImages(directory) -> None:
    files = os.listdir(directory)
    for file in files:
        filename = file.split('/')[-1]
        blob = bucket.get_blob(f'posts/imgs/{filename}')
        blob.upload_from_filename(file)
