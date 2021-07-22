import cv2

from skimage import color
from skimage.metrics import structural_similarity

from domain.video_loader import VideoLoader
from domain.slide_classifier import classify

class SlideSearcher:
    def __init__(self, slide_classifier : SlideClassifier, video_loader: VideoLoader):
        self.slide_classifier = slide_classifier
        self.video_loader = video_loader

    def get_slide_times(self):
        frame_slide_match = []

        for frame_time, frame in self.video_loader.frames():
            slide_number = self.slide_classifier.classify(frame)
            frame_slide_match.append((slide_number, frame_time))

        times = {}
        tmp = 0
        tmp_array = []
        slide_number_array = []

        for slide_number, frame_time in frame_slide_match:
            if slide_number == tmp:
                tmp_array.append(frame_time)
            else:
                if slide_number in slide_number_array:
                    times[slide_number] += tmp_array
                else:
                    times[slide_number] = tmp_array
                tmp = slide_number
                tmp_array = []

        return times
