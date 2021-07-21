from domain.image_loader import ImageLoader
from pptx_tools import utils
import os
import cv2

class PPTImageLoader(ImageLoader):
    def __init__(self, ppt_path):
        self.path = ppt_path

    def getFileList(self):
        return os.listdir("pngs")

    def ppt2png(self):
        my_path = os.path.dirname(os.path.abspath(__file__))
        png_folder = os.path.join(my_path, "pngs")
        pptx_file = os.path.join(my_path, self.path)

        if os.path.isdir('pngs'):
            os.rmdir('pngs')

        utils.save_pptx_as_png(png_folder, pptx_file)

    def getImages(self):
        images = []

        self.ppt2png()
        files = self.getFileList()

        for file in files:
            image = cv2.imread(file, cv2.IMREAD_COLOR)
            images.append(image)

        return images
