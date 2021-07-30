import cv2
from skimage import color
from skimage.metrics import structural_similarity

from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader

class SimpleSlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader):
        images = image_loader.get_images()
        self.current_slide = 0
        self.images = list(map(self.compress_image, images))

    def compress_image(self, image):
        image = cv2.resize(image, (30, 30), interpolation=cv2.INTER_AREA)
        image = color.rgb2gray(image)

        return image

    def classify(self, image):
        image = self.compress_image(image)
        start_slide = max(0, self.current_slide - 1)
        
        compare = lambda i: structural_similarity(self.images[i], image)
        most_similar_slide_index = max(range(start_slide, len(self.images)), key=compare)

        if self.current_slide != most_similar_slide_index:
            if self.current_slide == 0:
                self.current_slide = most_similar_slide_index
            else:
                self.current_slide = most_similar_slide_index

        return self.current_slide