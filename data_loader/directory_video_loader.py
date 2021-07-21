import cv2

from domain.video_loader import VideoLoader

class DirectoryVideoLoader(VideoLoader):
    def __init__(self, path):
        self.video = cv2.VideoCapture(path)
        self.fps = self.video.get(cv2.CAP_PROP_FPS)

    def frame_time(self, count):
        return count / self.fps

    def frames(self):
        frame_count = 0
        while(self.video.isOpened()):
            _, frame = self.video.read()
            if (type(frame) == type(None)):
                break
            frame_count += 1
            yield self.frame_time(frame_count), frame
        self.video.release()