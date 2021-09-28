import os
import cv2
from pdf2image import convert_from_path

from data_adapter.image_loader import ImageLoader

class PDFImageLoader(ImageLoader):
    def __init__(self, ppt_path):
        self.path = ppt_path

    def get_file_list(self):
        return os.listdir('imgs')

    def pdf2image(self):
        images = convert_from_path(self.path)

        if not os.path.isdir('imgs'):
            os.mkdir('imgs')

        for i in range(len(images)):
            images[i].save('./imgs/page'+ str(i).zfill(3) +'.jpg', 'JPEG')

    def images(self):
        images = []

        self.pdf2image()
        files = self.get_file_list()
        files = sorted(files)
        for file in files:
            image = cv2.imread('./imgs/' + file)
            images.append(image)

        return images
