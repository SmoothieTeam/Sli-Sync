from domain.frame_loader import FrameLoader
from domain.slide_classifier import SlideClassifier

class SlideSearcher:
    def __init__(self, slide_classifier : SlideClassifier, frame_loader: FrameLoader):
        self.slide_classifier = slide_classifier
        self.frame_loader = frame_loader

    def get_slide_times(self):
        frame_slide_match = []

        for frame_time, frame in self.frame_loader.frames():
            slide_number = self.slide_classifier.classify(frame)
            frame_slide_match.append((slide_number, frame_time))

        times = {}
        prev_slide_number, _ = frame_slide_match[0]
        current_array = []

        for slide_number, frame_time in frame_slide_match:
            if slide_number == prev_slide_number:
                current_array.append(frame_time)
            else:
                if prev_slide_number in times:
                    times[prev_slide_number] += [[current_array[0], current_array[-1]]]
                else:
                    times[prev_slide_number] = [[current_array[0], current_array[-1]]]
                prev_slide_number = slide_number
                current_array = [frame_time]

        if len(current_array) > 0:
            if slide_number in times:
                times[slide_number] += [[current_array[0], current_array[-1]]]
            else:
                times[slide_number] = [[current_array[0], current_array[-1]]]

        return times
