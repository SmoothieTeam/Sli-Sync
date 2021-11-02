import argparse

def args():
    # ppt, pdf 에 따른 인자 이름 변경 필요
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

    return args['video'], args['ppt'], args['time'], args['frame'], args['elasped']
