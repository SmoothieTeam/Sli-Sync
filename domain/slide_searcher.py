import cv2

from skimage import color
import skimage
from skimage.metrics import structural_similarity
from domain.video_loader import VideoLoader
from domain.image_loader import ImageLoader

class SlideSearcher:
    def __init__(self, image_loader: ImageLoader, video_loader: VideoLoader):
        self.images = image_loader.getImages()
        self.video_loader = video_loader

    def compress_image(self, img):
        img = cv2.resize(img, (10, 10))
        img = color.rgb2gray(img)

        return img

    def compare_image(self, img1, img2):
        img1 = self.compress_image(img1)
        img2 = self.compress_image(img2)

        return structural_similarity(img1, img2)

    def getSlideTimes(self):
        similarities = [0] * len(self.images)
        times = [0] * len(self.images)
        compressed_images = list(map(self.compress_image, self.images))

        for frame_time, frame in self.video_loader.frames():
            # print(compressed_images)
            for index, image in enumerate(compressed_images):
                similarity = self.compare_image(frame, image)
                # print(index, similarity, similarities)
                if similarity > similarities[index]:
                    similarities[index] = similarity
                    times[index] = frame_time
                    # print(frame_time, similarities)
        
        return times