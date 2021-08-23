from classifier.image_transform import ImageTransform

class Metric:
    def __init__(self, transform: ImageTransform, distance_func):
        self.__transform = transform
        self.__distance_func = distance_func

    def distance(self, image1, image2):
        image1 = self.__transform.transform(image1)
        image2 = self.__transform.transform(image2)

        return self.__distance_func(image1, image2)