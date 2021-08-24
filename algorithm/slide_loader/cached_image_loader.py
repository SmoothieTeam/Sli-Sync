from domain.slide_loader import SlideLoader

class CachedImageLoader(SlideLoader):
    def __init__(self, slide_loader: SlideLoader):
        self.slide_loader = slide_loader
        self.cache = None

    def slides(self):
        if self.cache == None:
            self.cache = self.slide_loader.slides()
        return self.cache