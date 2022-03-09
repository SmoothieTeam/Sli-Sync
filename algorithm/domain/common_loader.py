import shutil


def working_dir_of(id: str):
    return f'./{id}'


def clean_working_dir(id: str):
    shutil.rmtree(working_dir_of(id))
