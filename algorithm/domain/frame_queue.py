class FrameQueue:
    def __init__(self):
        self.q = []

    def __safe_access_q(self, f):
        if self.q == []:
            raise Exception('there is no element in q')
        else:
            return f(self.q)

    def head(self):
        # tail ----> head
        return self.__safe_access_q(lambda l: l[-1])

    def tail(self):
        # tail ----> head
        return self.__safe_access_q(lambda l: l[0])

    def times(self):
        return self.tail()[0], self.head()[0]
    
    def frames(self):
        return self.tail()[1], self.head()[1]

    def push(self, time, frame):
        self.q.append((time, frame))
        self.q = [self.tail(), self.head()]