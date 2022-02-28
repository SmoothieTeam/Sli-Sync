from collections import namedtuple
from itertools import islice
import cv2


TimedFrame = namedtuple('TimedFrame', ('time', 'frame'))


class Video:
    def __init__(self, raw_video, frame_size, timed_frames, time_length):
        self.__raw_video = raw_video
        self.frame_size = frame_size
        self.timed_frames = timed_frames
        self.time_length = time_length

    def __enter__(self):
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.close()

    def close(self):
        self.__raw_video.release()

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

    def rescale(self, height=0, width=0):
        size = (0, 0)
        if height == 0 and width == 0:
            return self
        elif height != 0:
            width = int(height * self.aspect_ratio)
            size = (width, height)
        else:
            height = int(height * self.aspect_ratio)
            size = (width, height)
        return self.resize(size)

    def gray(self):
        self.timed_frames = map(lambda timed_frame: TimedFrame(timed_frame.time, cv2.cvtColor(timed_frame.frame, cv2.COLOR_BGR2GRAY)),
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

    def filter_generator(self, generator_filter):
        self.timed_frames = generator_filter(self.timed_frames)
        return self

    def take(self, count: int):
        self.timed_frames = islice(self.timed_frames, count)
        return self
