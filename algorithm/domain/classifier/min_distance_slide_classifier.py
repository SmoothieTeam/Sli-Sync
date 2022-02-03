from domain.slide_classifier import SlideClassifier
from domain.image_transform import ImageTransform
from domain.slide_loader import SlideLoader
import torch
import cv2
from PIL import Image
from torchvision import transforms

class MinDistanceSlideClassifier(SlideClassifier):
    def __init__(self, slide_loader: SlideLoader, transform: ImageTransform, slide_area_transform: ImageTransform, distance, classification_model):
        self.transform = transform
        self.slide_area_transform = slide_area_transform
        self.images = list(map(self.transform.transform, slide_loader.slides()))
        self.distance = distance
        self.model = classification_model
        
        self.tensor_transform = transforms.Compose([
            transforms.Resize((224, 224)),
            transforms.ToTensor()
        ])

    def classify(self, queue, cnt):
        _, image = queue.frames()
        image = self.slide_area_transform.transform(image)
        image = self.transform.transform(image)
        cvt_image = cv2.cvtColor(image, cv2.COLOR_BGR2RGB)
        pil_image=Image.fromarray(cvt_image)
        tensor_image = self.tensor_transform(pil_image).unsqueeze(0)

        if torch.argmax(self.model(tensor_image).to(torch.device("cpu"))).numpy() == 0:
            cv2.imwrite("G:\\POCL\\slide-transition-detector\\algorithm\\test_folder_0\\" + str(cnt) + ".jpg", image)
            compare = lambda i: self.distance(self.images[i], image)
            most_similar_slide = min(range(len(self.images)), key=compare)

            return most_similar_slide
        else:
            cv2.imwrite("G:\\POCL\\slide-transition-detector\\algorithm\\test_folder_1\\" + str(cnt) + ".jpg", image)
            return None