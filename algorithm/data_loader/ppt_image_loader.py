import os
import cv2
from pptx_tools import utils

from data_adapter.image_loader import ImageLoader

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

    def images(self):
        images = []

        self.ppt2png()
        files = self.get_file_list()

        for file in files:
            image = cv2.imread('./imgs/' + file)
            images.append(image)

        return images
