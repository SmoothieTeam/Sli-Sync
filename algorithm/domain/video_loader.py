import os


def video_file_dir_of(id):
    return f'./{id}'


def video_file_path_of(id, filename):
    return os.path.join(video_file_dir_of(id), filename)
