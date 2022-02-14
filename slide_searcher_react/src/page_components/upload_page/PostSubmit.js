import { Link } from "react-router-dom";

function PostSubmit({ postId = "", onSubmit = () => {} }) {
  return (
    <Link
      data-testid="submit"
      className="upload-page__submit"
      type="submit"
      to={`/uploaded/${postId}`}
      onClick={onSubmit}
    >
      Submit
    </Link>
  );
};

export {
  PostSubmit
};