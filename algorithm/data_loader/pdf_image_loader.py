import os
import cv2
from domain.image_loader import ImageLoader
from pdf2image import convert_from_path

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

    def get_images(self):
        images = []

        self.pdf2image()
        files = self.get_file_list()
        files = sorted(files)
        for file in files:
            image = cv2.imread('./imgs/' + file, cv2.IMREAD_COLOR)
            images.append(image)

        return images
