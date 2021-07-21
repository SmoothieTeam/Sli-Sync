from data_loader.ppt_image_loader import PPTImageLoader
from data_loader.directory_video_loader import DirectoryVideoLoader
from domain.slide_searcher import SlideSearcher
import argparse

parser = argparse.ArgumentParser()
parser.add_argument("-v", "--video", dest="video", required=True,
                    help="the path to your video file to be analyzed")
parser.add_argument("-p", "--ppt", dest="ppt", required=True,
                    help="the path to your ppt file to be analyzed")
args = vars(parser.parse_args())

def main():
    ppt_path, video_path = args.ppt, args.video

    video_loader = DirectoryVideoLoader(video_path)
    image_loader = PPTImageLoader(ppt_path)
    searcher = SlideSearcher(image_loader, video_loader)

    times = searcher.getSlideTimes()
    print(times)

if __name__ == '__main__':
main()
