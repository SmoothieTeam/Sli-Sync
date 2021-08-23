import cv2

from classifier.image_transform import ImageTransform

class GrayImageTransform(ImageTransform):
    def __init__(self, image_transform: ImageTransform = None):
        self.image_transform = image_transform

    def transform(self, image):
        if self.image_transform != None:
            image = self.image_transform.transform(image)
        return cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)