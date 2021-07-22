import cv2

from skimage import color
from skimage.metrics import structural_similarity

from domain.video_loader import VideoLoader
from domain.image_loader import ImageLoader

class SlideSearcher:
    def __init__(self, image_loader: ImageLoader, video_loader: VideoLoader):
        self.images = image_loader.get_images()
        self.video_loader = video_loader

    def compress_image(self, img):
        img = cv2.resize(img, (30, 30))
        img = color.rgb2gray(img)

        return img

    def compare_image(self, img1, img2):
        img1 = self.compress_image(img1)
        img2 = self.compress_image(img2)

        return structural_similarity(img1, img2)

    def get_slide_times(self):
        similarities = [0] * len(self.images)
        times = [0] * len(self.images)
        compressed_images = list(map(self.compress_image, self.images))

        for frame_time, frame in self.video_loader.frames():
            for index, image in enumerate(compressed_images):
                similarity = self.compare_image(frame, image)
                if similarity > similarities[index]:
                    similarities[index] = similarity
                    times[index] = frame_time
        
        return times