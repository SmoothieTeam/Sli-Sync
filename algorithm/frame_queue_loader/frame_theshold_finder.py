from domain.slide_loader import SlideLoader
from domain.image_transform import ImageTransform

class FrameThresholdFinder:
    def __init__(self, slide_loader: SlideLoader, transform: ImageTransform, distance):
        self.slide_loader = slide_loader
        self.distance = distance
        self.transform = transform
        self.cache = None

    def threshold(self):
        if self.cache == None:
            slides = self.slide_loader.slides()
            slides = list(map(self.transform.transform, slides))
            distance = [self.distance(slides[i-1], slides[i]) for i in range(1, len(slides))]
            self.cache = min(distance) + 1
        return self.cache