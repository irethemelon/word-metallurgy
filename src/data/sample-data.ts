import type { GameState, WordData } from '../types/game';

// 游戏全局配置
const gameConfig = {
    soundEffects: {
        correct: {
            url: 'https://vol-v6.bczcdn.com/r/right_h6kpe35uppqew9u6w8b3hpzyyj383wft.mp3',
            duration: 1.5
        },
        incorrect: {
            url: 'https://vol-v6.bczcdn.com/r/wrong_94ltv3a46s8vntcj3lrvra7ywdszdsv2.mp3',
            duration: 1.5
        }
    },
    config: {
        countdownDuration: 300,
        failureSpeedMultiplier: 2,
        buttonColors: {
            initial: '#FFFFFF',
            level1: '#FFE4E1',
            level2: '#FFE4C4',
            level3: '#FFF8DC',
            level4: '#F0FFF0',
            level5: '#F0FFFF',
            level6: '#F0F8FF',
            level7: '#F5F0FF'
        }
    }
};

// 示例单词数据
const sampleWords: WordData[] = [
    {
        id: 'word1',
        word: 'book',
        audioResources: {
            pronunciation: {
                url: 'https://vol.bczcdn.com/r/us_book_20250210142208335_6179de6c320e5317d54e.mp3',
                duration: 1
            },
            sentences: [
                {
                    url: '/audio/book/sentence1.mp3',
                    duration: 3
                }
            ]
        },
        questions: {
            word: 'book',
            questions: [
                {
                    id: '1',
                    type: 1,
                    question: '请选择单词正确的释义：I want to borrow a book from the library.',
                    options: [
                        { id: '1', text: 'n.书', isCorrect: true },
                        { id: '2', text: 'n.电脑', isCorrect: false },
                        { id: '3', text: 'n.钢笔', isCorrect: false }
                    ]
                },
                {
                    id: '2',
                    type: 2,
                    question: '请选择该释义对应的正确单词',
                    questionText: 'n.书本',
                    options: [
                        { id: '1', text: 'book', isCorrect: true },
                        { id: '2', text: 'cook', isCorrect: false },
                        { id: '3', text: 'look', isCorrect: false }
                    ]
                },
                {
                    id: '3',
                    type: 3,
                    question: '请选择你听到的单词',
                    audioUrl: 'https://vol.bczcdn.com/r/us_book_20250208145800440_43655a8e75c85d863169.mp3',
                    options: [
                        { id: '1', text: 'book', isCorrect: true },
                        { id: '2', text: 'cook', isCorrect: false },
                        { id: '3', text: 'look', isCorrect: false }
                    ]
                },
                {
                    id: '5',
                    type: 5,
                    question: '请选择该单词的所有释义（共3个）',
                    isMultiSelect: true,
                    options: [
                        {
                            id: 'o1',
                            text: 'n.书本',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'v.预定',
                            isCorrect: true
                        },
                        {
                            id: 'o3',
                            text: 'n.账簿',
                            isCorrect: true
                        },
                        {
                            id: 'o4',
                            text: 'n.飞机',
                            isCorrect: false
                        },
                        {
                            id: 'o5',
                            text: 'v.开枪',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: '4',
                    type: 4,
                    question: '请将英文短语与中文释义配对',
                    isPairMatching: true,
                    options: [], // Adding empty options array since this is a pair matching question
                    pairs: [
                        {
                            id: '1',
                            english: 'book a ticket',
                            chinese: '订票',
                            audioUrl: 'https://vol.bczcdn.com/r/us_book_a_20250207162402440_510f839540c744f488f7.mp3'
                        },
                        {
                            id: 'p2',
                            english: 'philosophy book',
                            chinese: '哲学书',
                            audioUrl: 'https://vol.bczcdn.com/r/us_philosophy_20250207162403108_0ad22e916f8a106fab1c.mp3'
                        },
                        {
                            id: 'p3',
                            english: 'keep the books',
                            chinese: '记账',
                            audioUrl: 'https://vol.bczcdn.com/r/us_keep_the_20250207162403775_dcf58134834a838e9971.mp3'
                        }
                    ]
                },
                {
                    id: '6',
                    type: 6,
                    question: '请选择单词的正确形式填空',
                    questionText: 'No advance _____________ is necessary. You can buy the tickets when you arrive.',
                    options: [
                        { id: '1', text: 'booking', isCorrect: true },
                        { id: '2', text: 'books', isCorrect: false },
                        { id: '3', text: 'booked', isCorrect: false }
                    ]
                },
                {
                    id: '7',
                    type: 7,
                    question: '请匹配下列同近义词和它们的用法',
                    isPairMatching: true,
                    options: [],
                    pairs: [
                        {
                            id: '1',
                            english: 'book v.预订',
                            chinese: '_________ a ticket',
                            audioUrl: 'https://vol.bczcdn.com/r/us_book_a_20250207170017249_f6245a349515b28b0613.mp3',
                            wordInfo: {
                                word: 'book',
                                meaning: '预订',
                                partOfSpeech: 'v.',
                                example: 'You need to book your flight tickets in advance.'
                            }
                        },
                        {
                            id: '2',
                            english: 'reserve v.预定；保留',
                            chinese: '_________ a table',
                            audioUrl: 'https://vol.bczcdn.com/r/us_reserve_a_20250207170017895_7eedf7ee00a742a0ebe2.mp3',
                            wordInfo: {
                                word: 'reserve',
                                meaning: '预定；保留',
                                partOfSpeech: 'v.',
                                example: 'Please reserve a table for two at 7 PM.'
                            }
                        },
                        {
                            id: '3',
                            english: 'order v.点单',
                            chinese: '_________ a drink',
                            audioUrl: 'https://vol.bczcdn.com/r/us_order_a_20250208134144428_397e0f960b2769e75cb2.mp3',
                            wordInfo: {
                                word: 'order',
                                meaning: '点单',
                                partOfSpeech: 'v.',
                                example: 'I would like to order a coffee.'
                            }
                        }
                    ]
                }
            ]
        },
        progress: {
            completedQuestionTypes: [],
            currentQuestionType: 1,
            timeRemaining: 300,
            buttonColor: '#FFFFFF'
        }
    },
    {
        id: 'word2',
        word: 'forge',
        audioResources: {
            pronunciation: {
                url: 'https://vol.bczcdn.com/r/us_forge_20250210142351341_7cf2ae022b417616376f.mp3',
                duration: 1
            },
            sentences: [
                {
                    url: '/audio/forge/sentence1.mp3',
                    duration: 3
                }
            ]
        },
        questions: {
            word: 'forge',
            questions: [
                {
                    id: 'q1',
                    type: 1,
                    question: '请选择单词的正确释义：They forged a close friendship over the years.',
                    options: [
                        {
                            id: 'o1',
                            text: 'v.打造',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'v.管理',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'v.睡觉',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q2',
                    type: 2,
                    question: '请选择该释义对应的正确单词',
                    questionText: 'v.打造',
                    options: [
                        {
                            id: 'o1',
                            text: 'forge',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'gorge',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'bored',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q3',
                    type: 3,
                    question: '请选择该发音对应的正确单词',
                    audioUrl: 'https://vol.bczcdn.com/r/us_forge_20250208145801231_bd6881f9c6b047d127ef.mp3',
                    options: [
                        {
                            id: 'o1',
                            text: 'forge',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'gorge',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'bored',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q5',
                    type: 5,
                    question: '请选择该单词的所有释义（共4个）',
                    isMultiSelect: true,
                    options: [
                        {
                            id: 'o1',
                            text: 'v.锻造',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'v.伪造',
                            isCorrect: true
                        },
                        {
                            id: 'o3',
                            text: 'v.稳步前进',
                            isCorrect: true
                        },
                        {
                            id: 'o4',
                            text: 'n.锻造车间',
                            isCorrect: true
                        },
                        {
                            id: 'o5',
                            text: 'v.浇灌',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q4',
                    type: 4,
                    question: '请匹配下列词组和翻译',
                    isPairMatching: true,
                    options: [], // Adding empty options array since this is a pair matching question
                    pairs: [
                        {
                            id: 'p1',
                            english: 'forge a document',
                            chinese: '伪造文件',
                            audioUrl: 'https://vol.bczcdn.com/r/us_forge_a_20250207162404665_faeb241331918e9880eb.mp3'
                        },
                        {
                            id: 'p2',
                            english: 'forge ahead',
                            chinese: '继续稳步前行',
                            audioUrl: 'https://vol.bczcdn.com/r/us_forge_20250207162405371_8c04dfdf6e85d8cca07d.mp3'
                        },
                        {
                            id: 'p3',
                            english: 'forge a knife',
                            chinese: '锻造一把刀',
                            audioUrl: 'https://vol.bczcdn.com/r/us_forge_a_20250207162406025_c21dbc5052d0325a6343.mp3'
                        },
                        {
                            id: 'p4',
                            english: 'a metal forge',
                            chinese: '金属锻造车间',
                            audioUrl: 'https://vol.bczcdn.com/r/us_a_metal_20250210140914467_04409463c7db5dc6f46b.mp3'
                        }
                    ]
                },
                {
                    id: 'q6',
                    type: 6,
                    question: '请选择单词的正确形式填空',
                    questionText: 'If you forge your ID card, you will commit _____________.',
                    options: [
                        {
                            id: 'o1',
                            text: 'forgery',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'forges',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'forged',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q7',
                    type: 7,
                    question: '请匹配下列同近义词和它们的用法',
                    isPairMatching: true,
                    options: [],
                    pairs: [
                        {
                            id: 'p1',
                            english: 'forge v.伪造',
                            chinese: '_________ a document',
                            audioUrl: 'https://vol.bczcdn.com/r/us_forge_a_20250207170018496_33ff391ba9adc3f9a2f5.mp3',
                        },
                        {
                            id: 'p2',
                            english: 'fabricate v.捏造',
                            chinese: '_________ a story',
                            audioUrl: 'https://vol.bczcdn.com/r/us_fabricate_a_20250207170019959_66062f9912d6f01a8c57.mp3',
                        },
                        {
                            id: 'p3',
                            english: 'lie v.撒谎',
                            chinese: '_________ about his age',
                            audioUrl: 'https://vol.bczcdn.com/r/us_lie_about_20250208134145027_88c5d95460dc14f0edc9.mp3',
                        }
                    ]
                }
            ]
        },
        progress: {
            completedQuestionTypes: [],
            currentQuestionType: 1,
            timeRemaining: 300,
            buttonColor: '#FFFFFF'
        }
    },
    {
        id: 'word3',
        word: 'steep',
        audioResources: {
            pronunciation: {
                url: 'https://vol.bczcdn.com/r/us_steep_20250210142426448_67ba8e02ece6a0073e5d.mp3',
                duration: 1
            },
            sentences: [
                {
                    url: '/audio/steep/sentence1.mp3',
                    duration: 3
                }
            ]
        },
        questions: {
            word: 'steep',
            questions: [
                {
                    id: 'q1',
                    type: 1,
                    question: '请选择单词的正确释义：The mountain was too steep for beginners to climb.',
                    options: [
                        {
                            id: 'o1',
                            text: 'adj.陡峭的',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'adj.平坦的',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'adj.疯狂的',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q2',
                    type: 2,
                    question: '请选择该释义对应的正确单词',
                    questionText: 'adj.陡峭的',
                    options: [
                        {
                            id: 'o1',
                            text: 'steep',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'sleep',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'seep',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q3',
                    type: 3,
                    question: '请选择该发音对应的正确单词',
                    audioUrl: 'https://vol.bczcdn.com/r/us_steep_20250208145802266_e59348abdc836ad967ef.mp3',
                    options: [
                        {
                            id: 'o1',
                            text: 'steep',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'sleep',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'seep',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q5',
                    type: 5,
                    question: '请选择该单词的所有释义（共3个）',
                    isMultiSelect: true,
                    options: [
                        {
                            id: 'o1',
                            text: 'adj.陡峭的',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'adj.价格过高的',
                            isCorrect: true
                        },
                        {
                            id: 'o3',
                            text: 'v.浸泡',
                            isCorrect: true
                        },
                        {
                            id: 'o4',
                            text: 'v.敲打',
                            isCorrect: false
                        },
                        {
                            id: 'o5',
                            text: 'n.梯子',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q4',
                    type: 4,
                    question: '请匹配下列词组和翻译',
                    isPairMatching: true,
                    options: [], // Adding empty options array since this is a pair matching question
                    pairs: [
                        {
                            id: 'p1',
                            english: 'steep hill',
                            chinese: '陡峭的山',
                            audioUrl: 'https://vol.bczcdn.com/r/us_steep_20250207162407036_4a4c0e9f4b28cea96365.mp3'
                        },
                        {
                            id: 'p2',
                            english: 'steep price',
                            chinese: '昂贵的价格',
                            audioUrl: 'https://vol.bczcdn.com/r/us_steep_20250207162407687_36b51a0713062c41b409.mp3'
                        },
                        {
                            id: 'p3',
                            english: 'steep in',
                            chinese: '沉浸在',
                            audioUrl: 'https://vol.bczcdn.com/r/us_steep_20250207162408400_797466a21721885546ac.mp3'
                        }
                    ]
                },
                {
                    id: 'q6',
                    type: 6,
                    question: '请选择单词的正确形式填空',
                    questionText: 'This region is _____________ in tradition.',
                    options: [
                        {
                            id: 'o1',
                            text: 'steeped',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'steeper',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'steeping',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q7',
                    type: 7,
                    question: '请匹配下列同近义词和它们的用法',
                    isPairMatching: true,
                    options: [],
                    pairs: [
                        {
                            id: 'p1',
                            english: 'steep v.浸泡',
                            chinese: '_________ the tea',
                            audioUrl: 'https://vol.bczcdn.com/r/us_steep_the_20250207170020655_e97ee6e78b3a0ac724fc.mp3',
                            wordInfo: {
                                word: 'steep',
                                meaning: '浸泡',
                                partOfSpeech: 'v.',
                                example: 'Steep the tea for 3-5 minutes.'
                            }
                        },
                        {
                            id: 'p2',
                            english: 'marinate v.腌制',
                            chinese: '_________ the meat',
                            audioUrl: 'https://vol.bczcdn.com/r/us_marinate_the_20250207170021267_3649cb98ddf11fc535d8.mp3',
                            wordInfo: {
                                word: 'marinate',
                                meaning: '腌制',
                                partOfSpeech: 'v.',
                                example: 'Marinate the chicken overnight for best results.'
                            }
                        },
                        {
                            id: 'p3',
                            english: 'sink v.下沉',
                            chinese: '_________ into the sea',
                            audioUrl: 'https://vol.bczcdn.com/r/us_sink_into_20250208134145544_9ca7e583808bccb8e403.mp3',
                            wordInfo: {
                                word: 'sink',
                                meaning: '下沉',
                                partOfSpeech: 'v.',
                                example: 'The ship began to sink after hitting the iceberg.'
                            }
                        }
                    ]
                }
            ]
        },
        progress: {
            completedQuestionTypes: [],
            currentQuestionType: 1,
            timeRemaining: 300,
            buttonColor: '#FFFFFF'
        }
    },
    {
        id: 'word4',
        word: 'aggregate',
        audioResources: {
            pronunciation: {
                url: 'https://vol.bczcdn.com/r/us_aggregate_20250210142427083_49a6d88f6fe7dee3f927.mp3',
                duration: 1
            },
            sentences: [
                {
                    url: '/audio/aggregate/sentence1.mp3',
                    duration: 3
                }
            ]
        },
        questions: {
            word: 'aggregate',
            questions: [
                {
                    id: 'q1',
                    type: 1,
                    question: '请选择单词的正确释义：The aggregate revenue of the company has increased.',
                    options: [
                        {
                            id: 'o1',
                            text: 'adj.总和的',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'adj.悲伤的',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'adj.宏大的',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q2',
                    type: 2,
                    question: '请选择该释义对应的正确单词',
                    questionText: 'adj.总和的',
                    options: [
                        {
                            id: 'o1',
                            text: 'aggregate',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'aggravate',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'adequate',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q3',
                    type: 3,
                    question: '请选择该发音对应的正确单词',
                    audioUrl: 'https://vol.bczcdn.com/r/us_aggregate_20250208145802769_8d895009d7b6134230d7.mp3',
                    options: [
                        {
                            id: 'o1',
                            text: 'aggregate',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'aggravate',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'adequate',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q5',
                    type: 5,
                    question: '请选择该单词的所有释义（共3个）',
                    isMultiSelect: true,
                    options: [
                        {
                            id: 'o1',
                            text: 'adj.总和的',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'n.总数',
                            isCorrect: true
                        },
                        {
                            id: 'o3',
                            text: 'v.聚合',
                            isCorrect: true
                        },
                        {
                            id: 'o4',
                            text: 'v.爆炸',
                            isCorrect: false
                        },
                        {
                            id: 'o5',
                            text: 'adj.零散的',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q4',
                    type: 4,
                    question: '请匹配下列词组和翻译',
                    isPairMatching: true,
                    options: [], // Adding empty options array since this is a pair matching question
                    pairs: [
                        {
                            id: 'p1',
                            english: 'aggregate amount',
                            chinese: '总量',
                            audioUrl: 'https://vol.bczcdn.com/r/us_aggregate_20250207162409098_9b976a335bf8942bbd56.mp3'
                        },
                        {
                            id: 'p2',
                            english: 'aggregate score',
                            chinese: '总数/总比分',
                            audioUrl: 'https://vol.bczcdn.com/r/us_aggregate_20250207162409743_8aa5f0de48f7831a14ab.mp3'
                        },
                        {
                            id: 'p3',
                            english: 'aggregate into',
                            chinese: '聚合成',
                            audioUrl: 'https://vol.bczcdn.com/r/us_aggregate_20250207162410439_3e7db6a7d'
                        }
                    ]
                },
                {
                    id: 'q6',
                    type: 6,
                    question: '请选择单词的正确形式填空',
                    questionText: 'Urbanization fascilitates the _____________ of people and housing.',
                    options: [
                        {
                            id: 'o1',
                            text: 'aggregation',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'aggregated',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'aggregate',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q7',
                    type: 7,
                    question: '请匹配下列同近义词和它们的用法',
                    isPairMatching: true,
                    options: [],
                    pairs: [
                        {
                            id: 'p1',
                            english: 'aggregate n.总和',
                            chinese: '_________ of data',
                            audioUrl: 'https://vol.bczcdn.com/r/us_the_aggregate_20250207170021900_bdd1203768398bb3d4f3.mp3',
                            wordInfo: {
                                word: 'aggregate',
                                meaning: '总和',
                                partOfSpeech: 'n.',
                                example: 'The aggregate of all sales exceeded our expectations.'
                            }
                        },
                        {
                            id: 'p2',
                            english: 'collection n.收藏',
                            chinese: '_________ of artefacts',
                            audioUrl: 'https://vol.bczcdn.com/r/us_the_collection_20250207170022542_a4cdcd861aaed99a3b4d.mp3',
                            wordInfo: {
                                word: 'collection',
                                meaning: '收藏',
                                partOfSpeech: 'n.',
                                example: 'The museum has an impressive collection of ancient artifacts.'
                            }
                        },
                        {
                            id: 'p3',
                            english: 'completion n.完成',
                            chinese: '_________ of a project',
                            audioUrl: 'https://vol.bczcdn.com/r/us_completion_of_20250208134146063_3c273d207ac03ea21738.mp3',
                            wordInfo: {
                                word: 'completion',
                                meaning: '完成',
                                partOfSpeech: 'n.',
                                example: 'The completion of the project was celebrated by all team members.'
                            }
                        }
                    ]
                }
            ]
        },
        progress: {
            completedQuestionTypes: [],
            currentQuestionType: 1,
            timeRemaining: 300,
            buttonColor: '#FFFFFF'
        }
    },
    {
        id: 'word5',
        word: 'deliberate',
        audioResources: {
            pronunciation: {
                url: 'https://vol.bczcdn.com/r/us_deliberate_20250210142427760_71196f48b6579d6e2dbb.mp3',
                duration: 1
            },
            sentences: [
                {
                    url: '/audio/deliberate/sentence1.mp3',
                    duration: 3
                }
            ]
        },
        questions: {
            word: 'deliberate',
            questions: [
                {
                    id: 'q1',
                    type: 1,
                    question: '请选择单词的正确释义：His actions were deliberate, not accidental.',
                    options: [
                        {
                            id: 'o1',
                            text: 'adj.故意的',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'adj.无心的',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'adj.善良的',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q2',
                    type: 2,
                    question: '请选择该释义对应的正确单词',
                    questionText: 'adj.故意的',
                    options: [
                        {
                            id: 'o1',
                            text: 'deliberate',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'desperate',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'delicate',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q3',
                    type: 3,
                    question: '请选择该发音对应的正确单词',
                    audioUrl: 'https://vol.bczcdn.com/r/us_deliberate_20250208145803257_bb35ec7c384aa8619bad.mp3',
                    options: [
                        {
                            id: 'o1',
                            text: 'deliberate',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'desperate',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'delicate',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q5',
                    type: 4,
                    question: '请选择该单词的所有释义（共3个）',
                    isMultiSelect: true,
                    options: [
                        {
                            id: 'o1',
                            text: 'adj.故意的',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'adj.小心翼翼的',
                            isCorrect: true
                        },
                        {
                            id: 'o3',
                            text: 'v.认真考虑',
                            isCorrect: true
                        },
                        {
                            id: 'o4',
                            text: 'adj.疯狂的',
                            isCorrect: false
                        },
                        {
                            id: 'o5',
                            text: 'adj.绝望的',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q5',
                    type: 5,
                    question: '请匹配下列词组和翻译',
                    isPairMatching: true,
                    options: [], // Adding empty options array since this is a pair matching question
                    pairs: [
                        {
                            id: 'p1',
                            english: 'deliberate action',
                            chinese: '故意的行为',
                            audioUrl: '/audio/deliberate/deliberate_action.mp3'
                        },
                        {
                            id: 'p2',
                            english: 'deliberate pace',
                            chinese: '小心翼翼的步伐',
                            audioUrl: '/audio/deliberate/deliberate_pace.mp3'
                        },
                        {
                            id: 'p3',
                            english: 'deliberate on',
                            chinese: '认真考虑',
                            audioUrl: '/audio/deliberate/deliberate_on.mp3'
                        }
                    ]
                },
                {
                    id: 'q6',
                    type: 6,
                    question: '请选择单词的正确形式填空',
                    questionText: 'After some _____________, she finally said yes to his proposal.',
                    options: [
                        {
                            id: 'o1',
                            text: 'deliberation',
                            isCorrect: true
                        },
                        {
                            id: 'o2',
                            text: 'deliberately',
                            isCorrect: false
                        },
                        {
                            id: 'o3',
                            text: 'delibrated',
                            isCorrect: false
                        }
                    ]
                },
                {
                    id: 'q7',
                    type: 7,
                    question: '请匹配下列同近义词和它们的用法',
                    isPairMatching: true,
                    options: [],
                    pairs: [
                        {
                            id: 'p1',
                            english: 'deliberate adj.故意的',
                            chinese: '_________ action',
                            audioUrl: 'https://vol.bczcdn.com/r/us_deliberate_20250207170023216_0b61961034a070c3efbe.mp3',
                            wordInfo: {
                                word: 'deliberate',
                                meaning: '故意的',
                                partOfSpeech: 'adj.',
                                example: 'His actions were deliberate and calculated.'
                            }
                        },
                        {
                            id: 'p2',
                            english: 'thoughtful adj.考虑周到的',
                            chinese: '_________ gift',
                            audioUrl: 'https://vol.bczcdn.com/r/us_thoughtful_20250207170023809_cc9f69f196c7ba215cf1.mp3',
                            wordInfo: {
                                word: 'thoughtful',
                                meaning: '考虑周到的',
                                partOfSpeech: 'adj.',
                                example: 'She gave me a very thoughtful birthday present.'
                            }
                        },
                        {
                            id: 'p3',
                            english: 'malicious adj.恶意的',
                            chinese: '_________ gossip',
                            audioUrl: 'https://vol.bczcdn.com/r/us_malicious_20250208134146569_42d42d35dc2d456e7304.mp3',
                            wordInfo: {
                                word: 'malicious',
                                meaning: '恶意的',
                                partOfSpeech: 'adj.',
                                example: 'Spreading malicious rumors can hurt people.'
                            }
                        }
                    ]
                }
            ]
        },
        progress: {
            completedQuestionTypes: [],
            currentQuestionType: 1,
            timeRemaining: 300,
            buttonColor: '#FFFFFF'
        }
    }
];

// 初始游戏状态
const initialGameState: GameState = {
    words: sampleWords,
    soundEffects: gameConfig.soundEffects,
    config: gameConfig.config,
    activeWordId: null,
    isQuestionModalOpen: false,
    activeWords: ['book', 'forge', 'steep', 'aggregate', 'deliberate'],
    wordStates: {
        book: {
            currentStage: 0,
            timerState: {
                timeRemaining: 300,
                isAccelerated: false
            }
        },
        forge: {
            currentStage: 0,
            timerState: {
                timeRemaining: 300,
                isAccelerated: false
            }
        },
        steep: {
            currentStage: 0,
            timerState: {
                timeRemaining: 300,
                isAccelerated: false
            }
        },
        aggregate: {
            currentStage: 0,
            timerState: {
                timeRemaining: 300,
                isAccelerated: false
            }
        },
        deliberate: {
            currentStage: 0,
            timerState: {
                timeRemaining: 300,
                isAccelerated: false
            }
        }
    },
    currentWord: null
};

export { gameConfig, sampleWords as sampleData, initialGameState };
