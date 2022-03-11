import ReactPlayer from "react-player";
import React from "react";
import { useParams } from "react-router-dom";

import HeaderBuilder from "../components/HeaderBuilder";
import TimelineList from "../components/common/SlideIndexList";
import SharePanel from "../components/common/SharePanel";
import SlideNavigation from "../components/common/SlideNavigation";

import "./VideoViewPage.css";
import { useVideoViewPage } from "../hooks/video_view_page/useVideoViewPage";

function VideoViewPage({ sendEmail, copyLink }) {
  const { id } = useParams();
  const { checkedTimelines, setCurrentTimelineIndex, videoControl } = useVideoViewPage(id, postResultAPI);
  const builder = new HeaderBuilder();

  return (
    <div className="view-page">
      {builder.addIcon().build()}
      <div className="view-page__main">
        <div className="view-page__slide-index-container">
          <h1>{title}</h1>
          <TimelineList
            checkedTimelines={checkedTimelines}
            onChange={setCurrentTimelineIndex}
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
            onClickSlide={setCurrentTimelineIndex}
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
