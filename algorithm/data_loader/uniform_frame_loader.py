import cv2
import torch
from data_adapter.frame_loader import FrameLoader
from domain.image_transform import ImageTransform

class UniformFrameLoader(FrameLoader):
    def __init__(self, path, model, tensor_transform: ImageTransform):
        self.video = cv2.VideoCapture(path)
        self.step = int(self.video.get(cv2.CAP_PROP_FPS) * 30)
        self.model = model
        self.tensor_transform = tensor_transform

    def frames(self):
        frame_count = 0
        yield_count = 0
        while self.video.isOpened():
            self.video.grab()
            if frame_count % self.step == 0:
                ret, frame = self.video.retrieve()
                if not ret:
                    break
                
                tensor_image = self.tensor_transform.transform(frame)

                with torch.no_grad():
                    if torch.argmax(self.model(tensor_image)).numpy() == 0:
                        cv2.imwrite("area_result//" + str(frame_count) + ".png", frame)
                        yield_count += 1
                        yield frame
            if yield_count == 5:
                break
            frame_count += 1
        self.video.release()
