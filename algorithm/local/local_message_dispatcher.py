import argparse

from adapters.values.message import Message


def args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-i", "--id", dest="id", required=True,
                        help="the id of the post")
    parser.add_argument("-v", "--video", dest="video", required=True,
                        help="the filename of the video file to be analyzed")
    parser.add_argument("-s", "--slide", dest="slide", required=True,
                        help="the filename of the slide file to be analyzed")
    args = vars(parser.parse_args())

    return args['id'], args['video'], args['slide']


def listen(on_listen):
    id, video_filename, slide_filename = args()
    on_listen(Message(id, video_filename, slide_filename))
