from domain.slide_classifier import SlideClassifier
from domain.image_transform import ImageTransform
from domain.slide_loader import SlideLoader
import torch

class MinDistanceSlideClassifier(SlideClassifier):
    def __init__(self, slide_loader: SlideLoader, transform: ImageTransform, slide_area_transform: ImageTransform, ppt_slide_classifier: SlideClassifier, distance):
        self.transform = transform
        self.slide_area_transform = slide_area_transform
        size = slide_loader.slides()[0].shape
        self.size = (200, int(200*(size[0]/size[1])))
        self.images = list(map(self.transform(self.size).transform, slide_loader.slides()))
        self.distance = distance
        self.ppt_slide_classifier = ppt_slide_classifier

    def classify(self, queue):
        _, image = queue.frames()
        image = self.slide_area_transform.transform(image)
        image = self.transform(self.size).transform(image)

        if self.ppt_slide_classifier.is_ppt_classify(image) == 0:
            compare = lambda i: self.distance(self.images[i], image)
            most_similar_slide = min(range(len(self.images)), key=compare)
            return most_similar_slide
        else:
            return None
        
