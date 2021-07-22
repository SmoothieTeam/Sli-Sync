from domain.video_loader import VideoLoader
from domain.slide_classifier import SlideClassifier

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
        prev_slide_number = 0
        current_array = []
        slide_number_array = []

        for slide_number, frame_time in frame_slide_match:
            if slide_number == prev_slide_number:
                current_array.append(frame_time)
            else:
                if slide_number in slide_number_array:
                    times[slide_number] += [current_array[0], current_array[-1]]
                else:
                    times[slide_number] = [current_array[0], current_array[-1]]
                slide_number_array.append(slide_number)
                prev_slide_number = slide_number
                current_array = [frame_time]

        if len(current_array) > 0:
            if slide_number in slide_number_array:
                times[slide_number] += [current_array[0], current_array[-1]]
            else:
                times[slide_number] = [current_array[0], current_array[-1]]

        return times
