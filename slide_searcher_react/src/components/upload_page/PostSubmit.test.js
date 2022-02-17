import PostSubmit from "./PostSubmit";
import { fireEvent, render } from "@testing-library/react";
import { MemoryRouter, Route } from "react-router-dom";

const randomString = () => Math.random().toString(36).substring(2, 11);

test("PostSubmit should call onSubmit callback", () => {
  const onSubmit = jest.fn();
  const { getByTestId } = render(
    <MemoryRouter>
      <PostSubmit onSubmit={onSubmit} />
    </MemoryRouter>
  );
  const submitButton = getByTestId("submit");

  fireEvent.click(submitButton);

  expect(onSubmit.mock.calls.length).toBe(1);
});

test("PostSubmit should redirect to given uploaded page", () => {
  const postId = randomString();
  let testLocation;
  const { getByTestId } = render(
    <MemoryRouter>
      <PostSubmit postId={postId} />
      <Route
        path="*"
        render={({ location }) => {
          testLocation = location;
          return null;
        }}
      />
    </MemoryRouter>
  );
  const submitButton = getByTestId("submit");

  fireEvent.click(submitButton);

  expect(testLocation.pathname).toBe(`/uploaded/${postId}`);
});
