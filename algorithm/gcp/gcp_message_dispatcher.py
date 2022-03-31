import json
from google.cloud import pubsub_v1
from adapters.values.message import Message
from gcp.gcp_wapper import pubsub_subscribe


def listen(on_listen):
    def callback(pubsub_message: pubsub_v1.subscriber.message.Message):
        message = pubsub_message_to_message(pubsub_message)
        on_listen(message)
        pubsub_message.ack()

    def pubsub_message_to_message(pubsub_message: pubsub_v1.subscriber.message.Message):
        data = json.loads(pubsub_message.data)
        id = data['id']
        filenames = data['filenames']
        video_filename = filenames['video']
        slide_filename = filenames['slide']
        message = Message(id, video_filename, slide_filename)
        return message

    pubsub_subscribe(callback)
