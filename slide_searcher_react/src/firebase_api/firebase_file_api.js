import { deleteObject, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./firebase_wrapper";

const cloudStorage = storage();

const getFileRef = (postId, file) => ref(cloudStorage, `${postId}/${file.name}`);

async function replaceFile(
  id,
  oldFile,
  newFile,
  onProgress = (f) => f,
  onComplete = () => {}
) {
  try {
    await removeFile(id, oldFile);
  } catch (message) {
    console.log(message);
  } finally {
    await uploadFile(id, newFile, onProgress, onComplete);
  }
}

async function uploadFile(
  postId,
  file,
  onProgress = (f) => f,
  onComplete = () => {}
) {
  if (!file) return;
  const ref = getFileRef(postId, file);
  const task = uploadBytesResumable(ref, file);
  task.on(
    "state_changed",
    (snapshot) => {
      const progress = snapshot.bytesTransferred / snapshot.totalBytes;
      onProgress(progress);
    },
    (error) => console.log(error),
    onComplete
  );
}

async function removeFile(postId, file, onComplete = () => {}) {
  if (!file) return;
  const ref = getFileRef(postId, file);
  await deleteObject(ref).then(onComplete).catch(console.log);
}

export { replaceFile };