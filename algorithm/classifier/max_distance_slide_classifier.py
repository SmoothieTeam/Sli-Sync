from classifier.metric import Metric
from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader

class MaxDistanceSlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader, metric: Metric):
        self.images = image_loader.get_images()
        self.metric = metric

    def classify(self, image):
        compare = lambda i: self.metric.distance(self.images[i], image)
        most_similar_slide = max(range(len(self.images)), key=compare)

        return most_similar_slide