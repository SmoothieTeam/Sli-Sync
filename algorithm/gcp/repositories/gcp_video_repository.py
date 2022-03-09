import cv2
from domain.values.video import TimedFrame, Video
from domain.video_loader import mkdir_if_not_exists, video_file_dir_of, video_file_path_of
from gcp.gcp_wapper import firebase_storage


bucket = firebase_storage()


def get_video(id: str, video_storage_path: str, time_step: float):
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

    def download_video(video_storage_path, video_file_path):
        blob = bucket.get_blob(video_storage_path)
        blob.download_to_filename(video_file_path)

    filename = video_storage_path.split('/')[-1]
    video_file_dir = video_file_dir_of(id)
    video_file_path = video_file_path_of(id, filename)

    mkdir_if_not_exists(video_file_dir)
    download_video(video_storage_path, video_file_path)

    raw_video = cv2.VideoCapture(video_file_path)
    fps = raw_video.get(cv2.CAP_PROP_FPS)
    width = raw_video.get(cv2.CAP_PROP_FRAME_WIDTH)
    height = raw_video.get(cv2.CAP_PROP_FRAME_HEIGHT)
    frame_count = raw_video.get(cv2.CAP_PROP_FRAME_COUNT)
    frame_size = (height, width)
    return Video(raw_video, frame_size, timed_frames(raw_video, fps), count_to_second(frame_count, fps))
