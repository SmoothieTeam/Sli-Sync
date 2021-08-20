from collections import defaultdict

from domain.frame_queue_loader import FrameQueueLoader
from domain.slide_classifier import SlideClassifier

class SlideSearcher:
    def __init__(self, slide_classifier : SlideClassifier, frame_queue_loader: FrameQueueLoader):
        self.slide_classifier = slide_classifier
        self.frame_queue_loader = frame_queue_loader

    def classify_queues(self):
        for queue in self.frame_queue_loader.queues():
            slide = self.slide_classifier.classify(queue)
            
            yield slide, queue

    def get_slide_times(self):
        slide_times = defaultdict(list)
        current_slide = None
        for slide, queue in self.classify_queues():
            previous_slide = current_slide
            current_slide = slide
            if previous_slide != current_slide:
                start, _ = queue.times()
                slide_times[current_slide].append(start)

        return slide_times
