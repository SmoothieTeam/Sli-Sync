from adapters.slide_image_loader import extract_slide_images
from adapters.values.message import Message
from local.repositories.local_post_repository import set_progress, set_timelines


class LocalClassifyListener:
    def __init__(self, message: Message):
        self.__message = message

    def on_start(self):
        extract_slide_images(self.__message.slide_path)

    def on_progress(self, progress):
        set_progress(self.__message.id, progress)

    def on_finish(self, timelines):
        set_timelines(self.__message.id, timelines)
        set_progress(self.__message.id, 1)
