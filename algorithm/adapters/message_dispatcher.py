from adapters.values.message import Message
from domain.post_uploader import PostUploader
from domain.values.path import Path


def dispatch_message(message: Message, classifier, data_loader, post_uploader: PostUploader):
    def __message_to_video_path(message: Message):
        return Path(message.id, message.video_repository_path)

    def __message_to_slide_path(message: Message):
        return Path(message.id, message.slide_repository_path)

    def __on_progress(progress):
        id = message.id
        post_uploader.update_progress(id, progress)

    video_path = __message_to_video_path(message)
    slide_image_path = __message_to_slide_path(message)
    video, slide_images = data_loader.load(video_path, slide_image_path)
    timelines = classifier.classify_all_frame(video, slide_images,
                                              __on_progress)
    post_uploader.upload_timelines(timelines)
    post_uploader.upload_slide_images(slide_image_path)
