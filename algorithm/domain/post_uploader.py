from abc import ABC, abstractmethod
from domain.values.path import Path
from values.timelines import Timelines


class PostUploader(ABC):
    @abstractmethod
    def upload_timelines(self, id: str, timelines: Timelines):
        pass

    @abstractmethod
    def upload_slide_images(self, path: Path):
        pass

    @abstractmethod
    def update_progress(self, id: str, progress: float):
        pass
