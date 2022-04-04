import cv2
import numpy as np

from adapters.slide_image_loader import get_slide_images
from adapters.values.path import Path
from adapters.video_loader import get_video
from domain.values.video import Video
from domain.values.slide_images import SlideImages


def get_frame_mask(slide_path: Path, video_path: Path, is_slide_image, has_slide_image):
    if __is_video_full_slide_image(video_path, is_slide_image):
        return None
    else:
        slide_images = get_slide_images(slide_path)
        with get_video(video_path, 30) as video:
            video.filter(has_slide_image).take(5)
            return __find_frame_mask(video, slide_images, 6)


def __is_video_full_slide_image(video_path: Path, is_slide_image):
    with get_video(video_path, 30) as video:
        video.take(5)
        return any(map(is_slide_image, video.timed_frames))


def __find_frame_mask(video: Video, slide_images: SlideImages, scale: float):
    slide_aspect_ratio = slide_images.aspect_ratio
    results, coordinates = [], []
    for _, frame in video.timed_frames:
        frame = __canny_frame(frame, scale)
        frame_height, _ = frame.shape
        for slide_image in slide_images:
            slide_image = cv2.cvtColor(slide_image, cv2.COLOR_BGR2GRAY)
            for base_height in range(0, min(frame_height, 100), 5):
                template = __create_template(slide_image, frame,
                                             base_height, slide_aspect_ratio)
                if template is None:
                    break
                result, coordinate = __template_matching(frame, template)
                results.append(result)
                coordinates.append(coordinate)
    min_index = min(range(len(results)), key=lambda i: results[i])
    best_match = np.array(coordinates[min_index])
    mask = best_match * scale
    return mask


def __canny_frame(frame, scale: float):
    frame = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    frame = cv2.resize(frame, dsize=(0, 0), fx=1/scale, fy=1/scale)
    frame = cv2.Canny(frame, 100, 255)
    return frame


def __create_template(slide_image, frame, base_height, slide_ratio):
    frame_height, frame_width = frame.shape
    template_height = frame_height - base_height
    template_width = int(template_height * slide_ratio)
    if template_height > frame_height or template_width > frame_width:
        return None
    else:
        template = cv2.resize(slide_image,
                              (template_width, template_height))
        template = cv2.Canny(template, 100, 255)
        return template


def __template_matching(frame, template):
    result = cv2.matchTemplate(frame, template, cv2.TM_SQDIFF_NORMED)
    match_result, _, match_coordinate, _ = cv2.minMaxLoc(result)
    x, y = match_coordinate
    template_height, template_width = template.shape
    coordinate = ((y, y + template_height), (x, x + template_width))
    return match_result, coordinate
