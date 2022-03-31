from adapters.values.message import Message
from domain.values.path import Path
from gcp.gcp_wapper import firebase_storage


bucket = firebase_storage()


def download_video(message: Message):
    video_storage_path = _message_to_video_storage_path(message)
    blob = bucket.get_blob(video_storage_path)
    video_path = message.video_path

    video_path.directory.mkdir()
    blob.download_to_filename(video_path.full_path)


def _message_to_video_storage_path(message: Message) -> str:
    id = message.id
    video_filename = message.video_filename

    return f'{id}/{video_filename}'
