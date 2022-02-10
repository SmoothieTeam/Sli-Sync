import torch.nn as nn
import torchvision.models as models

def vgg11(num_class:int, pretrained:bool=False, batch_normal:bool=True):
    if(batch_normal):
        model = models.vgg11_bn(pretrained=pretrained)
    else:
        model = models.vgg11(pretrained=pretrained)

    num_ftrs = model.classifier[6].in_features
    model.classifier[6] = nn.Linear(num_ftrs,num_class)

    return model

def vgg16(num_class:int, pretrained:bool=False, batch_normal:bool=True):
    if(batch_normal):
        model = models.vgg16_bn(pretrained=pretrained)
    else:
        model = models.vgg16(pretrained=pretrained)

    num_ftrs = model.classifier[6].in_features
    model.classifier[6] = nn.Linear(num_ftrs,num_class)

    return model

def vgg19(num_class:int, pretrained:bool=False, batch_normal:bool=True):
    if(batch_normal):
        model = models.vgg19_bn(pretrained=pretrained)
    else:
        model = models.vgg19(pretrained=pretrained)

    num_ftrs = model.classifier[6].in_features
    model.classifier[6] = nn.Linear(num_ftrs,num_class)

    return model