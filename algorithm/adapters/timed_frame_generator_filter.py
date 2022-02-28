from domain.values.timelines import Timelines
from domain.values.video import TimedFrame


def rate_generator_filter(distance, threshold: float):
    def generator_filter(timed_frames: Timelines):
        previous_timed_frame = next(timed_frames)
        pivot_time = previous_timed_frame.time
        previous_distance = 0
        for current_timed_frame in timed_frames:
            current_distance = distance(previous_timed_frame.frame,
                                        current_timed_frame.frame)
            difference = current_distance - previous_distance
            if difference > threshold:
                yield TimedFrame(pivot_time, previous_timed_frame.frame)
                pivot_time = current_timed_frame.time
            previous_timed_frame = current_timed_frame
            previous_distance = current_distance
        yield TimedFrame(pivot_time, current_timed_frame.frame)
    return generator_filter
