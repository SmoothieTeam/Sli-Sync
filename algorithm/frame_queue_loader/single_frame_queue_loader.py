from domain.frame_queue import FrameQueue
from domain.frame_queue_loader import FrameQueueLoader
from domain.frame_loader import FrameLoader

class SingleFrameQueueLoader(FrameQueueLoader):
    def __init__(self, frame_loader: FrameLoader):
        self.frame_loader = frame_loader

    def queues(self):
        for time, frame in self.frame_loader.frames():
            queue = FrameQueue()
            queue.push(time, frame)
            
            yield queue