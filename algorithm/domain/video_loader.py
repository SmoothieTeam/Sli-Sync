import os

from domain.common_loader import working_dir_of


def video_file_dir_of(id):
    return working_dir_of(id)


def video_file_path_of(id, filename):
    return os.path.join(video_file_dir_of(id), filename)


def mkdir_if_not_exists(dir):
    if not os.path.isdir(dir):
        os.mkdir(dir)
