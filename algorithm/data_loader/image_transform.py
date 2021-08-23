class ImageTransform:
    def transform(self, image):
        pass

class IdentityImageTransform(ImageTransform):
    def __init__(self, image_transform: ImageTransform = None):
        self.image_transform = image_transform

    def transform(self, image):
        if self.image_transform != None:
            image = self.image_transform.transform(image)
        return image