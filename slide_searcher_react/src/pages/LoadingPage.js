import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import HeaderBuilder from "../components/HeaderBuilder";
import LoadingAnimation from "../components/LoadingAnimation";
import "./LoadingPage.css";

function LoadingPage({ getProgress }) {
  const { id } = useParams();
  const history = useHistory();
  const [progress, setProgress] = useState(0);
  const headerBuilder = new HeaderBuilder();

  useEffect(() => {
    getProgress(id, ({ progress, isProgressed }) => {
      setProgress(progress);

      if (isProgressed) {
        history.push(`/view/${id}`);
      }
    });
  }, []);

  return (
    <div className="loading-page">
      {headerBuilder.build()}
      <div className="loading-page__main">
        <LoadingAnimation className="load-page__animation" />
        <progress max="100" value={progress} />

        <h2>{progress}%</h2>
        <p>
          It's <strong>Okay</strong> to move to another screen or exit window{" "}
          <br />
          while we set things up for you!
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;
