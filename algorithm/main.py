from time import time
from gcp.gcp_message_dispatcher import on_listen, listen


def main():
    start = time()
    listen(on_listen)
    print(time() - start)


if __name__ == '__main__':
    main()
