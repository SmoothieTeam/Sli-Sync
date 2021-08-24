import numpy as np

from domain.slide_classifier import SlideClassifier
from domain.image_transform import ImageTransform
from domain.slide_loader import SlideLoader

class RateSlideClassifier(SlideClassifier):
    def __init__(self, slide_loader: SlideLoader, transform: ImageTransform, distance, threshold):
        self.images = list(map(transform.transform, slide_loader.slides()))
        self.distance_map = np.array([[distance(self.images[i], self.images[j]) for j in range(len(self.images))] for i in range(len(self.images))])
        self.distance = distance
        self.transform = transform
        self.threshold = threshold
        self.current_slide = 0

    def classify(self, queue):
        start, end = queue.frames()
        start, end = self.transform.transform(start), self.transform.transform(end)
        dist = self.distance(start, end)

        if dist < self.threshold:
            # TODO find first slide for video
            return self.current_slide
        else:
            target = self.distance_map[self.current_slide]
            prop_distance = abs(target - dist)
            y = np.argmin(prop_distance)
            self.current_slide = y
            return self.current_slide
