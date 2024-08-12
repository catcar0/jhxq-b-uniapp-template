export const initAllInfo = {
    characters: [
        {
            name: '陈敏',
            avatar: 'http://159.138.147.87/statics/avatar/chenmin.svg',
            user: '未知选手',
            score: 0,
            cueset: {
                clues: [{ name: 'clue10', isNew: false, deepClue: '', type: 0, isRead: false }, { name: 'clue14', isNew: false, deepClue: '', type: 0, isRead: true }, { name: 'clue16', isNew: false, deepClue: '', type: 0, isRead: false }, { name: 'clue17', isNew: false, deepClue: '', type: 0, isRead: false },],
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
        flowIndex: 0,
        replay: [
            {   
                name:'第一次魂穿复盘',
                hy:[],
                xa:[]
            }
        ]
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
                    clues: ['clue6', 'clue7', 'clue8', 'clue9', 'clue10', 'clue11',],
                    content: [
                        {
                            userIndex: 0,
                            status: 0,
                            clue: 'clue12',
                            deepClue: 'clue10',
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
                            clue: 'clue13',
                            deepClue: 'clue8',
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
                            score: 10,
                            canReplay:false,
                            repaly: [
                                '“我们”明明知道春天有严重的恐血症，何阑却还是指示学校中其他女生在春天面前摆弄带血的野猫尸体，可以得知“我们”在对春天进行霸凌，且这种类似霸凌的行为“我们”每个人都有所参与。',
                                '曾经有个叫做黄鹂的女生和我们关系不错，不过因为春天的引导，黄鹂想要对某件事情某些人进行举报，目前所有已知信息中可以得知想要举报的就是我们校园霸凌行为。而通过白鹭视角我们知道之后这个叫做黄鹂的女生被我们“处理”了，因此这就是我们后来继续“霸凌”春天的原因。',
                                '春天对于我们的：“霸凌”行为应该是打算做出举报',
                                '首先我们知道“春天”有严重的恐血症并可能因此激发暴力行为，而通过尹萍视角听到的同学传言，今天在厕所除了野猫事件外，还有人掐了春天。那掐春天的人就极有可能被春天的暴力行为伤害，而今天受伤的人是尹萍。'
                            ],
                            usersSubmit: [0, 0, 0, 0, 0, 0],
                            qa: [
                                {
                                    name: '问题1',
                                    question: '在今天以前，我们对春天做了什么？',
                                    anser: ['clue14'],
                                    usersAnser: [{ anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }]
                                },
                                {
                                    name: '问题2',
                                    question: '我们为什么要这么做？',
                                    anser: ['clue16'],
                                    usersAnser: [{ anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }]
                                },
                                {
                                    name: '问题3',
                                    question: '对于我们的行为，春天有什么反应？',
                                    anser: ['clue10'],
                                    usersAnser: [{ anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }]
                                },
                                {
                                    name: '问题4',
                                    question: '为什么何阑会对李梦说“有人比我们更着急”？这和春天的死有没有联系？',
                                    anser: ['clue17'],
                                    usersAnser: [{ anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }, { anser: [], status: 0 }]
                                }
                            ]
                        },
                        xa: {
                            name: '凶案问卷',
                            status: 1,
                            score: 30,
                            canReplay:false,
                            repaly: [
                                '凶手是尹萍。逻辑是老师说尹萍的字写得太丑了，但是在课间活动的那个签到表上尹萍的字十分漂亮，力透纸背，不是一个手指受伤的人写的出来的字，所以尹萍所谓的不在场证明是伪造的，她有充足的时间杀死春天。',
                                '之前我们猜测过如果春天在厕所由于恐血症伴随的暴力行为，留下了一些证据能够指示有人对她做过霸凌行为，那么或许要消除这个证据必须要以分尸的方式进行处理，通过尹萍的个人线索能看到她大拇指指甲盖断裂，而在李梦视角中春天在厕所时并没有受伤嘴角却有些血渍，或许尹萍断裂的指甲盖正是春天造成，甚至可能被春天吞下了肚里。因此如果不想春天尸体被发现后因为肚里的指甲盖被发现因此受到怀疑，就必须对春天进行分尸处理。'
                            ],
                            usersSubmit: [0, 0, 0, 0, 0, 0],
                            qa: [
                                {
                                    name: '问题4',
                                    question: '凶手是谁？',
                                    anser: 'clue23',
                                    usersAnser: [{ anser: '', status: 0 }, { anser: '', status: 0 }, { anser: '', status: 0 }, { anser: '', status: 0 }, { anser: '', status: 0 }, { anser: '', status: 0 }]
                                },
                                {
                                    name: '问题5',
                                    question: 'Ta为什么要杀害春天并分尸？',
                                    anser: 'clue6',
                                    usersAnser: [{ anser: '', status: 0 }, { anser: '', status: 0 }, { anser: '', status: 0 }, { anser: '', status: 0 }, { anser: '', status: 0 }, { anser: '', status: 0 }]
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
            isSwitchOn: false
        }
    ],
    locationList:
        [
            {
                name: '医务室',
                position: {
                    top: '30rpx',
                    left: '320rpx',
                    iconTop: '110rpx',
                    iconLeft: '330rpx'
                },
                isShow: true,
                clue: 'clue17',
                id: 0
            },
            {
                name: '后山',
                position: {
                    top: '70rpx',
                    left: '530rpx',
                    iconTop: '170rpx',
                    iconLeft: '540rpx'
                },
                isShow: true,
                clue: 'clue2',
                id: 1
            },
            {
                name: '操场',
                position: {
                    top: '180rpx',
                    left: '340rpx',
                    iconTop: '260rpx',
                    iconLeft: '350rpx'
                },
                isShow: true,
                clue: 'clue1',
                id: 2
            },
            {
                name: '厕所',
                position: {
                    top: '220rpx',
                    left: '130rpx',
                    iconTop: '240rpx',
                    iconLeft: '110rpx'
                },
                isShow: true,
                clue: 'clue14',
                id: 3
            },
            {
                name: '花坛',
                position: {
                    top: '300rpx',
                    left: '520rpx',
                    iconTop: '320rpx',
                    iconLeft: '500rpx'
                },
                isShow: true,
                clue: 'clue1',
                id: 4
            },
            {
                name: '教学楼',
                position: {
                    top: '365rpx',
                    left: '210rpx',
                    iconTop: '450rpx',
                    iconLeft: '220rpx'
                },
                isShow: true,
                clue: 'clue18',
                id: 5
            },
            {
                name: '保安室',
                position: {
                    top: '455rpx',
                    left: '20rpx',
                    iconTop: '410rpx',
                    iconLeft: '30rpx'
                },
                isShow: true,
                clue: 'clue1',
                id: 6
            },
            {
                name: '校公告栏',
                position: {
                    top: '520rpx',
                    left: '490rpx',
                    iconTop: '540rpx',
                    iconLeft: '460rpx'
                },
                isShow: true,
                clue: 'clue1',
                id: 7
            },
            {
                name: '食堂',
                position: {
                    top: '535rpx',
                    left: '250rpx',
                    iconTop: '630rpx',
                    iconLeft: '260rpx'
                },
                isShow: true,
                clue: 'clue1',
                id: 8
            },
            {
                name: '洗衣房',
                position: {
                    top: '670rpx',
                    left: '540rpx',
                    iconTop: '750rpx',
                    iconLeft: '690rpx'
                },
                isShow: true,
                clue: 'clue1',
                id: 9
            },
            {
                name: '图书馆',
                position: {
                    top: '760rpx',
                    left: '340rpx',
                    iconTop: '850rpx',
                    iconLeft: '410rpx'
                },
                isShow: true,
                clue: 'clue1',
                id: 10
            },
            {
                name: '活动楼',
                position: {
                    top: '790rpx',
                    left: '40rpx',
                    iconTop: '870rpx',
                    iconLeft: '50rpx'
                },
                isShow: true,
                clue: 'clue16',
                id: 11
            },
            {
                name: '宿舍',
                position: {
                    top: '980rpx',
                    left: '490rpx',
                    iconTop: '930rpx',
                    iconLeft: '630rpx'
                },
                isShow: true,
                clue: 'clue1',
                id: 12
            },
            {
                name: '教务处',
                position: {
                    top: '1050rpx',
                    left: '60rpx',
                    iconTop: '1070rpx',
                    iconLeft: '40rpx'
                },
                isShow: true,
                clue: 'clue15',
                id: 13
            },
            {
                name: '独栋小楼',
                position: {
                    top: '1150rpx',
                    left: '290rpx',
                    iconTop: '1230rpx',
                    iconLeft: '310rpx'
                },
                isShow: true,
                clue: 'clue1',
                id: 14
            },
        ]

}