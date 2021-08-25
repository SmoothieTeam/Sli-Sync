from frame_queue_loader.frame_theshold_finder import FrameThresholdFinder
from domain.image_transform import ImageTransform
from domain.frame_queue import FrameQueue
from domain.frame_queue_loader import FrameQueueLoader
from domain.frame_loader import FrameLoader

class RateFrameQueueLoader(FrameQueueLoader):
    def __init__(self, frame_loader: FrameLoader, transform: ImageTransform, distance, threshold_finder: FrameThresholdFinder):
        self.frame_loader = frame_loader
        self.transform = transform
        self.distance = distance
        self.threshold_finder = threshold_finder
        
    def queues(self):
        time, prev_frame = next(self.frame_loader.frames())
        prev_cache = self.transform.transform(prev_frame)
        prev_distance = 0

        queue = FrameQueue()
        queue.push(time, prev_frame)
        for time, frame in self.frame_loader.frames():
            cache = self.transform.transform(frame)
            distance = self.distance(cache, prev_cache)
            dr = distance - prev_distance
            if abs(dr) > self.threshold_finder.threshold():
                yield queue
                queue = FrameQueue()
            queue.push(time, prev_frame)
            prev_distance = distance
            prev_frame = frame
            prev_cache = cache
        yield queue