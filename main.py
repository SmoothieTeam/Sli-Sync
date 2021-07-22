from data_loader.pdf_image_loader import PDFImageLoader
from data_loader.ppt_image_loader import PPTImageLoader
from data_loader.directory_video_loader import DirectoryVideoLoader
from domain.slide_searcher import SlideSearcher
from classifier.scikit_slide_classifier import ScikitSlideClassifier
from domain.slide_classifier import SlideClassifier
import argparse
import numpy as np

# ppt, pdf에 따른 인자 이름 변경 필요
parser = argparse.ArgumentParser()
parser.add_argument("-v", "--video", dest="video", required=True,
                    help="the path to your video file to be analyzed")
parser.add_argument("-p", "--ppt", dest="ppt", required=True,
                    help="the path to your ppt file to be analyzed")
args = vars(parser.parse_args())

def main():
    ppt_path, video_path = args['ppt'], args['video']

    video_loader = DirectoryVideoLoader(video_path)
    image_loader = PDFImageLoader(ppt_path)
    scikit_slide_classifier = ScikitSlideClassifier(image_loader)
    searcher = SlideSearcher(scikit_slide_classifier, video_loader)

    times = searcher.get_slide_times()
    for key in sorted(times.items()):
        print("{0} : {1}".format(key, times[key]))

if __name__ == '__main__':
    main()
