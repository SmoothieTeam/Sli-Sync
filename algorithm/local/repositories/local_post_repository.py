from domain.values.timelines import Timelines


def set_timelines(id: str, timelines: Timelines):
    print(id)
    for time, slide_number in timelines:
        print(time, slide_number)


def set_progress(id: str, progress: float):
    print(id, progress)
