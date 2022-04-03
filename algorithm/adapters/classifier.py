from adapters.optimized_loader import get_optimized_slide_images_and_video
from adapters.values.path import Path
from domain.classifier import classify_all_frame


def classify(slide_path: Path, video_path: Path, distance, listener):
    __make_working_dir(slide_path, video_path)
    listener.on_start()
    slide_images, video = get_optimized_slide_images_and_video(
        slide_path, video_path, 200, distance)
    with video:
        timelines = classify_all_frame(
            video, slide_images, distance, listener.on_progress)
        listener.on_finish(timelines)
    __clean_working_dir(slide_path, video_path)


def __make_working_dir(slide_path: Path, video_path: Path):
    slide_path.directory.mkdir()
    video_path.directory.mkdir()


def __clean_working_dir(slide_path: Path, video_path: Path):
    slide_path.directory.rmdir()
    video_path.directory.rmdir()
