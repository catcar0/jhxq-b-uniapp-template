export const initAllInfo = {
    characters: [
        {
            name: '陈敏',
            avatar: 'http://159.138.147.87/statics/avatar/chenmin.svg',
            user: '未知选手',
            score: 0,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
            },
            mask: [],
            gualing: {
                question: []
            }
        },
        {
            name: '白鹭',
            avatar: 'http://159.138.147.87/statics/avatar/bailu.svg',
            user: '未知选手',
            score: 0,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
            },
            mask: [],
            gualing: {
                question: []
            }
        },
        {
            name: '尹萍',
            avatar: 'http://159.138.147.87/statics/avatar/yinpin.svg',
            user: '未知选手',
            score: 0,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
            },
            mask: [],
            gualing: {
                question: []
            }
        },
        {
            name: '林佳',
            avatar: 'http://159.138.147.87/statics/avatar/linjia.svg',
            user: '未知选手',
            score: 0,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
            },
            mask: [],
            gualing: {
                question: []
            }
        }, {
            name: '李梦',
            avatar: 'http://159.138.147.87/statics/avatar/limeng.svg',
            user: '未知选手',
            score: 0,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
            },
            mask: [],
            gualing: {
                question: []
            }
        },
        {
            name: '何阑',
            avatar: 'http://159.138.147.87/statics/avatar/helan.svg',
            user: '未知选手',
            score: 0,
            cueset: {
                clues: [],
                audio: [],
                replay: [],
            },
            mask: [],
            gualing: {
                question: []
            }
        }

    ],
    teamInfo: {
        name: '啥都接',
        score: 0,
        status: 0,
        flowIndex: 0
    },
    flow: [
        {
            inner: [
                {
                    title: '开启逐风',
                    content: [{}],
                    status: 3,
                    isSwitchOn: false
                },
                {
                    title: '找尸体',
                    isSwitchOn: false,
                    content: [
                        {
                            location: '后山',
                            status: 0,
                            clue: 'clue1'
                        },
                        {
                            location: '教室',
                            status: 0,
                            clue: 'clue2'
                        },
                        {
                            location: '食堂',
                            status: 0,
                            clue: 'clue3'
                        },
                        {
                            location: '活动楼',
                            status: 0,
                            clue: 'clue4'
                        }
                    ],
                    status: 3
                },
                {
                    title: '个人线索发放+个人问题',
                    isSwitchOn: false,
                    clues:['clue6','clue7','clue8','clue9','clue10','clue11',],
                    content: [
                        {
                            userIndex: 0,
                            status: 0,
                            clue:'clue12',
                            deepClue:'clue10',
                            qalist: [
                                {
                                    question: '作为术士的你为什么觉得陈敏的视角有些奇怪？',
                                    answer: '站在台阶上的陈敏能直直拍你的肩膀，陈敏年纪比你们小很多'
                                }
                            ]
                        },
                        {
                            userIndex: 3,
                            status: 0,
                            clue:'clue13',
                            deepClue:'clue8',
                            qalist: [
                                {
                                    question: '1. 七仙女是谁？',
                                    answer: '1. 七仙女是我们6个加黄鹂'
                                },
                                {
                                    question: '2. 灶王爷是谁？',
                                    answer: '2. 厨师'
                                }
                            ]
                        }
                    ],
                    status: 3
                },
                {
                    title: '音频搜证',
                    isSwitchOn: false,
                    content: [
                        {
                            users: [5, 1],
                            name: '教学楼',
                            position: {
                                top: '365rpx',
                                left: '210rpx',
                            },
                            status: 0,
                            clue: 'clue19',
                            anser: [5, 1],
                            result: ''
                        },
                        {
                            users: [-1, 2],
                            name: '花坛',
                            position: {
                                top: '300rpx',
                                left: '520rpx',
                            },
                            status: 0,
                            clue: 'clue20',
                            anser: [2, 1],
                            result: ''
                        }
                    ],
                    status: 3
                },
                {
                    title: '地图搜证',
                    isSwitchOn: false,
                    content: [
                        {
                            locations: [0, 5, 3, 11, 13]
                        }
                    ],
                    status: 3
                },
                {
                    title: '卦灵',
                    isSwitchOn: false,
                    content: {
                        hy: {
                             name: '还原问卷',
                             status: 1,
                             qa: [
                                 {
                                     name: '问题1',
                                     question: '在今天以前，我们对春天做了什么？',
                                     anser: ['clue14'],
                                     usersAnser: [{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0}]
                                 },
                                 {
                                     name: '问题2',
                                     question: '我们为什么要这么做？',
                                     anser: ['clue16'],
                                     usersAnser: [{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0}]
                                 },
                                 {
                                    name: '问题2',
                                    question: '对于我们的行为，春天有什么反应？',
                                    anser: ['clue10'],
                                    usersAnser: [{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0}]
                                },
                                {
                                    name: '问题2',
                                    question: '为什么何阑会对李梦说“有人比我们更着急”？这和春天的死有没有联系？',
                                    anser: ['clue17'],
                                    usersAnser: [{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0},{anser:[],status:0}]
                                }
                             ]
                         },
                        xa: {
                             name: '凶案问卷',
                             status: 1,
                             qa: [
                                 {
                                     name: '问题1',
                                     question: '凶手是谁？',
                                     anser: 'clue23',
                                     usersAnser: [{anser:'',status:0},{anser:'',status:0},{anser:'',status:0},{anser:'',status:0},{anser:'',status:0},{anser:'',status:0}]
                                 },
                                 {
                                     name: '问题2',
                                     question: 'Ta为什么要杀害春天并分尸？',
                                     anser: 'clue6',
                                     usersAnser: [{anser:'',status:0},{anser:'',status:0},{anser:'',status:0},{anser:'',status:0},{anser:'',status:0},{anser:'',status:0}]
                                 }
                             ]
                         }
                     },
                    status: 0
                },
                {
                    title: '封印动画',
                    isSwitchOn: false,
                    content: [{}],
                    status: 0
                },
            ],
            status: 1,
            title: '第一次魂穿',
            repaly: '',
            isSwitchOn: false
        }
    ]
}