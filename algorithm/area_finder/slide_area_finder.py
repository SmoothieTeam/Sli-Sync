import cv2
import time
from frame_loader.uniform_frame_loader import UniformFrameLoader
from domain.slide_loader import SlideLoader

class SlideAreaFinder(SlideLoader):
    def __init__(self, slide_loader: SlideLoader, uniform_frame_loader: UniformFrameLoader):
        self.slides = list(slide_loader.slides())
        self.video_images = uniform_frame_loader.frames()
        self.match_result = []
        self.coordinates = []

    def findmask(self):
        start_time = time.time()
        for video_image in self.video_images:
            video_height, _, _ = video_image.shape
            cv2.imwrite('video.png', video_image)
            for slide in self.slides:
                slide_height, slide_width, _ = slide.shape
            
                for i in range(0, 400, 20):
                    template_width = int(slide_width / slide_height * (video_height - i))
                    template_height = int(video_height - i)
                    template = cv2.resize(slide, (template_width, template_height))

                    result = cv2.matchTemplate(video_image, template, cv2.TM_SQDIFF_NORMED)
                    min_val, _, min_loc, _ = cv2.minMaxLoc(result)
                    resized_height, resized_width, _ = template.shape
                    top_left = min_loc
                    match_val = min_val
                    self.match_result.append(match_val)
                    self.coordinates.append([top_left[1], top_left[1] + resized_height, top_left[0], top_left[0] + resized_width])
        location = self.coordinates[self.match_result.index(min(self.match_result))]
        # location = self.coordinates[-1]
        img_draw = video_image.copy()
        img_draw = img_draw[location[0]:location[1], location[2]:location[3]]
        img_draw = cv2.resize(img_draw, (int(img_draw.shape[1]/2), int(img_draw.shape[0]/2)))
        # cv2.imwrite("img{0}.png".format(location[0]), img_draw) 
        cv2.imshow("result", img_draw)
        cv2.waitKey(0)
        cv2.destroyAllWindows()
        print("Template Calculation ended: %.2fsec" % (time.time()-start_time))
        return self.coordinates[self.match_result.index(min(self.match_result))]