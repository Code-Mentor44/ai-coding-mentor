export const problems = [
    {
        id: 1,
        title: "Two Sum",
        difficulty: "Easy",
        topic: "Arrays",
        description:
            "Given an array of integers nums and an integer target, return the indices of two numbers such that they add up to the target.",

        starterCode: {
            java: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        return new int[]{};
    }
}`,

            cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<int> twoSum(vector<int>& nums, int target) {
        return {};
    }
};`,

            python: `class Solution:
    def twoSum(self, nums, target):
        return []`,

            javascript: `function twoSum(nums, target) {
    return [];
}`,
        },
    },

    {
        id: 2,
        title: "Valid Parentheses",
        difficulty: "Easy",
        topic: "Stack",
        description:
            "Determine if the input string contains valid parentheses.",
        starterCode: {
            java: `class Solution {
    public boolean isValid(String s) {
        return false;
    }
}`,

            cpp: `#include <string>
using namespace std;

class Solution {
public:
    bool isValid(string s) {
        return false;
    }
};`,

            python: `class Solution:
    def isValid(self, s):
        return False`,

            javascript: `function isValid(s) {
    return false;
}`,
        },
    },

    {
        id: 3,
        title: "Merge Intervals",
        difficulty: "Medium",
        topic: "Intervals",
        description:
            "Merge all overlapping intervals and return the result.",

        starterCode: {
            java: `class Solution {
    public int[][] merge(int[][] intervals) {
        return new int[][]{};
    }
}`,

            cpp: `#include <vector>
using namespace std;

class Solution {
public:
    vector<vector<int>> merge(vector<vector<int>>& intervals) {
        return {};
    }
};`,

            python: `class Solution:
    def merge(self, intervals):
        return []`,

            javascript: `function merge(intervals) {
    return [];
}`,
        },
    },

    {
        id: 4,
        title: "LRU Cache",
        difficulty: "Hard",
        topic: "Design",
        description:
            "Design and implement an LRU Cache data structure.",

        starterCode: {
            java: `class LRUCache {

    public LRUCache(int capacity) {

    }

    public int get(int key) {
        return -1;
    }

    public void put(int key, int value) {

    }
}`,

            cpp: `class LRUCache {
public:
    LRUCache(int capacity) {

    }

    int get(int key) {
        return -1;
    }

    void put(int key, int value) {

    }
};`,

            python: `class LRUCache:

    def __init__(self, capacity):
        pass

    def get(self, key):
        return -1

    def put(self, key, value):
        pass`,

            javascript: `#include <unordered_map>
#include <list>
using namespace std;

class LRUCache {

    constructor(capacity) {

    }

    get(key) {
        return -1;
    }

    put(key, value) {

    }
}`,
        },
    },
];