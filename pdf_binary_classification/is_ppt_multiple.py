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
from models.MobileNetV2 import mobilenetv2
import time
import argparse

# get image arg
parser = argparse.ArgumentParser()
parser.add_argument("-p", "--path", dest='path', required=True,
                    help="the path to your video file to be analyzed")
args = vars(parser.parse_args())

# Hyperparameter
batch_size = 1

# Data Transform
test_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])

# Data Loader
data_loading_start_time = time.time()

test_data = datasets.ImageFolder(args['path'], transform=test_transform)
test_loader = torch.utils.data.DataLoader(test_data, batch_size=batch_size)

data_loading_end_time = time.time()

# Set Train Model and loss and Optimizer
model_loading_start_time = time.time()
# model = mobilenetv2()
# model.load_state_dict(torch.load("../checkpoint/cpu/model[12]_state_cpu.pt", map_location=torch.device('cpu')))
model = torch.load("./checkpoint/cpu/model[12]_cpu.pt")

criterion = nn.CrossEntropyLoss()
test_loss = Average()
test_acc = Accuracy()
model_loading_end_time = time.time()

image_test_start_time = time.time()
results = []

# Load many saved Image
print("Test Trained Model")
model.eval()
with torch.no_grad():
    pbar = tqdm(test_loader)
    for i, [image, label] in enumerate(pbar):
        x = image
        y = label

        output = model(x)
        # loss = criterion(output, y)
        results.append(torch.argmax(output))

image_test_end_time = time.time()

print("Image Loading Time: {0:.8f}".format(data_loading_end_time - data_loading_start_time))
print("Model Loading Time: {0}".format(model_loading_end_time - model_loading_start_time))
print("Image Test Time: {0}".format(image_test_end_time - image_test_start_time))
print("Total {0:.4f} sec elapsed".format((data_loading_end_time - data_loading_start_time) + (model_loading_end_time - model_loading_start_time) + (image_test_end_time - image_test_start_time)))
