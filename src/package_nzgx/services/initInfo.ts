export const initAllInfo = {
    characters: [
        {
            name: '何阑',
            avatar: 'http://159.138.147.87/statics/avatar/helan.svg',
            user: '未知选手',
            score: 300,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
                newClues: [],
                qa:[]
            },
            gualing: {
                question: []
            }
        },
        {
            name: '陈敏',
            avatar: 'http://159.138.147.87/statics/avatar/chenmin.svg',
            user: '未知选手',
            score: 300,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
                newClues: [],
                qa:[]
            },
            gualing: {
                question: []
            }
        },
        {
            name: '白鹭',
            avatar: 'http://159.138.147.87/statics/avatar/bailu.svg',
            user: '未知选手',
            score: 300,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
                newClues: [],
                qa:[]
            },
            gualing: {
                question: []
            }
        },
        {
            name: '尹萍',
            avatar: 'http://159.138.147.87/statics/avatar/yinpin.svg',
            user: '未知选手',
            score: 300,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
                newClues: [],
                qa:[]
            },
            gualing: {
                question: []
            }
        },
        {
            name: '林佳',
            avatar: 'http://159.138.147.87/statics/avatar/linjia.svg',
            user: '未知选手',
            score: 300,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
                newClues: [],
                qa:[]
            },
            gualing: {
                question: []
            }
        },
        {
            name: '李梦',
            avatar: 'http://159.138.147.87/statics/avatar/limeng.svg',
            user: '未知选手',
            score: 300,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
                newClues: [],
                qa:[]
            },
            gualing: {
                question: []
            }
        },
        {
            name: '何阑',
            avatar: 'http://159.138.147.87/statics/avatar/helan.svg',
            user: '未知选手',
            score: 300,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
                newClues: [],
                qa:[]
            },
            gualing: {
                question: []
            }
        }

    ],
    teamInfo: {
        name: '啥都接',
        scores: 0,
        status: 0,
        flowIndex: 0
    },
    flow: [
        {
            inner: [
                {
                    title: '开启逐风',
                    content: [{}],
                    status: 0,
                    isSwitchOn:false
                },
                {
                    title: '找尸体',
                    isSwitchOn:false,
                    content: [
                        {
                            location: '后山',
                            status: 0,
                            clue: {
                                name:'clue1',
                                context:'一张陈慧娴的海报，上面有两个小字———黄鹂',
                                type:0
                            }
                        },
                        {
                            location: '教室',
                            status: 0,
                            clue: {
                                name:'clue2',
                                context:'海报背面',
                                type:0
                            }
                        },
                        {
                            location: '食堂',
                            status: 0,
                            clue: {
                                name:'clue3',
                                context:'黄鹂',
                                type:0
                            }
                        },
                        {
                            location: '活动楼',
                            status: 0,
                            clue: {
                                name:'clue3',
                                context:'黄鹂',
                                type:0
                            }
                        }
                    ],
                    status: 0
                },
                {
                    title: '个人线索发放+个人问题',
                    isSwitchOn:false,
                    content: [
                        {
                            userIndex:1,
                            status:0,
                            qalist: [
                                {
                                    question: '问题1',
                                    answer: '答案1'
                                },
                                {
                                    question: '问题2',
                                    answer: '答案2'
                                }
                            ]
                        },
                        {
                            userIndex:2,
                            status:0,
                            qalist: [
                                {
                                    question: '问题1',
                                    answer: '答案1'
                                },
                                {
                                    question: '问题2',
                                    answer: '答案2'
                                }
                            ]
                        }
                    ],
                    status: 0
                },
                {
                    title: '音频搜证',
                    isSwitchOn:false,
                    content: [
                        {
                            users: [4, 2],
                            name: '图书馆',
                            position: {
                                top: '245rpx',
                                left: '210rpx',
                            },
                            status: 3,
                        },
                        {
                            users: [3, -1],
                            name: '图书馆',
                            position: {
                                top: '730rpx',
                                left: '490rpx',
                            },
                            status: 0,
                        }
                    ],
                    status: 0
                },
                {
                    title: '地图搜证',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
                {
                    title: '卦灵',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
                {
                    title: '封印动画',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
            ],
            status: 1,
            title: '第一次魂穿',
            repaly: '',
            isSwitchOn:false
        },
        {
            inner: [
                {
                    title: '开启逐风',
                    content: [{}],
                    status: 0,
                    isSwitchOn:false
                },
                {
                    title: '找尸体',
                    isSwitchOn:false,
                    content: [
                        {
                            location: '后山',
                            status: 0,
                            clue: {
                                name:'clue1',
                                context:'一张陈慧娴的海报，上面有两个小字———黄鹂',
                                type:0
                            }
                        },
                        // {
                        //     location: '教室',
                        //     status: 0,
                        //     clue: {
                        //         name:'clue2',
                        //         context:'海报背面',
                        //         type:0
                        //     }
                        // },
                        // {
                        //     location: '食堂',
                        //     status: 0,
                        //     clue: {
                        //         name:'clue3',
                        //         context:'黄鹂',
                        //         type:0
                        //     }
                        // },
                        // {
                        //     location: '活动楼',
                        //     status: 0,
                        //     clue: {
                        //         name:'clue3',
                        //         context:'黄鹂',
                        //         type:0
                        //     }
                        // }
                    ],
                    status: 0
                },
                {
                    title: '个人线索发放+个人问题',
                    isSwitchOn:false,
                    content: [
                        {
                            userIndex:1,
                            status:0,
                            qalist: [
                                {
                                    question: '问题1',
                                    answer: '答案1'
                                },
                                {
                                    question: '问题2',
                                    answer: '答案2'
                                }
                            ]
                        },
                        {
                            userIndex:2,
                            status:0,
                            qalist: [
                                {
                                    question: '问题1',
                                    answer: '答案1'
                                },
                                {
                                    question: '问题2',
                                    answer: '答案2'
                                }
                            ]
                        }
                    ],
                    status: 0
                },
                {
                    title: '音频搜证',
                    isSwitchOn:false,
                    content: [
                        {
                            users: [1, 2],
                            location: '后山花坛',
                            status: 3,
                        },
                        {
                            users: [3],
                            location: '教室',
                            status: 0,
                        }
                    ],
                    status: 0
                },
                {
                    title: '地图搜证',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
                {
                    title: '卦灵',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
                {
                    title: '封印动画',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
            ],
            status: 0,
            title: '第二次魂穿',
            repaly: '',
            isSwitchOn:false
        }, 
        {
            inner: [
                {
                    title: '开启逐风',
                    content: [{}],
                    status: 0,
                    isSwitchOn:false
                },
                {
                    title: '找尸体',
                    isSwitchOn:false,
                    content: [
                        {
                            location: '后山',
                            status: 0,
                            clue: {
                                name:'clue1',
                                context:'一张陈慧娴的海报，上面有两个小字———黄鹂',
                                type:0
                            }
                        },
                        // {
                        //     location: '教室',
                        //     status: 0,
                        //     clue: {
                        //         name:'clue2',
                        //         context:'海报背面',
                        //         type:0
                        //     }
                        // },
                        // {
                        //     location: '食堂',
                        //     status: 0,
                        //     clue: {
                        //         name:'clue3',
                        //         context:'黄鹂',
                        //         type:0
                        //     }
                        // },
                        // {
                        //     location: '活动楼',
                        //     status: 0,
                        //     clue: {
                        //         name:'clue3',
                        //         context:'黄鹂',
                        //         type:0
                        //     }
                        // }
                    ],
                    status: 0
                },
                {
                    title: '个人线索发放+个人问题',
                    isSwitchOn:false,
                    content: [
                        {
                            userIndex:1,
                            status:0,
                            qalist: [
                                {
                                    question: '问题1',
                                    answer: '答案1'
                                },
                                {
                                    question: '问题2',
                                    answer: '答案2'
                                }
                            ]
                        },
                        {
                            userIndex:2,
                            status:0,
                            qalist: [
                                {
                                    question: '问题1',
                                    answer: '答案1'
                                },
                                {
                                    question: '问题2',
                                    answer: '答案2'
                                }
                            ]
                        }
                    ],
                    status: 0
                },
                {
                    title: '音频搜证',
                    isSwitchOn:false,
                    content: [
                        {
                            users: [1, 2],
                            location: '后山花坛',
                            status: 3,
                        },
                        {
                            users: [3],
                            location: '教室',
                            status: 0,
                        }
                    ],
                    status: 0
                },
                {
                    title: '地图搜证',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
                {
                    title: '卦灵',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
                {
                    title: '封印动画',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
            ],
            status: 0,
            title: '第三次魂穿',
            repaly: '',
            isSwitchOn:false
        }, 
        {
            inner: [
                {
                    title: '开启逐风',
                    content: [{}],
                    status: 0,
                    isSwitchOn:false
                },
                {
                    title: '找尸体',
                    isSwitchOn:false,
                    content: [
                        {
                            location: '后山',
                            status: 0,
                            clue: {
                                name:'clue1',
                                context:'一张陈慧娴的海报，上面有两个小字———黄鹂',
                                type:0
                            }
                        },
                        // {
                        //     location: '教室',
                        //     status: 0,
                        //     clue: {
                        //         name:'clue2',
                        //         context:'海报背面',
                        //         type:0
                        //     }
                        // },
                        // {
                        //     location: '食堂',
                        //     status: 0,
                        //     clue: {
                        //         name:'clue3',
                        //         context:'黄鹂',
                        //         type:0
                        //     }
                        // },
                        // {
                        //     location: '活动楼',
                        //     status: 0,
                        //     clue: {
                        //         name:'clue3',
                        //         context:'黄鹂',
                        //         type:0
                        //     }
                        // }
                    ],
                    status: 0
                },
                {
                    title: '个人线索发放+个人问题',
                    isSwitchOn:false,
                    content: [
                        {
                            userIndex:1,
                            status:0,
                            qalist: [
                                {
                                    question: '问题1',
                                    answer: '答案1'
                                },
                                {
                                    question: '问题2',
                                    answer: '答案2'
                                }
                            ]
                        },
                        {
                            userIndex:2,
                            status:0,
                            qalist: [
                                {
                                    question: '问题1',
                                    answer: '答案1'
                                },
                                {
                                    question: '问题2',
                                    answer: '答案2'
                                }
                            ]
                        }
                    ],
                    status: 0
                },
                {
                    title: '音频搜证',
                    isSwitchOn:false,
                    content: [
                        {
                            users: [1, 2],
                            location: '后山花坛',
                            status: 3,
                        },
                        {
                            users: [3],
                            location: '教室',
                            status: 0,
                        }
                    ],
                    status: 0
                },
                {
                    title: '地图搜证',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
                {
                    title: '卦灵',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
                {
                    title: '封印动画',
                    isSwitchOn:false,
                    content: [{}],
                    status: 0
                },
            ],
            status: 0,
            title: '海报分享',
            repaly: '',
            isSwitchOn:false
        }
    ]
}