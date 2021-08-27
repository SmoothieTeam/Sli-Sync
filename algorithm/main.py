import argparse
import time as t
from skimage.metrics import mean_squared_error, structural_similarity

from data_loader.pdf_image_loader import PDFImageLoader
from data_loader.ppt_image_loader import PPTImageLoader
from data_loader.uniform_frame_loader import UniformFrameLoader
from data_loader.cv2_frame_loader import CV2FrameLoader

from data_adapter.frame_queue_loader.rate_frame_queue_loader import RateFrameQueueLoader
from data_adapter.frame_queue_loader.single_frame_queue_loader import SingleFrameQueueLoader

from data_adapter.image_transform.resize_image_transform import ResizeImageTransform
from data_adapter.image_transform.gray_image_transform import GrayImageTransform
from data_adapter.image_transform.crop_image_transform import CropImageTransform
from data_adapter.image_transform.identity_image_transform import IdentityImageTransform

from data_adapter.frame_queue_loader.neighbor_frame_theshold_finder import NeighborFrameThresholdFinder
from data_adapter.area_finder.slide_area_finder import SlideAreaFinder

from data_adapter.slide_adapter import SlideAdapter

from domain.slide_searcher import SlideSearcher
from domain.classifier.rate_slide_classifier import RateSlideClassifier
from domain.classifier.simple_slide_classifier import SimpleSlideClassifier
from domain.classifier.max_distance_slide_classifier import MaxDistanceSlideClassifier
from domain.classifier.min_distance_slide_classifier import MinDistanceSlideClassifier

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
    uniform_frame_loader = UniformFrameLoader(video_path)

    image_loader = PDFImageLoader(ppt_path)
    slide_loader = SlideAdapter(image_loader)

    slide_area_finder = SlideAreaFinder(slide_loader, uniform_frame_loader, 8)
    
    crop_transform = CropImageTransform(slide_area_finder.find_mask())
    # crop_transform = IdentityImageTransform()
    threshold_transform = ResizeImageTransform((100, 100))
    frame_transform = ResizeImageTransform((100, 100), crop_transform)
    slide_transform = ResizeImageTransform((200, 200))

    threshold_finder = NeighborFrameThresholdFinder(slide_loader, threshold_transform, mean_squared_error)
    frame_queue_loader = RateFrameQueueLoader(frame_loader, frame_transform, mean_squared_error, threshold_finder)
    slide_classifier = MinDistanceSlideClassifier(slide_loader, slide_transform, crop_transform, mean_squared_error)
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
