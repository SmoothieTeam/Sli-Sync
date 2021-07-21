import os
import cv2
from domain.image_loader import ImageLoader
from pdf2image import convert_from_path

class PDFImageLoader(ImageLoader):
    def __init__(self, ppt_path):
        self.path = ppt_path

    def getFileList(self):
        return os.listdir("pngs")

    def pdf2image(self):
        images = convert_from_path(self.path)

        if not os.path.isdir('pngs'):
            os.mkdir('pngs')

        for i in range(len(images)):
            # Save pages as images in the pdf
            images[i].save('./pngs/page'+ str(i) +'.jpg', 'JPEG')

    def getImages(self):
        images = []

        self.pdf2image()
        files = self.getFileList()
        for file in files:
            image = cv2.imread(file, cv2.IMREAD_COLOR)
            images.append(image)
        print(images)
        cv2.imshow('test', images[0])
        return images
