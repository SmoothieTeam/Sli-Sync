from domain.slide_classifier import SlideClassifier
from domain.image_transform import ImageTransform
from classifier.slide_loader import SlideLoader

class MinDistanceSlideClassifier(SlideClassifier):
    def __init__(self, slide_loader: SlideLoader, transform: ImageTransform, distance):
        self.transform = transform
        self.images = list(map(self.transform.transform, slide_loader.slides()))
        self.distance = distance

    def classify(self, queue):
        _, image = queue.frames()
        image = self.transform.transform(image)
        compare = lambda i: self.distance(self.images[i], image)
        most_similar_slide = min(range(len(self.images)), key=compare)

        return most_similar_slide