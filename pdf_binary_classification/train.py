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
from models.SqueezeNet import squeezenet1_1

import os
import argparse
from tensorboardX import SummaryWriter

parser = argparse.ArgumentParser()
parser.add_argument("--batch-size", default=256, type=int, dest="batch_size")
parser.add_argument("--backbone", default="mobilenet_v3_small", dest="backbone",
                    choices=["mobilenetv2", "mobilenet_v3_small", "vgg11", "densenet121", "inception_v3", "squeezenet"])
parser.add_argument("--learning-rate", default=0.05,type=float, dest="learning_rate")
parser.add_argument("--epochs", default=100, type=int, dest="epochs")
parser.add_argument("--gpus", default=True, type=bool, dest="use_cude")
parser.add_argument("--gpu_id", default=0, type=int, dest="gpu_id")

args = parser.parse_args()

def get_model(model_name):
    if model_name == 'mobilenetv2':
        model = mobilenetv2()
    elif model_name == 'vgg11':
        model = vgg11(2)
    elif model_name == 'densenet121':
        model = densenet121()
    elif model_name == 'inception_v3':
        model = inception_v3()
    elif model_name == 'squeezenet':
        model = squeezenet1_1()
    else:
        model = mobilenet_v3_small()
    return model

# for using multiple GPUs
os.environ["CUDA_DEVICE_ORDER"]="PCI_BUS_ID"
os.environ["CUDA_VISIBLE_DEVICES"]= str(args.gpu_id)

# location of Tensorboard log
logPath = os.path.join('checkpoints', str(args.backbone), 'log')
checkpointPath = os.path.join('checkpoints', str(args.backbone))
writer = SummaryWriter(logdir=logPath)

# Data Transform
train_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])
val_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])

# Data Loader
train_data = datasets.ImageFolder("./Data/train/", transform=train_transform)
val_data = datasets.ImageFolder("./Data/val/", transform=val_transform)

train_loader = torch.utils.data.DataLoader(train_data, batch_size=args.batch_size, shuffle=True)
val_loader = torch.utils.data.DataLoader(val_data, batch_size=args.batch_size)

# Set device(GPU / CPU)
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# check using GPU / CPU
print('Device:', device)  # 출력결과 => GPU: cuda:0, CPU: cpu
print('Count of using GPUs:', torch.cuda.device_count())   # 출력결과 => GPU: GPU 개수, CPU: 0



# Set Train Model and loss and Optimizer
model = get_model(args.backbone)
print(str(args.backbone))

# If using GPU
model.to(device)

criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr = args.learning_rate)
train_loss = Average()
train_acc = Accuracy()

# Set Val loss => Optimizer Not Needed
# val_model.load_state_dict(torch.load("./checkpoint/model[0].pt"))
val_loss = Average()
val_acc = Accuracy()

# for save best result
best_loss = [100000]
best_acc = [-1]

print("Train until epoch[{0}]".format(args.epochs))
for epoch in range(args.epochs):
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
        # for inceptionnet-V3
        # output, _ = model(x)

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
    torch.save(model.state_dict(), os.path.join(checkpointPath, "model[{0}]_state.pt".format(epoch)))
    torch.save(model, os.path.join(checkpointPath, "model[{0}].pt".format(epoch)))

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