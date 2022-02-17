import cv2
import torch
from domain.slide_classifier import SlideClassifier
from data_adapter.frame_loader import FrameLoader
from domain.image_transform import ImageTransform

class UniformFrameLoader(FrameLoader):
    def __init__(self, path, ppt_slide_classifier: SlideClassifier):
        self.video = cv2.VideoCapture(path)
        self.step = int(self.video.get(cv2.CAP_PROP_FPS) * 30)
        self.ppt_slide_classifier = ppt_slide_classifier

    def frames(self):
        frame_count = 0
        yield_count = 0
        while self.video.isOpened():
            self.video.grab()
            if frame_count % self.step == 0:
                ret, frame = self.video.retrieve()
                if not ret:
                    break

                if self.ppt_slide_classifier.ppt_included_classify(frame) == 0:
                    yield_count += 1
                    yield frame
            if yield_count == 5:
                break
            frame_count += 1
        self.video.release()
