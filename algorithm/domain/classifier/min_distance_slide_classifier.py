from domain.slide_classifier import SlideClassifier
from domain.image_transform import ImageTransform
from domain.slide_loader import SlideLoader
import torch
import cv2

class MinDistanceSlideClassifier(SlideClassifier):
    def __init__(self, slide_loader: SlideLoader, transform: ImageTransform, slide_area_transform: ImageTransform, tensor_transform: ImageTransform, distance, classification_model):
        self.transform = transform
        self.slide_area_transform = slide_area_transform
        self.tensor_transform = tensor_transform
        size = slide_loader.slides()[0].shape
        self.size = (200, int(200*(size[0]/size[1])))
        self.images = list(map(self.transform(self.size).transform, slide_loader.slides()))
        self.distance = distance
        self.model = classification_model

    def classify(self, queue, cnt):
        _, image = queue.frames()
        image = self.slide_area_transform.transform(image)
        image = self.transform(self.size).transform(image)

        tensor_image = self.tensor_transform.transform(image)
        
        with torch.no_grad():
            if torch.argmax(self.model(tensor_image)).numpy() == 0:
                compare = lambda i: self.distance(self.images[i], image)
                most_similar_slide = min(range(len(self.images)), key=compare)

                return most_similar_slide
            else:
                return None
