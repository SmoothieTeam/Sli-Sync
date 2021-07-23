from collections import defaultdict

from domain.frame_loader import FrameLoader
from domain.slide_classifier import SlideClassifier

class SlideSearcher:
    def __init__(self, slide_classifier : SlideClassifier, frame_loader: FrameLoader):
        self.slide_classifier = slide_classifier
        self.frame_loader = frame_loader

    def slide_time_per_frame(self):
        for time, frame in self.frame_loader.frames():
            slide = self.slide_classifier.classify(frame)
            
            yield time, slide

    def get_slide_times(self):
        slide_times = defaultdict(list)
        current_slide = None
        for current_time, slide in self.slide_time_per_frame():
            previous_slide = current_slide
            current_slide = slide
            if previous_slide != current_slide:
                slide_times[current_slide].append(current_time)

        return slide_times
