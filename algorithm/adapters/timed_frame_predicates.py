from PIL import Image
from torchvision import transforms
import torch
import cv2

from adapters.values.path import Path, Directory
from domain.values.video import TimedFrame
from models.DenseNet.densenet import densenet121


class __TimedFrameModelPredicate:
    def __init__(self, path: Path):
        device = torch.device("cpu")
        self.__model = densenet121()
        self.__model.load_state_dict(torch.load(
            path.full_path, map_location=device))
        self.__model.to(device)
        self.__model.eval()

    def __call__(self, timed_frame: TimedFrame) -> bool:
        torch_frame = self.__to_tensor(timed_frame.frame)
        with torch.no_grad():
            result = torch.argmax(self.__model(torch_frame)).numpy()
        return result == 0

    def __to_tensor(self, frame):
        tensor_transform = transforms.Compose([
            transforms.Resize((224, 224),
                              interpolation=transforms.InterpolationMode.BICUBIC),
            transforms.ToTensor()
        ])
        return tensor_transform(Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))).unsqueeze(0)


def is_slide_image_predicate():
    model_dir = Directory("classification_model")
    model_path = Path(model_dir, "is_ppt_model.pt")
    return __TimedFrameModelPredicate(model_path)


def has_slide_image_predicate():
    model_dir = Directory("classification_model")
    model_path = Path(model_dir, "ppt_included_model.pt")
    return __TimedFrameModelPredicate(model_path)
