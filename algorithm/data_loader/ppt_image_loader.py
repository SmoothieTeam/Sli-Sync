from domain.image_loader import ImageLoader
from pptx_tools import utils
import os
import cv2

class PPTImageLoader(ImageLoader):
    def __init__(self, path):
        self.path = path

    def get_file_list(self):
        return os.listdir('pngs')

    def ppt2png(self):
        abspath = os.path.dirname(os.path.abspath(__file__))
        image_folder = os.path.join(abspath, 'imgs')
        ppt_file = os.path.join(abspath, self.path)

        if os.path.isdir('imgs'):
            os.rmdir('imgs')

        utils.save_pptx_as_png(image_folder, ppt_file)

    def get_images(self):
        images = []

        self.ppt2png()
        files = self.get_file_list()

        for file in files:
            image = cv2.imread(file, cv2.IMREAD_COLOR)
            images.append(image)

        return images