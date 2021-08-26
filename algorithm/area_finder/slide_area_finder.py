import cv2
import numpy as np
from frame_loader.uniform_frame_loader import UniformFrameLoader
from domain.slide_loader import SlideLoader

class SlideAreaFinder(SlideLoader):
    def __init__(self, slide_loader: SlideLoader, uniform_frame_loader: UniformFrameLoader):
        self.slides = list(slide_loader.slides())
        self.video_images = uniform_frame_loader.frames()
        self.match_result = []
        self.coordinates = []

    def findmask(self):
        
        for video_image in self.video_images:

            video_original_height, video_original_width, _ = video_image.shape
            resized_video_image = cv2.resize(video_image, (int(video_original_width / 6), int(video_original_height / 6)))
            video_height, _, _ = resized_video_image.shape

            for slide in self.slides:        
                slide_height, slide_width, _ = slide.shape
                for i in range(0, 100, 5):
                    template_width = int(slide_width / slide_height * (video_height - i))
                    template_height = int(video_height - i)
                    
                    if (video_height - i) <= 0:
                        print("i is too big")
                        break
                    
                    template = cv2.resize(slide, (template_width, template_height))

                    result = cv2.matchTemplate(resized_video_image, template, cv2.TM_SQDIFF_NORMED)
                    min_val, _, min_loc, _ = cv2.minMaxLoc(result)
                    resized_height, resized_width, _ = template.shape
                    top_left = min_loc
                    match_val = min_val
                    self.match_result.append(match_val)
                    self.coordinates.append([top_left[1], top_left[1] + resized_height, top_left[0], top_left[0] + resized_width])

        self.coordinates = np.array(self.coordinates)
        return self.coordinates[self.match_result.index(min(self.match_result))] * 6