from domain.values.timelines import Timeline, Timelines
from gcp.gcp_wapper import firebase_firestore


db = firebase_firestore()


def __post_ref(id: str):
    return db.collection('posts').document(id)


def set_timelines(id: str, timelines: Timelines):
    def timelines_to_json(timelines: Timelines):
        def timeline_to_json(timeline: Timeline):
            return {
                'time': timeline.time,
                'slide_number': timeline.slide_number
            }
        timeline_json = list(map(timeline_to_json, timelines))
        return {
            'timelines': timeline_json,
        }

    post = __post_ref(id)
    post.set(timelines_to_json(timelines), merge=True)


def set_progress(id: str, progress: float):
    post = __post_ref(id)
    post.set({
        'progress': progress,
    }, merge=True)
