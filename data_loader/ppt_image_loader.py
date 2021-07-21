from domain.image_loader import ImageLoader
from pptx_tools import utils
import os

class PPTImageLoader(ImageLoader):
    def __init__(self, ppt_path):
        self.path = ppt_path

    def getfilelist(self):
        self.list = os.listdir("pngs/")

    def ppt2png(self):
        my_path = os.path.dirname(os.path.abspath(__file__))
        png_folder = os.path.join(my_path, "pngs")
        pptx_file = os.path.join(my_path, self.path)

        if os.path.isdir('pngs'):
            os.rmdir('pngs')

        utils.save_pptx_as_png(png_folder, pptx_file)

    def getImages(self):
        imglist = []

        for img in self.list:
            imgfile = cv2.imread(img, cv2.IMREAD_COLOR)
            imglist.append(imgfile)

        return imglist
