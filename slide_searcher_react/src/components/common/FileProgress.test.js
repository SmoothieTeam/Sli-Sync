import { render } from "@testing-library/react";
import FileProgressStatus from "../../value/file_progress_status";
import FileProgress from "./FileProgress";
import '@testing-library/jest-dom';

const fakeFile = (name) => ({ name });
const containingText = (text) => (content, _) => content.includes(text);

describe('FileProgress', () => {
  let filename;
  let file;

  beforeEach(() => {
    filename = "file.ext";
    file = fakeFile(filename);
  });

  test("visible if the progress is greater than 0 and less than or equal to 1.", () => {
    const progress = Math.min(Math.random() + 0.01, 1);
    const percentagedProgress = Math.round(progress * 100);
    const nonzeroProgressStatus = new FileProgressStatus(file, progress);
    const { queryByText } = render(<FileProgress progressStatus={nonzeroProgressStatus}/>);

    expect(queryByText(containingText(filename))).toBeInTheDocument();
    expect(queryByText(containingText(`${percentagedProgress} %`))).toBeInTheDocument();
  });

  test("visible if the progress is equal to 1.", () => {
    const progress = 1;
    const percentagedProgress = 100;
    const progressedStatus = new FileProgressStatus(file, progress);
    const { queryByText } = render(<FileProgress progressStatus={progressedStatus}/>);

    expect(queryByText(containingText(filename))).toBeInTheDocument();
    expect(queryByText(containingText(`${percentagedProgress} %`))).toBeInTheDocument();
  });
});