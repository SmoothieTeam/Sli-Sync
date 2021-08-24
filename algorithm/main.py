import argparse
import time as t
import cv2
import numpy as np
from skimage.metrics import mean_squared_error, structural_similarity

from classifier.rate_slide_classifier import RateSlideClassifier
from frame_queue_loader.rate_frame_queue_loader import RateFrameQueueLoader
from frame_queue_loader.single_frame_queue_loader import SingleFrameQueueLoader
from classifier.max_distance_slide_classifier import MaxDistanceSlideClassifier
from classifier.min_distance_slide_classifier import MinDistanceSlideClassifier
from slide_loader.pdf_image_loader import PDFImageLoader
from slide_loader.ppt_image_loader import PPTImageLoader
from slide_loader.cached_image_loader import CachedImageLoader
from frame_loader.cv2_frame_loader import CV2FrameLoader
from domain.slide_searcher import SlideSearcher
from classifier.simple_slide_classifier import SimpleSlideClassifier
from domain.slide_classifier import SlideClassifier
from image_transform.resize_image_transform import ResizeImageTransform
from image_transform.gray_image_transform import GrayImageTransform
from frame_queue_loader.frame_theshold_finder import FrameThresholdFinder

# ppt, pdf에 따른 인자 이름 변경 필요
parser = argparse.ArgumentParser()

parser.add_argument("-v", "--video", dest="video", required=True,
                    help="the path to your video file to be analyzed")
parser.add_argument("-p", "--ppt", dest="ppt", required=True,
                    help="the path to your ppt file to be analyzed")
parser.add_argument("-t", "--time", type=float, dest="time", default=None,
                    help="time quantum to analyze")
parser.add_argument("-f", "--frame", type=int, dest="frame", default=None,
                    help="frame quantum to analyze")
parser.add_argument("-e", "--elasped", dest="elasped", default=False,
                    help="elasped time taken for the program to run")

args = vars(parser.parse_args())

if args['time'] and args['frame']:
    raise ValueError('Only one argument required between "time" and "frame"')

def sec2min_sec(sec):
    return str(int(sec / 60)) + ':' + str(int(sec) % 60)

def main():
    ppt_path, video_path = args['ppt'], args['video']

    print("pdf : {0}".format(ppt_path))
    print("video : {0}\n".format(video_path))
    print("start analyzation...\n")

    starttime = t.time()
    
    frame_transform = ResizeImageTransform((100, 100))
    slide_transform = ResizeImageTransform((200, 200))
    slide_loader = PDFImageLoader(ppt_path)
    slide_loader = CachedImageLoader(slide_loader)
    frame_loader = CV2FrameLoader(video_path, frame_step=args['frame'], second_step=args['time'])

    threshold_finder = FrameThresholdFinder(slide_loader, frame_transform, mean_squared_error)
    frame_queue_loader = RateFrameQueueLoader(frame_loader, frame_transform, mean_squared_error, threshold_finder)
    slide_classifier = MinDistanceSlideClassifier(slide_loader, slide_transform, mean_squared_error)
    searcher = SlideSearcher(slide_classifier, frame_queue_loader)
    
    times = searcher.get_slide_times()

    slide_numbers = sorted(times.keys())
    minute_times = {}
    for slide_number in slide_numbers:
        minute_times[slide_number] = []
        timelines = times[slide_number]
        for timeline in timelines:
            if type(timeline) == type([]):
                start, end = timeline
                minute_times[slide_number].append([sec2min_sec(start), sec2min_sec(end)])
            else:
                minute_times[slide_number].append(sec2min_sec(timeline))
    for time in minute_times.items():
        print(time)

    if args['elasped']:
        elaspedtime = t.time() - starttime
        print('elasped time : {0}m{1}s'.format(int(elaspedtime / 60), int(elaspedtime % 60)))

if __name__ == '__main__':
    main()
