from collections import namedtuple


Timeline = namedtuple('Timeline', ('time', 'slide_number'))


class Timelines:
    def __init__(self):
        self.__timelines: list[Timeline] = []

    def append(self, timeline):
        last_timeline = self.__last_timeline()

        if self.__is_appendable(last_timeline, timeline):
            self.__timelines.append(timeline)

    def __len__(self):
        return len(self.__timelines)

    def __getitem__(self, index):
        return self.__timelines[index]

    def __last_timeline(self):
        if self.__timelines == []:
            return Timeline(-1, -1)
        else:
            return self.__timelines[-1]

    def __is_appendable(self, timeline1: Timeline, timeline2: Timeline) -> bool:
        return timeline1.slide_number != timeline2.slide_number
