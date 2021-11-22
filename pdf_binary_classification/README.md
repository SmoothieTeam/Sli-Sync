# PPT Slide Classification Model

## Used Model Architecture
-----------------------------
- MobileNetV2 - [논문](https://arxiv.org/abs/1801.04381)

## Requirements
```
> torch==1.10.0
> torchvision==0.11.1
> torchaudio==0.10.0
> tqdm==4.62.3
> tensorboardX==2.4.1
> tensorboard==2.7.0
```

## Install require packages
```
> pip install -r requirements.txt
```

## Data
You can download train / val / test data at [here]()
```
Data
|- train
   |- 0
      |- test_0.jpg
      |- test_1.jpg
      |- ...
   |- 1
      |- b_10.jpg
      |- b_11.jpg
      |- ...

|- val
   |- 0
      |- ...
   |- 1
      |- ...

|- test
   |- 0
      |- ...
   |- 1
      |- ...
```

## Result
- Accuracy
![Image]{}
- Loss
![Image]{}

| Model | Accuracy | Loss |
| :----- | :--------: | :----: |
| MobileNetV2 | 100% | 0.0008 |

## Usage
#### Single Image 
```
> python is_ppt_single.py -p "Image path"
```

#### Multiple Image
```
> python is_ppt_multiple.py -p "Image folder path"
```

## 해결해야할 문제
1. pdf 저작권 문제(not_pdf class는 크리에이티브 커먼즈 저작권 영상을 활용하여 문제X)