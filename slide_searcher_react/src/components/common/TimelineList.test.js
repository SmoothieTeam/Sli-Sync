import { fireEvent, getByText, render } from "@testing-library/react";
import TimelineList from "./TimelineList";

const checkedTimelineDummy = (size) => {
  const checkedIndex = Math.floor(Math.random() * size);
  const checkedTimelines = [...Array(size)]
    .map((_, index) => ({
      time: index,
      slideImageIndex: index,
      checked: index === checkedIndex,
    }))
    .sort((a, b) => a.time - b.time);

  return checkedTimelines;
};

const timelineToTimeString = (timeline) => {
  const time = timeline.time;
  const minute = Math.floor(time / 60)
    .toString()
    .padStart(2, "0");
  const second = Math.floor(time % 60)
    .toString()
    .padStart(2, "0");
  
  return `${minute}:${second}`;
};

const randomUncheckedTimeline = (timelines) => {
  const size = timelines.length;
  const except = timelines.findIndex(
    (checkedTimleine) => checkedTimleine.checked
  );
  const indexArray = [...Array(size)]
    .map((_, index) => index)
    .filter((index) => index !== except);
  const index = Math.floor(Math.random() * indexArray.length);
  const randomIndex = indexArray[index];

  return {
    timeline: timelines[randomIndex],
    index: randomIndex,
  };
};

describe("TimelineList", () => {
  let size;
  let checkedTimelines;
  let onChangeTimeline;

  beforeEach(() => {
    size = 10;
    checkedTimelines = checkedTimelineDummy(size);
    onChangeTimeline = jest.fn();
  });

  test("renders timelines as index and time by given order.", () => {
    const { getAllByRole } = render(
      <TimelineList
        checkedTimelines={checkedTimelines}
        onChangeTimeline={onChangeTimeline}
      />
    );
    const timelineEntries = getAllByRole("listitem");
    const timeStrings = checkedTimelines.map(timelineToTimeString);

    timelineEntries.forEach((timelineEntry, index) =>
      expect(getByText(timelineEntry, timeStrings[index])).toBeTruthy()
    );
    timelineEntries.forEach((timelineEntry, index) =>
      expect(getByText(timelineEntry, index)).toBeTruthy()
    );
  });

  test("calls onChange with its index when timeline entry is clicked by slide image index.", () => {
    const { getByText } = render(
      <TimelineList
        checkedTimelines={checkedTimelines}
        onChangeTimeline={onChangeTimeline}
      />
    );
    const {timeline, index} = randomUncheckedTimeline(checkedTimelines);
    const timelineEntry = getByText(timeline.slideImageIndex);

    fireEvent.click(timelineEntry);

    expect(onChangeTimeline).toBeCalledTimes(1);
    expect(onChangeTimeline).toBeCalledWith(index);
  });
  
  test("calls onChange with its index when timeline entry is clicked by time string.", () => {
    const { getAllByText } = render(
      <TimelineList
        checkedTimelines={checkedTimelines}
        onChangeTimeline={onChangeTimeline}
      />
    );
    const {timeline, index} = randomUncheckedTimeline(checkedTimelines);
    const timeString = timelineToTimeString(timeline);
    const timelineEntry = getAllByText(timeString)[0];

    fireEvent.click(timelineEntry);

    expect(onChangeTimeline).toBeCalledTimes(1);
    expect(onChangeTimeline).toBeCalledWith(index);
  });
});
