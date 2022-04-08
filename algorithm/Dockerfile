FROM python:3

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN apt-get update
RUN apt-get install -y gcc g++ libgl1-mesa-glx poppler-utils
RUN pip install -U pip
RUN pip install --no-cache-dir torch torchvision torchaudio --extra-index-url https://download.pytorch.org/whl/cpu
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

ENV GOOGLE_APPLICATION_CREDENTIALS="/usr/src/app/gcp/videoslider-6cfed-1a716ce13309.json"
CMD [ "python", "./main.py" ]
