import os
import shutil


class Directory:
    def __init__(self, dir):
        self.__dir = dir

    @property
    def path(self):
        return self.__dir

    def mkdir(self):
        if not os.path.isdir(self.__dir):
            os.mkdir(self.__dir)

    def rmdir(self):
        if os.path.isdir(self.__dir):
            shutil.rmtree(self.__dir)

    def append(self, directory):
        new_dir = os.path.join(self.__dir, directory.path)

        return Directory(new_dir)

    @property
    def files(self):
        filenames = sorted(os.listdir(self.__dir))

        return list(map(lambda filename: Path(self, filename), filenames))


class Path:
    def __init__(self, directory: Directory, filename: str):
        self.directory = directory
        self.filename = filename

    @property
    def full_path(self):
        return os.path.join(self.directory.path, self.filename)
