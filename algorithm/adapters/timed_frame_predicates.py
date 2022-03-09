from PIL import Image
from torchvision import transforms
import torch
import cv2
from domain.values.video import TimedFrame

from models.DenseNet.densenet import densenet121


def __initialize_model(path: str):
    device = torch.device("cpu")
    model = densenet121()
    model.load_state_dict(torch.load(path, map_location=device))
    model.to(device)
    model.eval()
    return model


_is_slide_image_model = __initialize_model(
    ".\\classification_model\\is_ppt_model.pt")
_has_slide_image_model = __initialize_model(
    ".\\classification_model\\ppt_included_model.pt")


def __fit(model, frame):
    def to_tensor(frame):
        tensor_transform = transforms.Compose([
            transforms.Resize((224, 224),
                              interpolation=transforms.InterpolationMode.BICUBIC),
            transforms.ToTensor()
        ])
        return tensor_transform(Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB))).unsqueeze(0)

    frame = to_tensor(frame)
    with torch.no_grad():
        result = torch.argmax(model(frame)).numpy()
    return result == 0


def is_slide_image(timed_frame: TimedFrame) -> bool:
    return __fit(_is_slide_image_model, timed_frame.frame)


def has_slide_image(timed_frame: TimedFrame) -> bool:
    return __fit(_has_slide_image_model, timed_frame.frame)
