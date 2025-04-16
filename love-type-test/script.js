
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
let 

function startQuiz() {
  current = 0;
  answers = [];
  const nameInput = document.getElementById("username").value.trim();
  if (!nameInput) {
    alert("이름을 입력해주세요!");
    return;
  }
  userName = nameInput;
  localStorage.setItem("love-test-username", userName);
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("loading-screen").style.display = "block";
  setTimeout(() => {
    document.getElementById("loading-screen").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    showQuestion();
  }, 500);
}

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
    document.getElementById("quiz").style.display = "none";
    showResult();
  }
}

function showResult() {
  const score = answers.reduce((a, b) => a + b, 0);
  let type = "";
  let adviceList = [];

  if (score <= 1) {
    type = "❄️ 연애 회피형";
    adviceList = ["사랑이 어렵게 느껴질 수 있어요.", "천천히 시작해도 괜찮아요."];
  } else if (score <= 2) {
    type = "🪩 철벽 방어형";
    adviceList = ["상대를 너무 믿지 못하는 건 과거 때문일 수 있어요.", "마음을 열어보세요."];
  } else if (score <= 3) {
    type = "🎯 직진형 연애자";
    adviceList = ["솔직함은 매력이지만, 여유도 중요해요."];
  } else if (score <= 4) {
    type = "💖 따뜻한 리더형";
    adviceList = ["표현하지 않으면 모를 수 있어요.", "마음을 나눠보세요."];
  } else if (score <= 5) {
    type = "🌿 자유로운 영혼형";
    adviceList = ["자유롭지만 책임감 있는 연애!", "상대에게도 자유를 주세요."];
  } else {
    type = "🔥 감정 폭발형";
    adviceList = ["감정 표현도 좋지만, 천천히 생각해봐요."];
  }

  const randomAdvice = adviceList[Math.floor(Math.random() * adviceList.length)];
  document.getElementById("quiz").innerHTML = `
    <div id="adsense-bottom" style="display: block;"><div class="ad-placeholder">📢 여기에 광고가 들어올 예정입니다</div></div>

    <div class="result-card">
      <h2>${userName}님은<br>"${type}"입니다!</h2>
      <p>💬 ${randomAdvice}</p>
      <button id="restartBtn" onclick="restartQuiz()">🔁 다시 하기</button>
    </div>
  `;
  document.getElementById("quiz").style.display = "block";
}


function restartQuiz() {
  current = 0;
  answers = [];
  document.getElementById("quiz").innerHTML = `
    <div id="adsense-bottom" style="display: block;"><div class="ad-placeholder">📢 여기에 광고가 들어올 예정입니다</div></div>

    <h2 id="question"></h2>
    <div id="options"></div>
  `;
  document.getElementById("quiz").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
  increaseCountAndSave();
}

document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("username");
  if (localStorage.getItem("love-test-username")) {
    input.value = localStorage.getItem("love-test-username");
    userName = input.value;
  }
});
