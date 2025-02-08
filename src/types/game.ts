// 基础音频资源接口
interface AudioResource {
    url: string;
    duration: number;
}

// 游戏通用音效
interface GameSoundEffects {
    correct: AudioResource;
    incorrect: AudioResource;
}

// 单词相关的所有音频资源
interface WordAudioResources {
    pronunciation: AudioResource;
    sentences: AudioResource[];
}

// 题目选项接口
interface QuestionOption {
    id: string;
    text: string;
    isCorrect: boolean;
    shouldBeSelected?: boolean; // 用于多选题
    audio?: AudioResource;     // 选项音频
}

// 配对项接口
interface MatchingPair {
    id: string;               // 配对项ID
    english?: string;         // 英文单词
    chinese?: string;         // 中文含义
    audioUrl?: string;        // 音频URL
    wordInfo?: {             // 单词相关信息
        word: string;
        meaning: string;
        partOfSpeech?: string;
        example?: string;
    };
    left?: QuestionOption;    // 左侧选项（用于普通配对）
    right?: QuestionOption;   // 右侧选项（用于普通配对）
}

// 基础题目接口
interface BaseQuestion {
    id: string;
    type: number;            // 1-7 代表不同题型
    question: string;        // 题目文本
    questionText?: string;   // 填空题的句子
    options: QuestionOption[]; // 选项列表
    audioPrompt?: AudioResource; // 音频提示
    pairs?: MatchingPair[];  // 配对题的配对项
    isMultiSelect?: boolean; // 是否多选题
    isPairMatching?: boolean; // 是否配对题
}

// 单词的完整题目集
interface WordQuestions {
    word: string;
    questions: BaseQuestion[]; // 包含7个题型的题目
}

// 单词的学习状态
interface WordProgress {
    completedQuestionTypes: number[]; // 已完成的题型编号数组
    currentQuestionType: number;     // 当前正在进行的题型
    timeRemaining: number;          // 倒计时剩余时间
    buttonColor: string;           // 当前按钮颜色
}

// 单词的完整数据结构
interface WordData {
    id: string;
    word: string;
    audioResources: WordAudioResources;
    questions: WordQuestions;
    progress: WordProgress;
}

// 游戏配置
interface GameConfig {
    countdownDuration: number;     // 基础倒计时时长（秒）
    failureSpeedMultiplier: number; // 失败后的倒计时加速倍率
    buttonColors: {
        initial: string;
        level1: string;  // 浅红色
        level2: string;  // 浅橙色
        level3: string;  // 浅黄色
        level4: string;  // 浅绿色
        level5: string;  // 浅青色
        level6: string;  // 浅蓝色
        level7: string;  // 浅紫色
    };
}

// 游戏状态
interface GameState {
    words: WordData[];
    soundEffects: GameSoundEffects;
    config: GameConfig;
    activeWordId: string | null;
    isQuestionModalOpen: boolean;
    activeWords: string[];   // 当前活跃的单词列表
    wordStates: { [key: string]: WordLearningState }; // 每个单词的学习状态
    currentWord: string | null; // 当前选中的单词
}

// 单词学习状态
interface WordLearningState {
    currentStage: number;
    timerState: {
        timeRemaining: number;
        isAccelerated: boolean;
    };
}

export type {
    AudioResource,
    GameSoundEffects,
    WordAudioResources,
    QuestionOption,
    MatchingPair,
    BaseQuestion,
    WordQuestions,
    WordProgress,
    WordData,
    GameConfig,
    GameState,
    WordLearningState
};
