from adapters.slide_image_loader import extract_slide_images
from adapters.values.message import Message
from gcp.repositories.gcp_post_repository import set_progress, set_timelines
from gcp.repositories.gcp_slide_image_repository import download_slide, put_slide_images
from gcp.repositories.gcp_video_repository import download_video


class GCPClassifyListener:
    def __init__(self, message: Message):
        self.__message = message

    def on_start(self):
        download_slide(self.__message)
        download_video(self.__message)
        extract_slide_images(self.__message.slide_path)
        put_slide_images(self.__message.id, self.__message.slide_path)

    def on_progress(self, progress):
        set_progress(self.__message.id, progress)

    def on_finish(self, timelines):
        set_timelines(self.__message.id, timelines)
        set_progress(self.__message.id, 1)
