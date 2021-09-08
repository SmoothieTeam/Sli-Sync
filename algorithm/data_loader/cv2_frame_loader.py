import cv2

from data_adapter.frame_loader import FrameLoader

class CV2FrameLoader(FrameLoader):
    def __init__(self, path, frame_step=1, second_step=None):
        self.video = cv2.VideoCapture(path)
        self.fps = self.video.get(cv2.CAP_PROP_FPS)
        if second_step != None:
            self.step = max(int(second_step * self.fps), 1)
        else:
            self.step = frame_step

    def frame_time(self, count):
        return count / self.fps

    def frames(self):
        frame_count = 0
        while self.video.isOpened():
            self.video.grab()
            if frame_count % self.step == 0:
                ret, frame = self.video.retrieve()
                if not ret:
                    break
                yield self.frame_time(frame_count), frame
            frame_count += 1
        self.video.release()