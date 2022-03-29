import React from "react";
import { useParams } from "react-router-dom";
import HeaderBuilder from "../components/common/HeaderBuilder";
import SharePanel from "../components/common/SharePanel";
import { usePostTitle } from "../hooks/uploaded_page/usePostTitle";
import "./UploadedPage.css";

function UploadedPage({ postStatusAPI, sendEmail, copyLink }) {
  const { id } = useParams();
  const headerBuilder = new HeaderBuilder();
  const { postTitle } = usePostTitle(id, postStatusAPI);

  return (
    <div className="uploaded-page">
      {headerBuilder.build()}
      <div className="uploaded-page__main">
        <img src="/cloud_done_b.svg" />
        <h2>DONE</h2>
        <p>
          Please check the results through the link below and get sharable link
          : )
        </p>
        <SharePanel
          className="uploaded-page__share-panel"
          link={`http://${window.location.host}/loading/${id}/`}
          title={postTitle}
          sendEmail={sendEmail}
          copyLink={copyLink}
        />
      </div>
    </div>
  );
}

export default UploadedPage;
