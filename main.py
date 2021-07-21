from data_loader.ppt_image_loader import PPTImageLoader
from data_loader.directory_video_loader import DirectoryVideoLoader
from domain.slide_searcher import SlideSearcher

def extract_args():
    pass

def main():
    ppt_path, video_path = extract_args()

    video_loader = DirectoryVideoLoader(video_path)
    image_loader = PPTImageLoader(ppt_path)
    searcher = SlideSearcher(image_loader, video_loader)

    times = searcher.getSlideTimes()
    print(times)

main()