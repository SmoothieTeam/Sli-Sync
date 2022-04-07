from adapters.frame_mask import get_frame_mask
from adapters.slide_image_loader import get_slide_images
from adapters.timed_frame_predicates import has_slide_image_predicate, is_slide_image_predicate
from adapters.values.path import Path
from adapters.video_loader import get_video
from domain.values.video import TimedFrame


def get_optimized_slide_images_and_video(slide_path: Path, video_path: Path, height: int, distance):
    is_slide_image = is_slide_image_predicate()
    has_slide_image = has_slide_image_predicate()
    mask = get_frame_mask(slide_path, video_path,
                          is_slide_image, has_slide_image)

    slide_images = get_slide_images(slide_path)
    video = get_video(video_path, 1)

    slide_images.rescale(height=height)
    threshold = slide_images.min_distance(distance)
    video.mask(mask) \
        .resize(slide_images.size) \
        .map_timed_frames(__map_timed_frames(distance, threshold)) \
        .filter(is_slide_image)

    return slide_images, video


def __map_timed_frames(distance, threshold: float):
    def mapper(timed_frames):
        previous_timed_frame = next(timed_frames)
        pivot_time = previous_timed_frame.time
        previous_distance = 0
        for current_timed_frame in timed_frames:
            current_distance = distance(previous_timed_frame.frame,
                                        current_timed_frame.frame)
            difference = current_distance - previous_distance
            if difference > threshold:
                yield TimedFrame(pivot_time, previous_timed_frame.frame)
                pivot_time = current_timed_frame.time
            previous_timed_frame = current_timed_frame
            previous_distance = current_distance
        yield TimedFrame(pivot_time, current_timed_frame.frame)
    return mapper
