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

# Hyperparameter
learning_rate = 0.001

# Data Transform
test_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])

# Data Loader
test_img = Image.open("./Test_Image_examples/test_13.jpg").convert('RGB')
test_img_tensor = test_transform(test_img)

# Set Train Model and loss and Optimizer
model = mobilenetv2()
model.load_state_dict(torch.load("./checkpoint/model[3].pt"))

# model = torch.load("./checkpoint/model[3]_save.pt")

# model.to(device)
criterion = nn.CrossEntropyLoss()
# m = nn.Sigmoid() # => for BCELoss
test_loss = Average()
test_acc = Accuracy()

print("Test Trained Model")
# model.eval()
with torch.no_grad():
    x = test_img_tensor
    x = x.unsqueeze(0) # torch.Size([1, 4, 224, 224])

    output = model(x)
    result = torch.argmax(output)

    if result == 0:
        print("PPT!!")
    else:
        print("Not PPT!!")