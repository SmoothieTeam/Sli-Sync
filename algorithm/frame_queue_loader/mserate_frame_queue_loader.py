import cv2
from skimage.metrics.simple_metrics import mean_squared_error
from domain.frame_queue import FrameQueue
from domain.frame_loader import FrameLoader
from domain.frame_queue_loader import FrameQueueLoader

class MSERateFrameQueueLoader(FrameQueueLoader):
    def __init__(self, frame_loader: FrameLoader, size, threshold):
        self.frame_loader = frame_loader
        self.size = size
        self.threshold = threshold

    def compress_image(self, image):
        return cv2.resize(image, self.size, interpolation=cv2.INTER_AREA)

    def mse(self, img1, img2):
        img1 = self.compress_image(img1)
        img2 = self.compress_image(img2)

        return mean_squared_error(img1, img2)

    def queues(self):
        time, prev_frame = next(self.frame_loader.frames())
        prev_mse = 0

        queue = FrameQueue()
        queue.push(time, prev_frame)
        for time, frame in self.frame_loader.frames():
            mse = self.mse(frame, prev_frame)
            dr = mse - prev_mse
            if dr > self.threshold:
                yield queue
                queue = FrameQueue()
            queue.push(time, prev_frame)
            prev_mse = mse
            prev_frame = frame