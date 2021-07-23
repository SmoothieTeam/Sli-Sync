import cv2

from domain.frame_loader import FrameLoader

class CV2FrameLoader(FrameLoader):
    def __init__(self, path, frame_step=1, second_step=None):
        self.video = cv2.VideoCapture(path)
        self.fps = self.video.get(cv2.CAP_PROP_FPS)
        if second_step != None:
            self.step = int(second_step * self.fps)
        else:
            self.step = frame_step

    def frame_time(self, count):
        return count / self.fps

    def frames(self):
        frame_count = 0
        while(self.video.isOpened()):
            self.video.set(cv2.CAP_PROP_POS_FRAMES, frame_count)
            _, frame = self.video.read()
            if (type(frame) == type(None)):
                break
            frame_count += self.step
            yield self.frame_time(frame_count), frame
        self.video.release()