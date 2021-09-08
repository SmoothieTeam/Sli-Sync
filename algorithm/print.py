import time

start = time.time()
def time_to_string(sec):
    return str(int(sec / 60)) + ':' + str(int(sec) % 60)

def print_start_message(ppt_path, video_path):
    print('pdf', ':', ppt_path)
    print('video', ':', video_path, '\n')
    print('start analyzation...\n')

def print_result(times):
    slide_numbers = sorted(times.keys())
    minute_times = {}
    for slide_number in slide_numbers:
        minute_times[slide_number] = []
        timelines = times[slide_number]
        for timeline in timelines:
            if type(timeline) == type([]):
                start, end = timeline
                minute_times[slide_number].append([time_to_string(start), time_to_string(end)])
            else:
                minute_times[slide_number].append(time_to_string(timeline))
    for time in minute_times.items():
        print(time)

def print_time(elapsed):
    if elapsed:
        end = time.time()
        second = end - start
        print('elasped time',':', time_to_string(second))

