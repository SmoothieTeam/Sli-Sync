import { doc, onSnapshot } from "firebase/firestore";
import { firestore } from "./firebase_wrapper";

const db = firestore();
const getPostRef = (postId) => doc(db, "posts", postId);

function observeProgress(postId, onProgress) {
  const postRef = getPostRef(postId);
  onSnapshot(postRef, (doc) => {
    const { progress } = doc.data();
    onProgress(progress ?? 0);
  });
}

export { observeProgress };