from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader

class MaxDistanceSlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader, distance):
        self.images = image_loader.get_images()
        self.distance = distance

    def classify(self, image):
        compare = lambda i: self.distance(self.images[i], image)
        most_similar_slide = min(range(len(self.images)), key=compare)

        return most_similar_slide