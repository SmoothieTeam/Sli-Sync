import numpy as np

from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader
from domain.image_transform import ImageTransform

class RateSlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader, transform: ImageTransform, distance, threshold):
        self.images = list(map(transform.transform, image_loader.get_images()))
        self.msemap = np.array([[distance(self.images[i], self.images[j]) for j in range(len(self.images))] for i in range(len(self.images))])
        self.distance = distance
        self.transform = transform
        self.threshold = threshold
        self.current_slide = 0

    def classify(self, queue):
        start, end = queue.frames()
        dist = self.distance(start, end)

        if dist < self.threshold:
            # TODO find first slide for video
            return self.current_slide
        else:
            target = self.msemap[self.current_slide]
            prop_distance = abs(target / dist - 1)

            y = np.argmin(prop_distance)

            if prop_distance[y] < self.threshold:
                self.current_slide = y
                return self.current_slide
            else:
                return self.current_slide