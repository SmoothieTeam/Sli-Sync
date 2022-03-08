from time import time
from skimage.metrics import mean_squared_error
from adapters.values.message import Message
from adapters.find_frame_mask import find_frame_mask
from adapters.timed_frame_generator_filter import rate_generator_filter
from adapters.timed_frame_predicates import has_slide_image, is_slide_image
from domain.classifier import classify_all_frame, simple_classifier
from domain.common_loader import clean_working_dir
import local.local_message_dispatcher as local_message_dispacher
import gcp.repositories.gcp_post_repository as gcp_post_repository
import gcp.repositories.gcp_slide_image_repository as gcp_slide_image_repository
import gcp.repositories.gcp_video_repository as gcp_video_repository


def on_listen(message: Message):
    message = Message('DNdnA46Nbyh2OP63Gs18',
                      'DNdnA46Nbyh2OP63Gs18/index.mp4', 'DNdnA46Nbyh2OP63Gs18/slide.pdf')
    id = message.id
    slide_repository_path = message.slide_repository_path
    video_repository_path = message.video_repository_path

    def has_video_full_slide():
        with gcp_video_repository.get_video(id, video_repository_path, 30) as video:
            video.take(5)
            return any(map(is_slide_image, video.timed_frames))

    def get_frame_mask():
        if has_video_full_slide():
            return None
        slide_images = gcp_slide_image_repository.get_slide_images(
            id, slide_repository_path)
        with gcp_video_repository.get_video(id, video_repository_path, 30) as video:
            video.filter(has_slide_image).take(5)
            return find_frame_mask(video, slide_images, 6)

    height_scale = 200
    distance = mean_squared_error
    slide_images = gcp_slide_image_repository.get_slide_images(
        id, slide_repository_path)
    slide_images.rescale(height=height_scale)
    threshold = slide_images.min_distance(distance)
    frame_mask = get_frame_mask()

    with gcp_video_repository.get_video(id, video_repository_path, 1) as video:
        video \
            .mask(frame_mask) \
            .resize(slide_images.size) \
            .filter_generator(rate_generator_filter(distance, threshold)) \
            .filter(is_slide_image)
        classifier = simple_classifier(distance)
        timelines = classify_all_frame(id, video, slide_images,
                                       classifier, gcp_post_repository.set_progress)
    gcp_post_repository.set_timelines(id, timelines)
    gcp_slide_image_repository.put_slide_images(id)
    clean_working_dir(id)


def main():
    start = time()
    local_message_dispacher.listen(on_listen)
    print(time() - start)


if __name__ == '__main__':
    main()
