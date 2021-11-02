from domain.slide_loader import SlideLoader
from data_adapter.image_loader import ImageLoader

class SlideAdapter(SlideLoader):
    def __init__(self, image_loader: ImageLoader):
        self.image_loader = image_loader
        self.cache = None

    def slides(self):
        if self.cache == None:
            self.cache = self.image_loader.images()
        return self.cache