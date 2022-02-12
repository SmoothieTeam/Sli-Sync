import cv2
import torch
from PIL import Image
from torchvision import transforms
from data_adapter.frame_loader import FrameLoader

class UniformFrameLoader(FrameLoader):
    def __init__(self, path, model):
        self.video = cv2.VideoCapture(path)
        self.step = int(self.video.get(cv2.CAP_PROP_FPS) * 30)
        self.model = model
        self.tensor_transform = transforms.Compose([
            transforms.Resize((224, 224), interpolation=Image.BICUBIC),
            transforms.ToTensor()
        ])

    def frames(self):
        frame_count = 0
        yield_count = 0
        while self.video.isOpened():
            self.video.grab()
            if frame_count % self.step == 0:
                ret, frame = self.video.retrieve()
                if not ret:
                    break
                # to make as input format of model
                cvt_image = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
                pil_image = Image.fromarray(cvt_image)
                tensor_image = self.tensor_transform(pil_image).unsqueeze(0)
                with torch.no_grad():
                    # if image include ppt area
                    if torch.argmax(self.model(tensor_image)).numpy() == 0:
                        yield_count += 1
                        yield frame
            if yield_count == 5:
                print("area founded")
                break
            frame_count += 1
        self.video.release()
