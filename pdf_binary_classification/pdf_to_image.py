import os
from tqdm import tqdm
import shutil
import random

path = "D:/POCL/pdf_binary_classification/not_pdf/"

trainPath = "D:/POCL/pdf_binary_classification/Data/train/1/"
valPath = "D:/POCL/pdf_binary_classification/Data/val/1/"
testPath = "D:/POCL/pdf_binary_classification/Data/test/1/"

fileList = os.listdir(path)
random.shuffle(fileList)
pbar = tqdm(fileList)

trainCnt = 0
valCnt = 0
testCnt = 0

length = len(fileList)

for i, file in enumerate(pbar):
    if i < int(length * 0.8) - 1:
        shutil.copy(path + file, trainPath + file)
        trainCnt += 1
    elif i >= int(length * 0.8) - 1 and i < int(length * 0.9):
        shutil.copy(path + file, valPath + file)
        valCnt += 1
    else:
        testCnt += 1       
        shutil.copy(path + file, testPath + file)

print("train: {0}\n val: {1}\n test: {2}".format(trainCnt, valCnt, testCnt))
