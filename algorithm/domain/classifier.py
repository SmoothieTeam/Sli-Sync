from domain.values.slide_images import SlideImages
from domain.values.timelines import Timeline, Timelines
from domain.values.video import Video


def classify_all_frame(video: Video, slide_images: SlideImages, distance, on_progress) -> Timelines:
    timelines = Timelines()
    with video:
        for time, frame in video.timed_frames:
            slide_number = __classify_a_frame(frame, slide_images, distance)
            timelines.append(Timeline(time, slide_number))
            progress = time / video.time_length
            on_progress(progress)
    return timelines


def __classify_a_frame(frame, slide_images: SlideImages, distance) -> int:
    distances = list(map(lambda slide_image: distance(frame, slide_image),
                         slide_images))
    return __argmin(distances)


def __argmin(l: list):
    return min(range(len(l)), key=lambda i: l[i])
