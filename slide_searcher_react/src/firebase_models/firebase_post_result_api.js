import { doc, getDoc } from "firebase/firestore";
import { getDownloadURL, ref } from "firebase/storage";
import { firestore, storage } from "./firebase_wrapper";

const db = firestore();
const cloudStorage = storage();

async function getPostResult(postId) {
  const postDoc = await getDoc(doc(db, "posts", postId));
  const post = postDoc.data();
  const title = post.title;
  const timelines = await getTimelines(postId, post);
  const video = await getVideo(post);

  return {
    title,
    video,
    timelines,
  };
}

async function getTimelines(postId, { timeline: timelines }) {
  return await Promise.all(
    timelines.map(async (timeline) => ({
      time: timeline.time,
      url: await getSlideImageUrl(postId, timeline.slide_number),
    }))
  );
}

async function getSlideImageUrl(postId, slideImageIndex) {
  const slideImageRef = ref(
    cloudStorage,
    `${postId}/slide_images/page${slideImageIndex
      .toString()
      .padStart(3, "0")}.jpg`
  );

  return await getDownloadURL(slideImageRef);
}

async function getVideo({ video_repository_path }) {
  const videoRef = ref(cloudStorage, `${video_repository_path}`);
  const url = await getDownloadURL(videoRef);
  console.log(url);

  return {
    url,
  };
}

export { getPostResult };
