import cv2
from skimage.metrics import mean_squared_error

from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader

class MSESlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader, size, threshold):
        self.images = image_loader.get_images()
        self.size = size
        self.threshold = threshold
        self.current_slide = 0

    def compress_image(self, image):
        return cv2.resize(image, self.size, interpolation=cv2.INTER_AREA)

    def dist(self, img1, img2):
        img1 = self.compress_image(img1)
        img2 = self.compress_image(img2)

        return mean_squared_error(img1, img2)

    def classify(self, queue):
        start, end = queue.frames()

        slide = self.images[self.current_slide]
        se = self.dist(start, end)
        es = self.dist(end, slide)
        ss = self.dist(start, slide)

        if se + es - ss > self.threshold:
            compare = lambda i: self.dist(self.images[i], end)
            most_similar_slide_index = min(range(0, len(self.images)), key=compare)
            self.current_slide = most_similar_slide_index
        return self.current_slide