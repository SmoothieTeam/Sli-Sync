from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader
from classifier.image_transform import ImageTransform

class MaxDistanceSlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader, transform: ImageTransform, distance):
        self.transform = transform
        self.images = list(map(self.transform.transform, image_loader.get_images()))
        self.distance = distance

    def classify(self, queue):
        image, _ = queue.frames()
        image = self.transform.transform(image)
        compare = lambda i: self.distance(self.images[i], image)
        most_similar_slide = max(range(len(self.images)), key=compare)

        return most_similar_slide