import cv2

from data_loader.image_transform import ImageTransform

class ResizeImageTransform(ImageTransform):
    def __init__(self, size, image_transform: ImageTransform = None):
        self.size = size
        self.image_transform = image_transform

    def transform(self, image):
        if self.image_transform != None:
            image = self.image_transform.transform(image)
        return cv2.resize(image, self.size, interpolation=cv2.INTER_AREA)