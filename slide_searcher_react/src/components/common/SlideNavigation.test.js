import { fireEvent, getByRole, render } from "@testing-library/react";
import SlideNavigation from "./SlideNavigation";
import "@testing-library/jest-dom";

const checkedTimelineDummy = (size, checkedIndex = Math.floor(Math.random() * size)) => {
  const checkedTimelines = [...Array(size)].map((_, index) => ({url: `${Math.floor(Math.random() * 30)}.png`, checked: index === checkedIndex})).sort((a, b) => a.time - b.time);
  return checkedTimelines;
};

const checkedIndexOf = (checkedTimelines) => checkedTimelines.findIndex((checkedTimeline) => checkedTimeline.checked);

const getImgFromSlideImageEntry = (slideImageEntry) => getByRole(slideImageEntry, 'img'); 

const getInputFromSlideImageEntry = (slideImageEntry) => getByRole(slideImageEntry, 'radio'); 

const randomIndex = (size, execpt = undefined) => {
  const indexArray = [...Array(size)].map((_, index) => index).filter((index) => index !== execpt);
  const index = Math.floor(Math.random() * indexArray.length);
  return indexArray[index];
};

describe('SlideNavigation with random checked timeline index', () => {
  let size;
  let checkedTimelines;
  let onChangeSlide;

  beforeEach(() => {
    size = 2;
    checkedTimelines = checkedTimelineDummy(size);
    onChangeSlide = jest.fn();
  });

  test('renders timelines as slide images by given order.', () => {
    const { getAllByRole } = render(<SlideNavigation checkedTimelines={checkedTimelines} onChangeSlide={onChangeSlide}/>);
    const slideImageEntries = getAllByRole('listitem');
    const slideImages = slideImageEntries.map(getImgFromSlideImageEntry);

    slideImages.forEach((slideImage, index) => expect(slideImage).toHaveAttribute('src', checkedTimelines[index].url));
  });

  test('calls onClickSlide with its index when the slide image is clicked.', () => {
    const { getByRole } = render(<SlideNavigation checkedTimelines={checkedTimelines} onChangeSlide={onChangeSlide}/>);
    const checkedIndex = checkedIndexOf(checkedTimelines);
    const slideImageIndex = randomIndex(size, checkedIndex);
    const slideImageEntry = getByRole('listitem', {name: `slide-image-${slideImageIndex}`});
    const slideImageInput = getInputFromSlideImageEntry(slideImageEntry);

    fireEvent.click(slideImageInput);

    expect(onChangeSlide).toBeCalledTimes(1);
    expect(onChangeSlide).toBeCalledWith(slideImageIndex);
  });
});

describe('SlideNavigation with fixed checked timeline index', () => {
  let size;
  let onChangeSlide;

  beforeEach(() => {
    size = 10;
    onChangeSlide = jest.fn();
  });

  test('navigates index to current index + 1 when the next button is clicked and the current index is not equal to last index.', () => {
    const indexLessThanLastIndex = randomIndex(size - 1);
    const checkedTimelines = checkedTimelineDummy(size, indexLessThanLastIndex);
    const { getByRole } = render(<SlideNavigation checkedTimelines={checkedTimelines} onChangeSlide={onChangeSlide}/>);
    const checkedIndex = checkedIndexOf(checkedTimelines);
    const nextButton = getByRole('button', {name: 'next-button'});

    fireEvent.click(nextButton);

    expect(onChangeSlide).toBeCalledTimes(1);
    expect(onChangeSlide).toBeCalledWith(checkedIndex + 1);
  });

  test('navigates index to current index - 1 when the previous button is clicked and the current index is not equal to 0.', () => {
    const indexLargerThanZero = randomIndex(size - 1) + 1;
    const checkedTimelines = checkedTimelineDummy(size, indexLargerThanZero);
    const { getByRole } = render(<SlideNavigation checkedTimelines={checkedTimelines} onChangeSlide={onChangeSlide}/>);
    const checkedIndex = checkedIndexOf(checkedTimelines);
    const previousButton = getByRole('button', {name: 'previous-button'});

    fireEvent.click(previousButton);

    expect(onChangeSlide).toBeCalledTimes(1);
    expect(onChangeSlide).toBeCalledWith(checkedIndex - 1);
  });

  test('navigates index to last index when the next button is clicked and the current index is equal to last index.', () => {
    const checkedTimelines = checkedTimelineDummy(size, size - 1);
    const { getByRole } = render(<SlideNavigation checkedTimelines={checkedTimelines} onChangeSlide={onChangeSlide}/>);
    const nextButton = getByRole('button', {name: 'next-button'});

    fireEvent.click(nextButton);

    expect(onChangeSlide).toBeCalledTimes(1);
    expect(onChangeSlide).toBeCalledWith(checkedTimelines.length - 1);
  });

  test('navigates index to 0 when the previous button is clicked and the current index is equal to 0.', () => {
    const checkedTimelines = checkedTimelineDummy(size, 0);
    const { getByRole } = render(<SlideNavigation checkedTimelines={checkedTimelines} onChangeSlide={onChangeSlide}/>);
    const previousButton = getByRole('button', {name: 'previous-button'});

    fireEvent.click(previousButton);

    expect(onChangeSlide).toBeCalledTimes(1);
    expect(onChangeSlide).toBeCalledWith(0);
  });
});