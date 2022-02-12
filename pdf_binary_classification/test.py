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
from metrics import Accuracy, Average
import time

from models.MobileNetV2 import mobilenetv2
from models.MobileNetV3 import mobilenet_v3_small
from models.VGGNet import vgg11
from models.DenseNet import densenet121
from models.InceptionNetV3 import inception_v3
from models.SqueezeNet import squeezenet1_1

# Hyperparameter
batch_size = 1

# Data Transform
test_transform = transforms.Compose([
    transforms.Resize((224, 224), interpolation=Image.BICUBIC), 
    transforms.ToTensor()
])

# Data Loader
#G:\POCL\slide-transition-detector\algorithm\test_folder_0\1
test_data = datasets.ImageFolder("./Data_With_Border/test/", transform=test_transform)
# test_data = datasets.ImageFolder("G:\\POCL\\slide-transition-detector\\algorithm\\test_folder_0", transform=test_transform)
test_loader = torch.utils.data.DataLoader(test_data, batch_size=batch_size)

# Set device(GPU / CPU)
device = torch.device("cpu")

print('Device:', device)  # 출력결과: GPU: cuda:0, CPU: cpu
print('Count of using GPUs:', torch.cuda.device_count())   #출력결과: 1 (GPU 한개 사용하므로)

# Set Train Model and loss and Optimizer
model = densenet121()
model.load_state_dict(torch.load("G:\\POCL\slide-transition-detector\\pdf_binary_classification\\checkpoints\\densenet121\\model[9]_state.pt", map_location=device))
# model.to(device)
criterion = nn.CrossEntropyLoss()
# m = nn.Sigmoid() # => for BCELoss
test_loss = Average()
test_acc = Accuracy()

total_time = 0

print("Test Trained Model")
model.eval()
pbar = tqdm(test_loader)
with torch.no_grad():
    for i, [image, label] in enumerate(pbar):
        x = image
        y = label
        
        start_time = time.time()
        output = model(x)
        total_time += (time.time() - start_time)
        
        loss = criterion(output, y)

        # update loss value
        test_loss.update(loss.item(), number=x.size(0))
        test_acc.update(output, y)

        # for tensorboard
        pbar.set_postfix_str(f'test_loss: {test_loss}, test_acc: {test_acc}')

print("FPS: {0}".format(total_time / 736))