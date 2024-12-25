// クイズの問題と選択肢を設定
const questions = [
    { question: "もえの誕生日はいつ？", choices: ["4/30", "1/1", "12/25", "8/15"], correct: 0 },
    { question: "もえの好きな食べ物は？", choices: ["キムチ", "メロン", "からし", "ブルーベリー"], correct: 3 },
    { question: "もえが嫌いな食べ物は？", choices: ["ピーマン", "トマト", "スイカ", "ところてん"], correct: 3 },
    { question: "デートしたい場所は？", choices: ["タイ", "勝鬨橋", "USJ", "ディズニー"], correct: -1 }, // どれでも正解
    { question: "えいくんの好きなところは？", choices: ["優しい", "面白すぎる", "かわいい", "神童"], correct: -1 }, // どれでも正解
    { question: "新婚旅行行くなら？", choices: ["ニューヨーク", "パリ", "フロリダ", "ヴェネツィア"], correct: -1 }, // どれでも正解
    { question: "もえが好きなえいくんの部位は？", choices: ["手", "足", "目", "髪"], correct: -1 }, // どれでも正解
    { question: "思い出のデートは？", choices: ["上野", "エアビ", "代々木公園", "えいくんち"], correct: -1 }, // どれでも正解
    { question: "もえの大好きなセリフは？", choices: ["人生はやーい", "ディズニー行く？", "結婚しようね", "お泊まりする？"], correct: -1 }, // どれでも正解
];

// 初期状態設定
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let playerNumber = 1128; // プレイヤー番号

document.getElementById("start-button").addEventListener("click", startQuiz);

// クイズ開始ボタン
function startQuiz() {
    document.getElementById("start-button").style.display = "none";
    document.getElementById("question-container").style.display = "block";
    showQuestion();
    startTimer();
}

// タイマー開始
function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("timer").textContent = `${timeLeft}秒`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showResult("時間切れ！残念！君は脱落した...");
        }
    }, 1000);
}

// 次の質問を表示
function showQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;
    const choicesContainer = document.getElementById("choices");
    choicesContainer.innerHTML = "";
    questionData.choices.forEach((choice, index) => {
        const choiceElement = document.createElement("div");
        choiceElement.textContent = choice;
        choiceElement.addEventListener("click", () => checkAnswer(index));
        choicesContainer.appendChild(choiceElement);
    });
}

// 選択肢が正しいかどうかチェック
function checkAnswer(selectedIndex) {
    const questionData = questions[currentQuestionIndex];
    if (selectedIndex === questionData.correct || questionData.correct === -1) {
        score++;
        alert("正解！君は生き残ることができた…次に進め。");
    } else {
        alert("んーーー違うかな…残念だが、君はここで脱落だ。");
        showResult("君は脱落した...");
        return;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult("ゲームクリア！君は全問正解だ！");
    }
}

// 結果を表示
function showResult(message) {
    document.getElementById("question-container").style.display = "none";
    document.getElementById("result-container").style.display = "block";
    document.getElementById("result-message").textContent = message;
    document.getElementById("restart-button").addEventListener("click", restartQuiz);
}

// 再挑戦ボタン
function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 15;
    document.getElementById("start-button").style.display = "block";
    document.getElementById("result-container").style.display = "none";
}


function correctAnswer() {
    score++;
    correctSound.play(); // 正解音を鳴らす
    document.getElementById("result-container").classList.add("correct");
    document.getElementById("result-message").textContent = "正解！君は生き残ることができた…次に進め。";
    document.getElementById("result-container").style.display = "block";
}

function wrongAnswer() {
    wrongSound.play(); // 不正解音を鳴らす
    document.getElementById("result-container").classList.add("incorrect");
    document.getElementById("result-message").textContent = "んーーー違うかな…残念だが、君はここで脱落だ。";
    document.getElementById("result-container").style.display = "block";
}

function timeout() {
    timeoutSound.play(); // タイムアウト音を鳴らす
    document.getElementById("result-container").classList.add("timeout");
    document.getElementById("result-message").textContent = "時間切れ！残念！君は脱落した...";
    document.getElementById("result-container").style.display = "block";
}

const correctSound = new Audio('correct.mp3');
const wrongSound = new Audio('wrong.mp3');
const timeoutSound = new Audio('timeout.mp3');
