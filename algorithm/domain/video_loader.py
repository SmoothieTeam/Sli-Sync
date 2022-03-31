import cv2

from domain.values.path import Path
from domain.values.video import TimedFrame, Video


def get_video(path: Path, time_step: float) -> Video:
    raw_video = cv2.VideoCapture(path.full_path)
    fps = raw_video.get(cv2.CAP_PROP_FPS)
    width = raw_video.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = raw_video.get(cv2.CAP_PROP_FRAME_HEIGHT)
    frame_count = raw_video.get(cv2.CAP_PROP_FRAME_COUNT)
    frame_size = (height, width)

    return Video(raw_video, frame_size, _timed_frames(raw_video, fps, time_step), _count_to_second(frame_count, fps))


def _timed_frames(raw_video, fps, time_step):
    count = 0
    count_step = int(time_step * fps)
    while raw_video.isOpened():
        ret = raw_video.grab()
        if not ret:
            break
        if count % count_step == 0:
            _, frame = raw_video.retrieve()
            yield TimedFrame(_count_to_second(count, fps), frame)
        count += 1


def _count_to_second(count, fps):
    return count / fps
