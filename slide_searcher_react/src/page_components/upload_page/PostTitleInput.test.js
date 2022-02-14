import { PostTitleInput } from "./PostTitleInput";
import { fireEvent, render } from "@testing-library/react";

test("PostTitleInput should call onChange with written text", () => {
  const onChange = jest.fn();
  const title = "title";
  const { getByTestId } = render(<PostTitleInput onChange={onChange}/>);
  const titleInput = getByTestId("title-input");

  fireEvent.change(titleInput, {target: {value: title}});
  
  expect(onChange.mock.calls[0][0]).toBe(title);
});
