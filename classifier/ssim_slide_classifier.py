import cv2
from skimage import color
from skimage.metrics import structural_similarity

from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader

class SSIMSlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader):
        images = image_loader.get_images()
        self.images = list(map(self.compress_image, images))

    def compress_image(self, image):
        image = cv2.resize(image, (30, 30))
        image = color.rgb2gray(image)

        return image

    def classify(self, image):
        image = self.compress_image(image)
        compare = lambda i: structural_similarity(self.images[i], image)
        most_similar_slide = max(range(len(self.images)), key=compare)

        return most_similar_slide