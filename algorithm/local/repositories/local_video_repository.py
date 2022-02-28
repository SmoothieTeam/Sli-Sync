import cv2

from domain.values.video import TimedFrame, Video


def get_video(id: str, path: str, time_step: float) -> Video:
    def count_to_second(count, fps):
        return count / fps

    def timed_frames(raw_video, fps):
        count = 0
        count_step = int(time_step * fps)
        while raw_video.isOpened():
            ret = raw_video.grab()
            if not ret:
                break
            if count % count_step == 0:
                _, frame = raw_video.retrieve()
                yield TimedFrame(count_to_second(count, fps), frame)
            count += 1
        raw_video.release()

    raw_video = cv2.VideoCapture(path)
    fps = raw_video.get(cv2.CAP_PROP_FPS)
    width = raw_video.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = raw_video.get(cv2.CAP_PROP_FRAME_HEIGHT)
    frame_count = raw_video.get(cv2.CAP_PROP_FRAME_COUNT)
    frame_size = (height, width)
    return Video(raw_video, frame_size, timed_frames(raw_video, fps), count_to_second(frame_count, fps))
