from collections import defaultdict

from domain.video_loader import VideoLoader
from domain.slide_classifier import SlideClassifier

class SlideSearcher:
    def __init__(self, slide_classifier : SlideClassifier, video_loader: VideoLoader):
        self.slide_classifier = slide_classifier
        self.video_loader = video_loader

    def slide_time_per_frame(self):
        for time, frame in self.video_loader.frames():
            slide = self.slide_classifier.classify(frame)
            
            yield time, slide

    def get_slide_times(self):
        slide_times = defaultdict(list)
        current_slide = None
        for time, slide in self.slide_time_per_frame():
            previous_slide = current_slide
            current_slide = slide
            current_time = time
            if previous_slide != current_slide:
                slide_times[current_slide].append(current_time)

        return slide_times
