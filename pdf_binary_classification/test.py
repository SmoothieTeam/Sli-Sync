import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import torch.nn.init as init
import torchvision.datasets as datasets
import torchvision.transforms as transforms
from torch.utils.data import DataLoader
from PIL import Image
from tqdm import tqdm
import numpy as np
import cv2
from metrics import Accuracy, Average
from models.MobileNetV2 import mobilenetv2

# Data Transform
test_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])

# Data Loader
test_data = datasets.ImageFolder("./Data/test/", transform=test_transform)
test_loader = torch.utils.data.DataLoader(test_data, batch_size=batch_size)

# Set device(GPU / CPU)
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# check using GPU / CPU
print('Device:', device)  # 출력결과 => GPU: cuda:0, CPU: cpu
print('Count of using GPUs:', torch.cuda.device_count())   # 출력결과 => GPU: GPU 개수, CPU: 0

# Set Train Model and loss and Optimizer
model = mobilenetv2()
model.load_state_dict(torch.load("./checkpoint/model[1].pt"))
criterion = nn.CrossEntropyLoss()
test_loss = Average()
test_acc = Accuracy()

print("Test Trained Model")
model.eval()
pbar = tqdm(test_loader)
with torch.no_grad():
    for i, [image, label] in enumerate(pbar):
        # GPU
        # x = image.to(device)
        # y = label.to(device)

        #CPU
        x = image
        y = label

        output = model(x)
        loss = criterion(output, y)

        # update loss value
        test_loss.update(loss.item(), number=x.size(0))
        test_acc.update(output, y)

        # for tensorboard
        pbar.set_postfix_str(f'test_loss: {test_loss}, test_acc: {test_acc}')