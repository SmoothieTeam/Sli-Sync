import { fireEvent, render, waitFor } from "@testing-library/react";
import HorizontalList from "./HorizontalList";

describe('HorizontalList', () => {
  test('scrolls horizontally', async () => {
    const { getByRole } = render(<HorizontalList></HorizontalList>);
    const list = getByRole('list');

    fireEvent.wheel(list, { deltaY: 30 });

    expect(list.scrollLeft).toBe(30);
  });
});