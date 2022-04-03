import cv2

from collections import namedtuple
from itertools import islice


TimedFrame = namedtuple('TimedFrame', ('time', 'frame'))


class Video:
    def __init__(self, raw_video, frame_size, timed_frames, time_length):
        self.raw_video = raw_video
        self.frame_size = frame_size
        self.timed_frames = timed_frames
        self.time_length = time_length

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()

    def close(self):
        self.raw_video.release()

    @property
    def aspect_ratio(self) -> float:
        height, width = self.frame_size
        return width / height

    def resize(self, size: tuple[int, int]):
        height, width = size
        self.frame_size = size
        self.timed_frames = map(lambda timed_frame: TimedFrame(timed_frame.time, cv2.resize(timed_frame.frame, (width, height))),
                                self.timed_frames)
        return self

    def mask(self, mask: tuple[tuple[int, int], tuple[int, int]]):
        if mask is None:
            return self
        height_index, width_index = mask
        height = height_index[1] - height_index[0]
        width = width_index[1] - width_index[0]

        self.frame_size = (height, width)
        self.timed_frames = map(lambda timed_frame: TimedFrame(timed_frame.time, timed_frame.frame[height_index[0]:height_index[1], width_index[0]:width_index[1]]),
                                self.timed_frames)
        return self

    def filter(self, predicate):
        self.timed_frames = filter(predicate, self.timed_frames)
        return self

    def map_timed_frames(self, map):
        self.timed_frames = map(self.timed_frames)
        return self

    def take(self, count: int):
        self.timed_frames = islice(self.timed_frames, count)
        return self
