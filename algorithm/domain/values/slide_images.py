import cv2


class SlideImages:
    def __init__(self, slide_images):
        self.__slide_images = slide_images

    @property
    def aspect_ratio(self) -> float:
        height, width = self.size
        return width / height

    @property
    def size(self) -> tuple[int, int]:
        shape = self.__slide_images[0].shape
        height = shape[0]
        width = shape[1]
        return height, width

    def __getitem__(self, index):
        return self.__slide_images[index]

    def __len__(self):
        return len(self.__slide_images)

    def min_distance(self, distance) -> float:
        distances = [distance(self.__slide_images[i-1], self.__slide_images[i])
                     for i in range(1, len(self.__slide_images))]
        return min(distances) + 1

    def resize(self, size: tuple[int, int]):
        height, width = size
        self.__slide_images = list(map(lambda slide_image: cv2.resize(slide_image, (width, height)),
                                       self.__slide_images))
        return self

    def rescale(self, height=0, width=0):
        size = (0, 0)
        if height == 0 and width == 0:
            return
        elif height != 0:
            width = int(height * self.aspect_ratio)
            size = (height, width)
        else:
            height = int(height * self.aspect_ratio)
            size = (height, width)
        return self.resize(size)

    def gray(self):
        self.__slide_images = list(map(lambda slide_image: cv2.cvtColor(slide_image, cv2.COLOR_BGR2GRAY),
                                       self.__slide_images))
        return self
