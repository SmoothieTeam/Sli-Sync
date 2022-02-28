from domain.values.timelines import Timeline, Timelines
from gcp.gcp_wapper import firebase_firestore


db = firebase_firestore()


def _post_ref(id: str):
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
            'timeline': timeline_json,
            'is_progressed': True
        }
    post = _post_ref(db, id)
    post.set(timelines_to_json(timelines), merge=True)


def set_progress(id: str, progress: float):
    post = _post_ref(db, id)
    post.set({
        'progress': progress,
        'is_progressed': False
    }, merge=True)
