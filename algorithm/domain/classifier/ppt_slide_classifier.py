from domain.slide_classifier import SlideClassifier
from domain.image_transform import ImageTransform
from models.DenseNet import densenet121
import torch

class PPTSlideClassifier(SlideClassifier):
    def __init__(self, tensor_transform: ImageTransform):
        self.tensor_transform = tensor_transform

        device = torch.device("cpu")
        self.is_ppt_model = densenet121()
        self.is_ppt_model.load_state_dict(torch.load(".\\classification_model\\is_ppt_model.pt", map_location=device))
        self.is_ppt_model.to(device)
        self.is_ppt_model.eval()
        
        self.ppt_included_model = densenet121()
        self.ppt_included_model.load_state_dict(torch.load(".\\classification_model\\ppt_included_model.pt", map_location=device))
        self.ppt_included_model.to(device)
        self.ppt_included_model.eval()
 
    def is_ppt_classify(self, image):
        return torch.argmax(self.is_ppt_model(self.tensor_transform.transform(image))).numpy()

    def ppt_included_classify(self, image):
        return torch.argmax(self.ppt_included_model(self.tensor_transform.transform(image))).numpy()