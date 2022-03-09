from domain.values.slide_images import SlideImages
from domain.values.timelines import Timeline, Timelines
from domain.values.video import Video


def classify_all_frame(id: str, video: Video, slide_images: SlideImages, classifier, on_progress):
    timelines = Timelines()
    for time, frame in video.timed_frames:
        slide_number = classifier(frame, slide_images)
        timelines.append(Timeline(time, slide_number))
        progress = time / video.time_length
        on_progress(id, progress)
    on_progress(id, 1)
    return timelines


def argmin(l: list):
    return min(range(len(l)), key=lambda i: l[i])


def simple_classifier(distance):
    def classify_frame(frame, slide_images: SlideImages) -> int:
        distances = list(map(lambda slide_image: distance(frame, slide_image),
                             slide_images))
        return argmin(distances)
    return classify_frame
