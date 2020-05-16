import json
import math
import queue
from collections import deque
import time
import copy
from heapq import heappush, heappop
import random
from itertools import islice, count


class Board:
    __dimension = 0
    __board = []
    __parent = None
    __move = ""
    __depth = 0

    def __init__(self, dim):
        self.__dimension = dim
        self.__board = [[0] * dim for _ in range(0, dim)]
        self.__depth = 0

    def set_board(self, l):
        i = 0
        k = 0
        while i < self.__dimension:
            j = 0
            while j < self.__dimension:
                self.__board[i][j] = l[k]
                k += 1
                j += 1
            i += 1

    def printBoard(self):
        for x in self.__board:
            for y in x:
                print(y, " ", end="")
            print("\n")

    def move_down(self, i, j):
        board = Board(self.__dimension)
        board.__board = copy.deepcopy(self.__board)
        board.__parent = self
        board.__move = "DOWN"
        board.__depth = self.__depth + 1
        temp = board.__board[i][j]
        board.__board[i][j] = board.__board[i + 1][j]
        board.__board[i + 1][j] = temp
        return board

    def move_up(self, i, j):
        board = Board(self.__dimension)
        board.__board = copy.deepcopy(self.__board)
        board.__parent = self
        board.__move = "UP"
        board.__depth = self.__depth + 1
        temp = board.__board[i][j]
        board.__board[i][j] = board.__board[i - 1][j]
        board.__board[i - 1][j] = temp
        return board

    def move_right(self, i, j):
        board = Board(self.__dimension)
        board.__board = copy.deepcopy(self.__board)
        board.__parent = self
        board.__move = "RIGHT"
        board.__depth = self.__depth + 1
        temp = board.__board[i][j]
        board.__board[i][j] = board.__board[i][j + 1]
        board.__board[i][j + 1] = temp
        return board

    def move_left(self, i, j):
        board = Board(self.__dimension)
        board.__board = copy.deepcopy(self.__board)
        board.__parent = self
        board.__move = "LEFT"
        board.__depth = self.__depth + 1
        temp = board.__board[i][j]
        board.__board[i][j] = board.__board[i][j - 1]
        board.__board[i][j - 1] = temp
        return board

    def neighbors(self):
        i = 0
        j = 0
        neighbors = []
        for line in self.__board:
            if 0 in line:
                i = self.__board.index(line)
                j = line.index(0)
                break
        if i > 0:
            neighbors.append(self.move_up(i, j))
        if i < self.__dimension - 1:
            neighbors.append(self.move_down(i, j))
        if j > 0:
            neighbors.append(self.move_left(i, j))
        if j < self.__dimension - 1:
            neighbors.append(self.move_right(i, j))
        return neighbors

    def heuristic(self):
        h = 0
        i = 0
        while i < self.__dimension:
            j = 0
            while j < self.__dimension:
                if self.__board[i][j] != 0:
                    right_i = self.__board[i][j] // self.__dimension
                    right_j = self.__board[i][j] % self.__dimension
                    horizantal_distance = math.fabs(j - right_j)
                    vertical_distance = math.fabs(i - right_i)
                    h += horizantal_distance
                    h += vertical_distance
                j += 1
            i += 1
        return int(h)

    def get_board(self):
        return self.__board

    def get_parent(self):
        return self.__parent

    def get_move(self):
        return self.__move

    def get_depth(self):
        return self.__depth


class Pqueue:
    __q = queue.PriorityQueue()
    __dic = {}
    __pSet = set()

    def __init__(self):
        self.__q = queue.PriorityQueue()
        self.__dic = {}
        self.__pSet = set()

    def add(self, e):
        strBoard = str(e[2].get_board())
        priority = e[0]
        exist = self.__dic.get(strBoard, 0)
        if (e[0] not in self.__pSet) and (exist == 0):
            self.__q.put(e)
            self.__pSet.add(e[0])
            return
        if (e[0] in self.__pSet) and (exist == 0):
            self.__q.put((e[0], e[1] + 1, e[2]))
            return
        if (e[0] not in self.__pSet) and (exist != 1):
            if priority < exist:
                self.__dic[strBoard] = priority
                self.__q.put((e[0], e[1] - 1, e[2]))
                self.__pSet.add(e[0])
            return

    def remove(self):
        state = self.__q.get()
        return state

    def length(self):
        return self.__q.qsize()

def game_solver(initial_ordre):
    dim = 3
    initial = Board(dim)
    l = [r for r in range(dim * dim)]
    board = []
    while len(l) != 0:
        index = random.randint(0, len(l) - 1)
        board.append(l.pop(index))
    board = [r for r in range(dim * dim)]
    board.reverse()
    initial.set_board(initial_ordre)
    initial.printBoard()
    frontier = Pqueue()
    frontier.add((initial.heuristic() + initial.get_depth(), 0, initial))
    explored = set()
    seen = set()
    frontier_set = set()
    nodes_expanded = 0
    max_fring_size = 0
    max_search_depth = 0
    priority_2 = 0
    while frontier.length() != 0:
        a = frontier.remove()
        state = a[2]
        if str(state.get_board()) in explored:
            continue
        else:
            pass
        explored.add(str(state.get_board()))
        seen.add(str(state.get_board()))

        if state.get_board() == [[a for a in  islice(count(i), dim)]  for i in range(0, (dim * dim) - 1, dim)]:
            print("Goal achieved")
            state.printBoard()
            move = state.get_move()
            s = state
            path = []
            while move != "":
                path.append(move)
                s = s.get_parent()
                move = s.get_move()
            path.reverse()
            print("path_to_goal :", end="")
            print(path)
            print("cost_of_path :", len(path))
            print("nodes_expanded :", nodes_expanded)
            print("fringe_size :", frontier.length())
            print("max_fringe_size :", max_fring_size)
            print("search_depth :", state.get_depth())
            print("max_search_depth :", max_search_depth)
            return path
        nodes_expanded += 1
        l = state.neighbors()
        for neighbor in l:
            if str(neighbor.get_board()) not in seen:
                priority_2 += 1
                frontier.add((neighbor.heuristic() + neighbor.get_depth(), priority_2, neighbor))
                seen.add(str(neighbor.get_board()))

            if max_fring_size < frontier.length():
                max_fring_size = frontier.length()
            if max_search_depth < state.get_depth():
                max_search_depth = state.get_depth()

def lambda_handler(event, context):
    # TODO implement
    data = event["body-json"]["data"]
    return {
        'statusCode': 200,
        'body': json.dumps(game_solver(data)),
        'headers': json.dumps({
            'Access-Control-Allow-Origin' : '*',
            'Access-Control-Allow-Headers':'Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token',
            'Content-Type': 'application/json'
        })
    }
