import os
import shutil
import random
from tqdm import tqdm
from torch import rand

class Sort_Data():
    def __init__(self):
        super().__init__()
        self.lectureSavePath = "G:\\POCL\\New_Data\\splited_lecture\\ppt_border"
        self.youtubeSavePath = "G:\\POCL\\New_Data\\spilted_youtube\\ppt_border"
        self.lectureDataPath = "G:\\POCL\\New_Data\\lecture_data\\ppt_border"
        self.youtubeDataPath = "G:\\POCL\\New_Data\\youtube_data\\ppt_border"

        self.lectureData_0 = os.listdir("G:\\POCL\\New_Data\\lecture_data\\0")
        self.lectureData_1 = os.listdir("G:\\POCL\\New_Data\\lecture_data\\1")
        self.youtubeData_0 = os.listdir("G:\\POCL\\New_Data\\youtube_data\\0")
        self.youtubeData_1 = os.listdir("G:\\POCL\\New_Data\\youtube_data\\1")
        
        self.lectureData_border = os.listdir("G:\\POCL\\New_Data\\lecture_data\\ppt_border")
        self.youtubeData_border = os.listdir("G:\\POCL\\New_Data\\youtube_data\\ppt_border")

    def spilt_files(self):
        # random.shuffle(self.lectureData_0)
        # random.shuffle(self.lectureData_1)
        # random.shuffle(self.youtubeData_0)
        # random.shuffle(self.youtubeData_1)
        random.shuffle(self.lectureData_border)
        random.shuffle(self.youtubeData_border)
    
    def copy_data(self):
        # lec_0_Len = len(self.lectureData_0)
        # lec_1_Len = len(self.lectureData_1)
        # youtube_0_Len = len(self.youtubeData_0)
        # youtube_1_Len = len(self.youtubeData_1)
        
        lec_Border_Len = len(self.lectureData_border)
        youtube_Border_Len = len(self.youtubeData_border)

        # for i in tqdm(range(lec_0_Len)):
        #     if i < lec_0_Len * 0.1:
        #         shutil.copy(os.path.join(self.lectureDataPath, "0", self.lectureData_0[i]), os.path.join(self.lectureSavePath, "val", "0", "lecture_0_0_" + str(i) + ".jpg"))
        #     elif i < lec_0_Len * 0.2:
        #         shutil.copy(os.path.join(self.lectureDataPath, "0", self.lectureData_0[i]), os.path.join(self.lectureSavePath, "test", "0", "lecture_0_0_" + str(i) + ".jpg"))

        #     else:
        #         shutil.copy(os.path.join(self.lectureDataPath, "0", self.lectureData_0[i]), os.path.join(self.lectureSavePath, "train", "0", "lecture_0_0_" + str(i) + ".jpg"))

        # for i in tqdm(range(lec_1_Len)):
        #     if i < lec_0_Len * 0.1:
        #         shutil.copy(os.path.join(self.lectureDataPath, "1", self.lectureData_1[i]), os.path.join(self.lectureSavePath, "val", "1", "lecture_1_0_" + str(i) + ".jpg"))
        #     elif i < lec_0_Len * 0.2:
        #         shutil.copy(os.path.join(self.lectureDataPath, "1", self.lectureData_1[i]), os.path.join(self.lectureSavePath, "test", "1", "lecture_1_0_" + str(i) + ".jpg"))

        #     else:
        #         shutil.copy(os.path.join(self.lectureDataPath, "1", self.lectureData_1[i]), os.path.join(self.lectureSavePath, "train", "1", "lecture_1_0_" + str(i) + ".jpg"))

        # for i in tqdm(range(youtube_0_Len)):
        #     if i < lec_0_Len * 0.1:
        #         shutil.copy(os.path.join(self.youtubeDataPath, "0", self.youtubeData_0[i]), os.path.join(self.youtubeSavePath, "val", "0", "youtube_0_0_" + str(i) + ".jpg"))
        #     elif i < lec_0_Len * 0.2:
        #         shutil.copy(os.path.join(self.youtubeDataPath, "0", self.youtubeData_0[i]), os.path.join(self.youtubeSavePath, "test", "0", "youtube_0_0_" + str(i) + ".jpg"))

        #     else:
        #         shutil.copy(os.path.join(self.youtubeDataPath, "0", self.youtubeData_0[i]), os.path.join(self.youtubeSavePath, "train", "0", "youtube_0_0_" + str(i) + ".jpg"))

        # for i in tqdm(range(youtube_1_Len)):
        #     if i < lec_0_Len * 0.1:
        #         shutil.copy(os.path.join(self.youtubeDataPath, "1", self.youtubeData_1[i]), os.path.join(self.youtubeSavePath, "val", "1", "youtube_1_0_" + str(i) + ".jpg"))
        #     elif i < lec_0_Len * 0.2:
        #         shutil.copy(os.path.join(self.youtubeDataPath, "1", self.youtubeData_1[i]), os.path.join(self.youtubeSavePath, "test", "1", "youtube_1_0_" + str(i) + ".jpg"))

        #     else:
        #         shutil.copy(os.path.join(self.youtubeDataPath, "1", self.youtubeData_1[i]), os.path.join(self.youtubeSavePath, "train", "1", "youtube_1_0_" + str(i) + ".jpg"))

        for i in tqdm(range(lec_Border_Len)):
            if i < lec_Border_Len * 0.1:
                shutil.copy(os.path.join(self.lectureDataPath, self.lectureData_border[i]), os.path.join(self.lectureSavePath, "val", "0", "lecture_2_0_" + str(i) + ".jpg"))
            elif i < lec_Border_Len * 0.2:
                shutil.copy(os.path.join(self.lectureDataPath, self.lectureData_border[i]), os.path.join(self.lectureSavePath, "test", "0", "lecture_2_0_" + str(i) + ".jpg"))
            else:
                shutil.copy(os.path.join(self.lectureDataPath, self.lectureData_border[i]), os.path.join(self.lectureSavePath, "train", "0", "lecture_2_0_" + str(i) + ".jpg"))
                
        for i in tqdm(range(youtube_Border_Len)):
            if i < youtube_Border_Len * 0.1:
                shutil.copy(os.path.join(self.youtubeDataPath, self.youtubeData_border[i]), os.path.join(self.youtubeSavePath, "val", "0", "youtube_2_0_" + str(i) + ".jpg"))
            elif i < youtube_Border_Len * 0.2:
                shutil.copy(os.path.join(self.youtubeDataPath, self.youtubeData_border[i]), os.path.join(self.youtubeSavePath, "test", "0", "youtube_2_0_" + str(i) + ".jpg"))
            else:
                shutil.copy(os.path.join(self.youtubeDataPath, self.youtubeData_border[i]), os.path.join(self.youtubeSavePath, "train", "0", "youtube_2_0_" + str(i) + ".jpg"))

f = Sort_Data()
f.spilt_files()
f.copy_data()