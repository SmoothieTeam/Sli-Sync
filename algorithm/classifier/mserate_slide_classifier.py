import cv2
import numpy as np
import skimage.color as color

from skimage.metrics import mean_squared_error, structural_similarity

from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader

class MSERateSlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader, size, threshold):
        self.images = image_loader.get_images()
        self.size = size
        self.threshold = threshold
        self.current_slide = 0
        self.msemap = np.array([[self.dist(self.images[i], self.images[j]) for j in range(len(self.images))] for i in range(len(self.images))])

    def compress_image(self, image):
        return cv2.resize(image, self.size, interpolation=cv2.INTER_AREA)

    def dist(self, img1, img2):
        img1 = self.compress_image(img1)
        img2 = self.compress_image(img2)

        return mean_squared_error(img1, img2)

    def classify(self, queue):
        start, end = queue.frames()
        dist = self.dist(start, end)

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