# slide_searcher

PDF 슬라이드와 발표 영상이 주어지면 영상에 슬라이드가 정확하게 나오는 시간을 출력합니다.

## Dependencies
```
> scikit_image==0.17.2
> numpy==1.16.1
> opencv-python==3.4.3.18
> pdf2image==1.16.0
> python-pptx-interface==0.0.12
> comtypes==1.1.10
> poppler-utils==0.1.0
```

### if using anaconda
please install extra package
```
conda install -c conda-forge poppler
```

### For Windows User without anaconda
[Poppler](https://github.com/oschwartz10612/poppler-windows) 릴리즈 버전을 다운로드하고 PATH에 \Lib\bin을 추가해야합니다.
 
## Usage
```shell
python main.py -p <pdf file path> -v <video file path> -t <time(s) step for search> -f <frame step(defualt 1) for search> -e <True/False(defualt), whether calculate elapsed time or not>
```