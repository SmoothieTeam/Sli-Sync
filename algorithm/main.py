from time import time
from skimage.metrics import mean_squared_error
from adapters.values.message import Message
from adapters.find_frame_mask import find_frame_mask
from adapters.timed_frame_generator_filter import rate_generator_filter
from adapters.timed_frame_predicates import has_slide_image, is_slide_image
from domain.classifier import classify_all_frame, simple_classifier
from domain.slide_image_loader import extract_slide_images, get_slide_images
from domain.values.path import Path
from domain.values.timelines import Timelines
from domain.video_loader import get_video
from gcp.repositories.gcp_post_repository import set_progress, set_timelines
from gcp.repositories.gcp_slide_image_repository import download_slide, put_slide_images
from gcp.repositories.gcp_video_repository import download_video
from local.local_message_dispatcher import listen


def on_listen(message: Message):
    id = message.id
    slide_path = message.slide_path
    video_path = message.video_path

    __download_assets(message)
    extract_slide_images(message.slide_path)
    put_slide_images(id, slide_path)

    __classify(id, slide_path, video_path)
    __clean_working_dir(slide_path, video_path)


def __download_assets(message: Message):
    download_slide(message)
    download_video(message)


def __classify(id: str, slide_path: Path, video_path: Path) -> Timelines:
    height_scale = 200
    distance = mean_squared_error
    slide_images = get_slide_images(slide_path)
    slide_images.rescale(height=height_scale)
    threshold = slide_images.min_distance(distance)
    frame_mask = __get_frame_mask(slide_path, video_path)

    with get_video(video_path, 1) as video:
        video \
            .mask(frame_mask) \
            .resize(slide_images.size) \
            .filter_generator(rate_generator_filter(distance, threshold)) \
            .filter(is_slide_image)
        classifier = simple_classifier(distance)
        return classify_all_frame(id, video, slide_images,
                                  classifier, set_progress, __finish_progress)


def __finish_progress(id: str, timelines: Timelines):
    set_timelines(id, timelines)
    set_progress(id, 1)


def __get_frame_mask(slide_path: Path, video_path: Path):
    if __has_video_full_slide(video_path):
        return None
    slide_images = get_slide_images(slide_path)
    with get_video(video_path, 30) as video:
        video.filter(has_slide_image).take(5)
        return find_frame_mask(video, slide_images, 6)


def __has_video_full_slide(video_path: Path):
    with get_video(video_path, 30) as video:
        video.take(5)
        return any(map(is_slide_image, video.timed_frames))


def __clean_working_dir(slide_path: Path, video_path: Path):
    slide_path.directory.rmdir()
    video_path.directory.rmdir()


def main():
    start = time()
    listen(on_listen)
    print(time() - start)


if __name__ == '__main__':
    main()
