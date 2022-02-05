import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import gcp_settings as gcp

# Use the application default credentials
cred = credentials.ApplicationDefault()
firebase_admin.initialize_app(cred, {
  'projectId': gcp.PROJECT_ID,
})

db = firestore.client()

def upload_timeline(id, times, slides):
    ref = db.collection('posts').document(id)
    timelines = list(map(lambda i: {'time': times[i], 'slide_url': slides[i]}, range(len(times))))
    ref.set({
        'timelines': timelines,
        'is_progressed': True
    }, merge=True)

def update_progress(id, progress):
    ref = db.collection('posts').document(id)
    ref.set({
        'progress': progress,
        'is_progressed': False
    }, merge=True)

