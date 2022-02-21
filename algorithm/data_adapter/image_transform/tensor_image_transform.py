from domain.image_transform import ImageTransform
from PIL import Image
from torchvision import transforms
import cv2

class TensorImageTransform(ImageTransform):
    def __init__(self, image_transform: ImageTransform = None):
        self.image_transform = image_transform
        self.tensor_transform = transforms.Compose([
            transforms.Resize((224, 224), interpolation=Image.BICUBIC),
            transforms.ToTensor()
        ])

    def transform(self, image):
        if self.image_transform != None:
            image = self.image_transform.transform(image)
        return self.tensor_transform(Image.fromarray(cv2.cvtColor(image, cv2.COLOR_BGR2RGB))).unsqueeze(0)