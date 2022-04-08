# slide_searcher

PDF 슬라이드와 발표 영상이 주어지면 영상에 슬라이드가 정확하게 나오는 시간을 출력합니다.

## Dependencies

pip로 requirements.txt의 의존성을 설치하면됩니다.

```shell
python -m pip install -r requirements.txt
```

추가로 이하의 작업을 해줘야합니다.

### 아나콘다를 사용하는 경우

```
conda install -c conda-forge poppler
```

### Windows 사용자이면서 아나콘다가 없는 경우

[Poppler](https://github.com/oschwartz10612/poppler-windows) 릴리즈 버전을 다운로드하고 PATH에 \Lib\bin을 추가해야합니다.

## Usage

```shell
python main.py
```

## Docker

docker를 이용하여 빌드하고 배포할 수 있습니다.
Dockerfile내의 GOOGLE_APPLICATION_CREDENTIALS 위치를 빌드환경에 맞게 수정해야합니다.
GOOGLE_APPLICATION_CREDENTIALS 파일은 gcloud를 이용하여 받을 수 있습니다.

```shell
gcloud init # gcloud init을 하지 않았을 경우
gcloud iam service-accounts keys create credentials.json --iam-account=pubsub@videoslider-6cfed.iam.gserviceaccount.com
```

빌드 및 배포는 아래와 같습니다.

```shell
docker build -t sli-sync .
docker tag sli-sync us-central1-docker.pkg.dev/videoslider-6cfed/sli-sync-docker-repo/sli-sync-image
docker push us-central1-docker.pkg.dev/videoslider-6cfed/sli-sync-docker-repo/sli-sync-image
```
