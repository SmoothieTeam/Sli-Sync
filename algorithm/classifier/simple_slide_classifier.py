from domain.image_transform import ImageTransform
from domain.slide_classifier import SlideClassifier
from domain.image_loader import ImageLoader

class SimpleSlideClassifier(SlideClassifier):
    def __init__(self, image_loader: ImageLoader, transform: ImageTransform, distance):
        self.current_slide = 0
        self.images = list(map(transform.transform, image_loader.get_images()))
        self.transform = transform
        self.distance = distance

    def classify(self, queue):
        start_slide = max(0, self.current_slide - 1)
        _, image = queue.frames()
        image = self.transform.transform(image)
        compare = lambda i: self.distance(self.images[i], image)
        most_similar_slide_index = min(range(start_slide, start_slide + 3), key=compare)
        self.current_slide = most_similar_slide_index

        return self.current_slide