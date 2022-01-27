from skimage.metrics import mean_squared_error, structural_similarity

from argument import args
from print import print_start_message, print_result, print_time

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

def main():
    video_path, ppt_path, time_step, frame_step, print_elapsed = args()
    print_start_message(ppt_path, video_path)

    frame_loader = CV2FrameLoader(video_path, frame_step=frame_step, second_step=time_step)
    uniform_frame_loader = UniformFrameLoader(video_path)

    image_loader = PDFImageLoader(ppt_path)
    slide_loader = SlideAdapter(image_loader)

    slide_area_finder = SlideAreaFinder(slide_loader, uniform_frame_loader, 6)
    
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
    print_result(times)
    print_time(print_elapsed)

if __name__ == '__main__':
    main()
