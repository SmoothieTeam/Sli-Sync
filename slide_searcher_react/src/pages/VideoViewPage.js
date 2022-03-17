import ReactPlayer from "react-player";
import React from "react";
import { useParams } from "react-router-dom";

import HeaderBuilder from "../components/common/HeaderBuilder";
import TimelineList from "../components/common/TimelineList";
import SharePanel from "../components/common/SharePanel";
import SlideNavigation from "../components/common/SlideNavigation";

import "./VideoViewPage.css";
import { useVideoViewPage } from "../hooks/video_view_page/useVideoViewPage";
import { useHistory } from "react-router-dom";

function VideoViewPage({ postResultAPI, sendEmail, copyLink }) {
  const { id } = useParams();
  const history = useHistory();
  const {
    isLoading,
    hasData,
    title,
    checkedTimelines,
    setCurrentTimelineIndex,
    videoControl,
  } = useVideoViewPage(id, postResultAPI);
  const builder = new HeaderBuilder();
  const header = builder.addIcon().build();

  if (isLoading) return "";
  if (!hasData) history.push("/NotFound");

  return (
    <div className="view-page">
      {header}
      <div className="view-page__main">
        <div className="view-page__slide-index-container">
          <h1>{title}</h1>
          <TimelineList
            checkedTimelines={checkedTimelines}
            onChangeTimeline={setCurrentTimelineIndex}
          />
        </div>
        <div className="view-page__content-container">
          <ReactPlayer
            ref={videoControl.player}
            url={videoControl.src}
            playing
            controls
            width="900px"
            height="506px"
            type="video/mp4"
          />
          <SlideNavigation
            className="view-page__slide-nav"
            checkedTimelines={checkedTimelines}
            onChangeSlide={setCurrentTimelineIndex}
          />
          <SharePanel
            link={window.location.href}
            title={title}
            sendEmail={sendEmail}
            copyLink={copyLink}
          />
        </div>
      </div>
    </div>
  );
}

export default VideoViewPage;
