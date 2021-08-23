from classifier.image_transform import ImageTransform
from domain.frame_queue import FrameQueue
from domain.frame_loader import FrameLoader
from domain.frame_queue_loader import FrameQueueLoader

class RateFrameQueueLoader(FrameQueueLoader):
    def __init__(self, frame_loader: FrameLoader, transform: ImageTransform, distance, threshold):
        self.frame_loader = frame_loader
        self.transform = transform
        self.distance = distance
        self.threshold = threshold

    def __dist(self, img1, img2):
        img1 = self.transform.transform(img1)
        img2 = self.transform.transform(img2)
        
        return self.distance(img1, img2)

    def queues(self):
        time, prev_frame = next(self.frame_loader.frames())
        prev_distance = 0

        queue = FrameQueue()
        queue.push(time, prev_frame)
        for time, frame in self.frame_loader.frames():
            distance = self.__dist(frame, prev_frame)
            dr = distance - prev_distance
            if dr > self.threshold:
                yield queue
                queue = FrameQueue()
            queue.push(time, prev_frame)
            prev_distance = distance
            prev_frame = frame
        yield queue