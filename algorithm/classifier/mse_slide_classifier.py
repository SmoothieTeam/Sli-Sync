import cv2
from skimage import color
from skimage.metrics import mean_squared_error

from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader

class MSESlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader):
        images = image_loader.get_images()
        self.images = list(map(self.compress_image, images))

    def compress_image(self, image):
        image = cv2.resize(image, (100, 100), interpolation=cv2.INTER_AREA)
        image = color.rgb2gray(image)

        return image

    def classify(self, queue):
        image, _ = queue.frames()
        image = self.compress_image(image)
        compare = lambda i: mean_squared_error(self.images[i], image)
        most_similar_slide = min(range(len(self.images)), key=compare)

        return most_similar_slide