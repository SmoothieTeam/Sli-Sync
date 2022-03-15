import { fireEvent, getByText, render } from "@testing-library/react";
import TimelineList from "./TimelineList";

const checkedTimelineDummy = (size) => {
  const checkedIndex = Math.floor(Math.random() * size);
  const checkedTimelines = [...Array(size)].map((_, index) => ({time: Math.random() * 30, checked: index === checkedIndex})).sort((a, b) => a.time - b.time);
  return checkedTimelines;
};

const timelineToTimeString = (timeline) => {
  const time = timeline.time;
  const minute = Math.floor(time / 60).toString().padStart(2, '0');
  const second = Math.floor(time % 60).toString().padStart(2, '0');
  return `${minute}:${second}`;
};

const randomIndex = (size, execpt = undefined) => {
  const indexArray = [...Array(size)].map((_, index) => index).filter((index) => index !== execpt);
  const index = Math.floor(Math.random() * indexArray.length);
  return indexArray[index];
};

describe('TimelineList', () => {
  let size;
  let checkedTimelines;
  let onChangeTimeline;

  beforeEach(() => {
    size = 10;
    checkedTimelines = checkedTimelineDummy(size);
    onChangeTimeline = jest.fn();
  });

  test('renders timelines as index and time by given order.', () => {
    const { getAllByRole } = render(<TimelineList checkedTimelines={checkedTimelines} onChangeTimeline={onChangeTimeline}/>);
    const timelineEntries = getAllByRole('listitem');
    const timeStrings = checkedTimelines.map(timelineToTimeString);

    timelineEntries.forEach((timelineEntry, index) => expect(getByText(timelineEntry, timeStrings[index])).toBeTruthy());
    timelineEntries.forEach((timelineEntry, index) => expect(getByText(timelineEntry, index)).toBeTruthy()); 
  });

  test('calls onChange with its index when timeline entry is clicked.', () => {
    const { getByText } = render(<TimelineList checkedTimelines={checkedTimelines} onChangeTimeline={onChangeTimeline}/>);
    const checkedTimelineIndex = checkedTimelines.findIndex((checkedTimleine) => checkedTimleine.checked);
    const timelineIndex = randomIndex(size, checkedTimelineIndex);
    const timelineEntry = getByText(timelineIndex);

    fireEvent.click(timelineEntry);

    expect(onChangeTimeline).toBeCalledTimes(1);
    expect(onChangeTimeline).toBeCalledWith(timelineIndex);
  });
});