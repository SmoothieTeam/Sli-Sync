from classifier.mserate_slide_classifier import MSERateSlideClassifier
from frame_queue_loader.mserate_frame_queue_loader import MSERateFrameQueueLoader
from frame_queue_loader.single_frame_queue_loader import SingleFrameQueueLoader
from data_loader.pdf_image_loader import PDFImageLoader
from data_loader.ppt_image_loader import PPTImageLoader
from data_loader.cv2_frame_loader import CV2FrameLoader
from domain.slide_searcher import SlideSearcher
from classifier.mse_slide_classifier import MSESlideClassifier
from classifier.ssim_slide_classifier import SSIMSlideClassifier
from classifier.simple_slide_classifier import SimpleSlideClassifier
from domain.slide_classifier import SlideClassifier
import argparse
import numpy as np
import time as t

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

    frame_loader = CV2FrameLoader(video_path, frame_step=args['frame'], second_step=args['time'])
    frame_queue_loader = MSERateFrameQueueLoader(frame_loader, (481, 360), 500)
    image_loader = PDFImageLoader(ppt_path)
    slide_classifier = MSERateSlideClassifier(image_loader, (481, 360))
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
