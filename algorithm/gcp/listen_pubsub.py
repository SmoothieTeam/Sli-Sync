import json
from google.cloud import pubsub_v1
import gcp_settings as gcp

def listen_pubsub(onListenID):
    def callback(message: pubsub_v1.subscriber.message.Message) -> None:
        data = json.loads(message.data)
        onListenID(data['id'])
        message.ack()

    subscriber = pubsub_v1.SubscriberClient()
    subscription_path = subscriber.subscription_path(gcp.PROJECT_ID, gcp.SUBSCRIPTION_ID)
    streaming_pull_future = subscriber.subscribe(subscription_path, callback=callback)
    with subscriber:
        try:
            streaming_pull_future.result()
        except TimeoutError:
            streaming_pull_future.cancel()
            streaming_pull_future.result()