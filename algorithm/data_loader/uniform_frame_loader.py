import cv2

from data_adapter.frame_loader import FrameLoader

class UniformFrameLoader(FrameLoader):
    def __init__(self, path):
        self.video = cv2.VideoCapture(path)
        self.step = self.video.get(cv2.CAP_PROP_FRAME_COUNT) // 10

    def frames(self):
        frame_count = 0
        yield_count = 0
        while self.video.isOpened():
            self.video.grab()
            if frame_count % self.step == 0:
                ret, frame = self.video.retrieve()
                if not ret:
                    break
                yield_count += 1
                yield frame
            if yield_count == 5:
                break
            frame_count += 1
        self.video.release()
