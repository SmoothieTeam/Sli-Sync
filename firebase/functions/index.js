const functions = require('firebase-functions');
const { PubSub } = require('@google-cloud/pubsub');
const projectId = 'videoslider-6cfed';

exports.createRequest = functions.firestore
    .document('posts/{postId}')
    .onCreate(async (snap, _) => {
        const id = snap.id;
        const data = snap.data();
        const json = { id, filenames: data.filenames };
        const pubsub = new PubSub({ projectId });
        await pubsub.topic('post-topic').publishMessage({ json });
        return null;
    });