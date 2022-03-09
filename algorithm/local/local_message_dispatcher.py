import argparse

from adapters.values.message import Message


def args():
    parser = argparse.ArgumentParser()
    parser.add_argument("-v", "--video", dest="video", required=True,
                        help="the path of video file to be analyzed")
    parser.add_argument("-s", "--slide-dir", dest="id", required=True,
                        help="the dir of slide file to be analyzed")
    args = vars(parser.parse_args())

    return args['id'], args['video']


def listen(on_listen):
    id, video_repository_path = args()
    on_listen(Message(id, video_repository_path, None))
