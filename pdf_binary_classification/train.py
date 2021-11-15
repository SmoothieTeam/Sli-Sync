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

batch_size = 256
learning_rate = 0.01
epochs = 5

train_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])
val_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])
test_transform = transforms.Compose([transforms.Resize((224, 224), interpolation=Image.BICUBIC), transforms.ToTensor()])

train_data = datasets.ImageFolder("./Data/train/", transform=train_transform)
val_data = datasets.ImageFolder("./Data/val/", transform=val_transform)
test_data = datasets.ImageFolder("./Data/test/", transform=test_transform)

train_loader = torch.utils.data.DataLoader(train_data, batch_size=batch_size, shuffle=True)
val_loader = torch.utils.data.DataLoader(val_data, batch_size=batch_size)
test_loader = torch.utils.data.DataLoader(test_data, batch_size=batch_size)

class CNN(nn.Module):
    def __init__(self):
        super(CNN, self).__init__()
        self.conv1 = nn.Conv2d(in_channels=3, out_channels=10, kernel_size=3)
        self.conv2 = nn.Conv2d(10, 20, kernel_size=3)
        self.conv2_drop = nn.Dropout2d()
        self.fc1 = nn.Linear(58320, 1024)
        self.fc2 = nn.Linear(1024, 2)
        self.sigmoid = nn.Sigmoid()

    def forward(self, x):
        x = F.relu(F.max_pool2d(self.conv1(x), 2))
        x = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))
        x = x.view(x.shape[0],-1)
        x = F.relu(self.fc1(x))
        x = F.dropout(x, training=self.training)
        x = self.fc2(x)
        x = self.sigmoid(x)
        return x


device = torch.device("cuda:0" if torch.cuda.is_available() else "cpu")
model = CNN().to(device)
criterion = nn.CrossEntropyLoss()
optimizer = torch.optim.Adam(model.parameters(), lr = learning_rate)

loss_array = []
model.train()
for epoch in range(epochs):
    pbar = tqdm(train_loader)
    for i, [image, label] in enumerate(pbar):
        x = image.to(device)
        y = label.to(device)
        # y = y.unsqueeze(1)

        optimizer.zero_grad()
        output = model(x)
        loss = criterion(output, y)
        loss.backward()
        optimizer.step()

        if i % 1000 == 0:
            print("epoch[{0}] loss: {1:.8f}".format(epoch, loss))
            loss_array.append(loss.cpu().detach().numpy())

torch.save(model.state_dict(), "./model.pt")

# model = CNN().to(device)
# model.load_state_dict(torch.load("./model.pt"))

# correct = 0
# total = 0

# with torch.no_grad():
#     pbar = tqdm(custom_loader)
#     for image, label in pbar:
#         x = image.to(device)
#         y = label.to(device)

#         output = model.forward(x)
#         _, output_index = torch.max(output, 1)
#         total += label.size(0)
#         correct += (output_index == y).sum().float()
#     print("Accuracy : {0}".format(100 * correct / total))
# image = np.array(cv2.imread("./test/1.PNG"))
# image = cv2.resize(image, dsize=(224, 224),interpolation=cv2.INTER_LINEAR)
# image_swap = np.swapaxes(image, 0,2)
# image_swap = np.expand_dims(image_swap, axis=0)
# tensor = torch.from_numpy(image_swap).type(torch.cuda.FloatTensor)

# with torch.no_grad():
#     output = model(tensor)
#     torch.set_printoptions(precision=10)
#     print(output)
#     _, output_index = torch.max(output, 1)
#     print(output_index)