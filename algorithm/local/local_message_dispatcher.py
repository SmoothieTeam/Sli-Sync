import argparse
from skimage.metrics import mean_squared_error
from adapters.classifier import classify
from adapters.values.message import Message
from local.local_classify_listener import LocalClassifyListener


def listen(on_listen):
    id, video_filename, slide_filename = __args()
    message = Message(id, video_filename, slide_filename)
    on_listen(message)


def __args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--id", dest="id", required=True,
                        help="the id of the post")
    parser.add_argument("-v", "--video", dest="video", required=True,
                        help="the filename of the video file to be analyzed")
    parser.add_argument("-s", "--slide", dest="slide", required=True,
                        help="the filename of the slide file to be analyzed")
    args = vars(parser.parse_args())

    return args['id'], args['video'], args['slide']


def on_listen(message: Message):
    slide_path = message.slide_path
    video_path = message.video_path

    listener = LocalClassifyListener(message)
    classify(slide_path, video_path, mean_squared_error, listener)
