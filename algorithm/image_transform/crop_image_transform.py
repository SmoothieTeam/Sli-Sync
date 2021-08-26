from time import localtime
from domain.image_transform import ImageTransform

class CropImageTransform(ImageTransform):
    def __init__(self, location, image_transform: ImageTransform = None):
        self.image_transform = image_transform
        self.location = location

    def transform(self, image):
        if self.image_transform != None:
            image = self.image_transform.transform(image)
        return image[self.location[0]:self.location[1], self.location[2]:self.location[3]]