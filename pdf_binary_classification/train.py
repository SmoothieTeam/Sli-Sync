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
from models.MobileNetV3 import mobilenet_v3_small
from models.VGGNet import vgg11
from models.DenseNet import densenet121
from models.InceptionNetV3 import inception_v3
from models.SqueezeNet import squeezenet
import os
from tensorboardX import SummaryWriter

# location of Tensorboard log
writer = SummaryWriter(logdir='./log/cpu/')

# Hyperparameter
batch_size = 256
learning_rate = 0.01
epochs = 30

# Data Transform
train_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])
val_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])

# Data Loader
train_data = datasets.ImageFolder("./Data/train/", transform=train_transform)
val_data = datasets.ImageFolder("./Data/val/", transform=val_transform)

train_loader = torch.utils.data.DataLoader(train_data, batch_size=batch_size, shuffle=True)
val_loader = torch.utils.data.DataLoader(val_data, batch_size=batch_size)

# Set device(GPU / CPU)
device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")

# check using GPU / CPU
print('Device:', device)  # 출력결과 => GPU: cuda:0, CPU: cpu
print('Count of using GPUs:', torch.cuda.device_count())   # 출력결과 => GPU: GPU 개수, CPU: 0

# Set Train Model and loss and Optimizer
# model = mobilenetv2()
model = mobilenet_v3_small()
# model = vgg11()
# model = densenet121()
# model = inception_v3()
# model = squeezenet()

# If using GPU
model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr = learning_rate)
train_loss = Average()
train_acc = Accuracy()

# Set Val loss => Optimizer Not Needed
# val_model.load_state_dict(torch.load("./checkpoint/model[0].pt"))
val_loss = Average()
val_acc = Accuracy()

# for save best result
best_loss = [100000]
best_acc = [-1]

print("Train until epoch[{0}]".format(epochs))
for epoch in range(epochs):
    print("\nEpoch[{0}]".format(epoch))
    print("Current best_loss Model: model[{0}].pt, best_acc Model: model[{1}].pt".format(
        (best_loss.index(min(best_loss)) - 1), 
        (best_acc.index(max(best_acc)) - 1))
    )

    # Train => Two Classes(PDF / Not_PDF)
    model.train()
    pbar = tqdm(train_loader)
    for i, [image, label] in enumerate(pbar):
        # GPU
        x = image.to(device)
        y = label.to(device)

        #CPU
        # x = image
        # y = label

        optimizer.zero_grad()
        output = model(x)

        loss = criterion(output, y)
        loss.backward()
        optimizer.step()

        # update loss value
        train_loss.update(loss.item(), number=x.size(0))
        train_acc.update(output, y)

        # for tensorboard
        pbar.set_postfix_str(f'train loss: {train_loss}, train acc: {train_acc}')
        writer.add_scalar('train_loss', train_loss.value, epoch)
        writer.add_scalar('train_acc', train_acc.value, epoch)

    # save trained Model
    torch.save(model.state_dict(), "./checkpoint/MobileNetV3/model[{0}]_state.pt".format(epoch))
    torch.save(model, "./checkpoint/MobileNetV3/model[{0}].pt".format(epoch))

    # Validation => Two Classes(PDF / Not_PDF)
    model.eval()
    pbar = tqdm(val_loader)
    with torch.no_grad():
        for i, [image, label] in enumerate(pbar):
            # GPU
            x = image.to(device)
            y = label.to(device)
            
            # CPU
            # x = image
            # y = label

            output = model(x)
            loss = criterion(output, y)

            # update loss value
            val_loss.update(loss.item(), number=x.size(0))
            val_acc.update(output, y)

            # for tensorboard
            pbar.set_postfix_str(f'val_loss: {val_loss}, val_acc: {val_acc}')
            writer.add_scalar('val_loss', val_loss.value, epoch)
            writer.add_scalar('val_acc', val_acc.value, epoch)

    best_loss.append(val_loss.value)
    best_acc.append(val_acc.value)