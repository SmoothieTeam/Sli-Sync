import cv2

from data_adapter.frame_loader import FrameLoader

class UniformFrameLoader(FrameLoader):
    def __init__(self, path):
        self.video = cv2.VideoCapture(path)
        self.fps = int(self.video.get(cv2.CAP_PROP_FPS) / 2)
        self.step = int(self.video.get(cv2.CAP_PROP_FRAME_COUNT) / 5)

    def frame_time(self, count):
        return count / self.fps

    def frames(self):
        frame_count = 0
        while(self.video.isOpened()):
            self.video.grab()
            frame_count += 1
            if frame_count % self.step == 0:
                ret, frame = self.video.retrieve()
                if not ret:
                    break
                yield frame
        self.video.release()
