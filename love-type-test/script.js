
const questions = [
  { q: "연인과 데이트할 때, 당신은?", options: ["계획형", "즉흥형"] },
  { q: "고백은?", options: ["내가 먼저", "상대가 먼저"] },
  { q: "연애 스타일은?", options: ["자주 연락", "느긋한 연락"] },
  { q: "이별이 왔다면?", options: ["붙잡는다", "쿨하게 떠난다"] },
  { q: "연애에서 가장 중요한 것은?", options: ["신뢰", "설렘"] },
  { q: "상대가 연락이 늦으면?", options: ["불안하다", "괜찮다"] },
  { q: "데이트 약속이 갑자기 취소된다면?", options: ["속상하다", "괜찮을 수 있다"] }
];

let current = 0;
let answers = [];

function showQuestion() {
  const q = questions[current];
  document.getElementById("question").textContent = q.q;
  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach((text, index) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = text;
    btn.onclick = () => {
      answers.push(index);
      nextQuestion();
    };
    optionsDiv.appendChild(btn);
  });
}

function nextQuestion() {
  current++;
  if (current < questions.length) {
    showQuestion();
  } else {
    const quiz = document.getElementById("quiz");
    const loading = document.getElementById("loading-screen");

    if (quiz && loading) {
      quiz.style.display = "none";
      loading.style.display = "block";

      setTimeout(() => {
        loading.style.display = "none";
        quiz.style.display = "block";
        showResult();
      }, 500);
    }
  }
}

function showResult() {
  const score = answers.reduce((a, b) => a + b, 0);
  let type = "";
  let adviceList = [];

  if (score === 0) {
    type = "❄️ 연애 회피형";
    adviceList = [
      "사랑이 어렵게 느껴질 수 있어요. 천천히 시작해도 괜찮아요.",
      "스스로를 먼저 사랑하는 것도 연습이 필요해요."
    ];
  } else if (score === 1) {
    type = "🪩 철벽 방어형";
    adviceList = [
      "상대를 너무 믿지 못하는 건 과거의 상처 때문일 수도 있어요.",
      "마음을 열면 상대방도 더 따뜻하게 다가올 거예요."
    ];
  } else if (score === 2) {
    type = "🎯 직진형 연애자";
    adviceList = [
      "당신의 솔직함은 매력이지만, 여유도 중요해요.",
      "상대방의 속도도 함께 맞춰보면 더 오래 갈 수 있어요."
    ];
  } else if (score === 3) {
    type = "💖 따뜻한 리더형";
    adviceList = [
      "늘 먼저 배려하는 당신, 때론 스스로를 챙기는 것도 필요해요.",
      "표현하지 않으면 모를 수 있어요. 마음을 나눠보세요."
    ];
  } else if (score === 4) {
    type = "🌊 균형 잡힌 파트너형";
    adviceList = [
      "서로의 다름을 인정하며 잘 맞춰가는 타입이에요.",
      "대화가 끊기지 않게 꾸준한 관심이 중요해요."
    ];
  } else if (score === 5) {
    type = "🌿 자유로운 영혼형";
    adviceList = [
      "자유롭지만 책임감 있는 연애를 지향하는 당신!",
      "상대에게도 자유를 줄 때 신뢰가 자랍니다."
    ];
  } else if (score === 6) {
    type = "🌀 밀당 장인형";
    adviceList = [
      "당신은 밀당의 고수! 하지만 가끔은 직진도 필요해요.",
      "상대가 혼란스러워할 수 있으니 진심은 꼭 보여주세요."
    ];
  } else {
    type = "🔥 감정 폭발형";
    adviceList = [
      "감정에 솔직한 건 좋아요, 하지만 천천히 말해도 괜찮아요.",
      "대화는 감정보다 먼저 시작해야 할 때가 있어요."
    ];
  }

  const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];

  const quiz = document.getElementById("quiz");
  quiz.innerHTML = `
    <h2>당신은 "${type}" 입니다!</h2>
    <p style="font-size: 0.9rem; color: #666; margin-top: 1rem;">💬 ${randomAdvice}</p>
    <button id="restartBtn" onclick="restartQuiz()">🔁 다시 하기</button>
  `;

  const ad = document.getElementById("adsense-bottom");
  if (ad) ad.style.display = "block";
}

function restartQuiz() {
  current = 0;
  answers = [];

  const ad = document.getElementById("adsense-bottom");
  if (ad) ad.style.display = "none";

  document.getElementById("quiz").innerHTML = `
    <h2 id="question"></h2>
    <div id="options"></div>
  `;
  showQuestion();
}

document.getElementById("startBtn").onclick = () => {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz").style.display = "block";
  showQuestion();
};
