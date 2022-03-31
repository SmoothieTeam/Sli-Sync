from domain.values.path import Path, Directory


class Message:
    def __init__(self, id, video_filename, slide_filename):
        self.id = id
        self.video_filename = video_filename
        self.slide_filename = slide_filename

    @property
    def video_path(self):
        return Path(Directory(self.id), self.video_filename)

    @property
    def slide_path(self):
        return Path(Directory(self.id), self.slide_filename)
