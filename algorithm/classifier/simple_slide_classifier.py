from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader
from classifier.metric import Metric

class SimpleSlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader, metric: Metric):
        self.current_slide = 0
        self.images = image_loader.get_images()
        self.metric = metric

    def classify(self, image):
        start_slide = max(0, self.current_slide - 1)
        
        compare = lambda i: self.metric.distance(self.images[i], image)
        most_similar_slide_index = max(range(start_slide, len(self.images)), key=compare)
        self.current_slide = most_similar_slide_index

        return self.current_slide