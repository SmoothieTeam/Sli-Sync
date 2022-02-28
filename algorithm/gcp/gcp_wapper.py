import firebase_admin
from firebase_admin import credentials
from google.cloud import storage, pubsub_v1
from firebase_admin import firestore
import gcp_settings as gcp


def initialize_app():
    cred = credentials.ApplicationDefault()
    firebase_admin.initialize_app(cred, {
        'projectId': gcp.PROJECT_ID,
    })


def firebase_firestore():
    return firestore.client()


def firebase_storage():
    client = storage.Client()
    return client.get_bucket(gcp.BUCKET_ID)


def pubsub_subscribe(callback):
    subscriber = pubsub_v1.SubscriberClient()
    subscription_path = subscriber.subscription_path(
        gcp.PROJECT_ID, gcp.SUBSCRIPTION_ID)
    streaming_pull_future = subscriber.subscribe(
        subscription_path, callback=callback)
    with subscriber:
        try:
            streaming_pull_future.result()
        except TimeoutError:
            streaming_pull_future.cancel()
            streaming_pull_future.result()
