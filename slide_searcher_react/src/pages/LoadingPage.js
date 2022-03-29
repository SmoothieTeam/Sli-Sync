import React from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router-dom";
import HeaderBuilder from "../components/common/HeaderBuilder";
import LoadingAnimation from "../components/common/LoadingAnimation";
import { usePostProgress } from "../hooks/loading_page/usePostProgress";
import "./LoadingPage.css";

function LoadingPage({postStatusAPI}) {
  const { id } = useParams();
  const history = useHistory();
  const { progressInPercent, isProgressed } = usePostProgress(id, postStatusAPI);
  const headerBuilder = new HeaderBuilder();

  if (isProgressed) {
    history.push(`/view/${id}`);
  }

  return (
    <div className="loading-page">
      {headerBuilder.build()}
      <div className="loading-page__main">
        <LoadingAnimation className="load-page__animation" />
        <progress max="100" value={progressInPercent} />

        <h2>{progressInPercent}%</h2>
        <p>
          It's <strong>Okay</strong> to move to another screen or exit window
          <br />
          while we set things up for you!
        </p>
      </div>
    </div>
  );
}

export default LoadingPage;
