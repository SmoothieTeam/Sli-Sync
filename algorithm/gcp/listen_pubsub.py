import json
from google.cloud import pubsub_v1
import gcp_settings as gcp


class PubSubMessage:
    def __init__(self, id, video_filepath, slide_filepath):
        self.id = id
        self.video_filepath = video_filepath
        self.slide_filepath = slide_filepath


def listen_pubsub(onListen):
    def callback(message: pubsub_v1.subscriber.message.Message) -> None:
        data = json.loads(message.data)
        id = data['id']
        video_filepath = data['video_filepath']
        slide_filepath = data['slide_filepath']
        message = PubSubMessage(id, video_filepath, slide_filepath)
        onListen(message)
        message.ack()
    subscriber = pubsub_v1.SubscriberClient()
    subscription_path = subscriber.subscription_path(
        gcp.PROJECT_ID,
        gcp.SUBSCRIPTION_ID
    )
    streaming_pull_future = subscriber.subscribe(
        subscription_path,
        callback=callback
    )
    with subscriber:
        try:
            streaming_pull_future.result()
        except TimeoutError:
            streaming_pull_future.cancel()
            streaming_pull_future.result()
