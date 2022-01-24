import cv2
import numpy as np
from data_adapter.frame_loader import FrameLoader
from domain.slide_loader import SlideLoader

class SlideAreaFinder:
    def __init__(self, slide_loader: SlideLoader, frame_loader: FrameLoader, scale):
        self.slides = slide_loader.slides()
        self.frames = frame_loader.frames()
        self.match_results = []
        self.coordinates = []
        self.scale = scale

    def find_mask(self):
        slide_height, slide_width, _ = self.slides[0].shape

        for video_image in self.frames:
            resized_video_image = cv2.resize(video_image, dsize=(0, 0), fx=1/self.scale, fy=1/self.scale)
            video_height, video_width, _ = resized_video_image.shape

            for slide in self.slides:
                for i in range(0, 100, 5):
                    if video_height - i <= 0:
                        break
                    
                    template_height = video_height - i
                    template_width = template_height * slide_width // slide_height
                    template = cv2.resize(slide, (template_width, template_height))
                    
                    if template_height > video_height or template_width > video_width:
                        break
                    
                    result = cv2.matchTemplate(resized_video_image, template, cv2.TM_SQDIFF_NORMED)
                    match_result, _, coordinate, _ = cv2.minMaxLoc(result)
                    x, y = coordinate
                    self.match_results.append(match_result)
                    self.coordinates.append([y, y + template_height, x, x + template_width])

        min_index = min(range(len(self.match_results)), key=lambda i: self.match_results[i])
        # print(min_index, self.coordinates[min_index])
        best_match = np.array(self.coordinates[min_index])
        # print(len(test_image))
        # image = cv2.rectangle(test_image[2], (best_match[3]*self.scale, best_match[1]*self.scale), (best_match[2]*self.scale, best_match[0]*self.scale), (255, 0, 0), 1)
        # cv2.imshow("test", image)
        # cv2.waitKey(0)
        return best_match * self.scale