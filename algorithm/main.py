from time import time
from skimage.metrics import mean_squared_error
from adapters.values.message import Message
from adapters.find_frame_mask import find_frame_mask
from adapters.timed_frame_generator_filter import rate_generator_filter
from adapters.timed_frame_predicates import has_slide_image, is_slide_image
from domain.classifier import classify_all_frame, simple_classifier
from domain.common_loader import clean_working_dir
from local.local_message_dispatcher import listen
from local.repositories.local_post_repository import set_progress, set_timelines
from local.repositories.local_slide_image_repository import get_slide_images, put_slide_images
from local.repositories.local_video_repository import get_video


def on_listen(message: Message):
    id = message.id
    video_repository_path = message.video_repository_path

    def is_video_full_slide():
        with get_video(id, video_repository_path, 30) as video:
            video.take(5)
            return any(map(is_slide_image, video.timed_frames))

    def get_frame_mask():
        if is_video_full_slide():
            return None
        slide_images = get_slide_images(id, None)
        with get_video(id, video_repository_path, 30) as video:
            video.filter(has_slide_image).take(5)
            return find_frame_mask(video, slide_images, 6)

    height_scale = 200
    distance = mean_squared_error
    slide_images = get_slide_images(id, None)
    slide_images.rescale(height=height_scale)
    threshold = slide_images.min_distance(distance)

    with get_video(id, video_repository_path, 1) as video:
        video \
            .mask(get_frame_mask()) \
            .resize(slide_images.size) \
            .filter_generator(rate_generator_filter(distance, threshold)) \
            .filter(is_slide_image)
        classifier = simple_classifier(distance)
        timelines = classify_all_frame(id, video, slide_images,
                                       classifier, set_progress)
        set_timelines(id, timelines)
        put_slide_images(id)
        clean_working_dir(id)


def main():
    start = time()
    listen(on_listen)
    print(time() - start)


if __name__ == '__main__':
    main()
