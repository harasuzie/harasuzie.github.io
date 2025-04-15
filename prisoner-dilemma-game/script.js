let crimes = [], currentInterrogation = 0, playerChoices = [], loverChoices = [], totalSentence = 0;
const sfxClick = document.getElementById('sfxClick');
const sfxWin = document.getElementById('sfxWin');
const sfxFail = document.getElementById('sfxFail');
const bgmHorror = document.getElementById('bgmHorror');
const bgmIntro = document.getElementById('bgmIntro');
const sfxType = document.getElementById('sfxType');


let isMuted = false;

function toggleMute() {
    isMuted = !isMuted;
    document.getElementById('muteButton').innerText = isMuted ? '🔇' : '🔈';
  
    const allSounds = [sfxClick, sfxWin, sfxFail, bgmHorror, bgmIntro, sfxHover, sfxType];
    allSounds.forEach(audio => {
      if (audio) audio.muted = isMuted;
    });
  }
  

let typingInterval = null; // 전역 변수

function goToScene(id) {
  document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
  document.getElementById(id).classList.add('active');

  if (typingInterval) {
    clearInterval(typingInterval);
    typingInterval = null;
  }

  if (sfxType) {
    sfxType.pause();
    sfxType.currentTime = 0;
  }

  // 🎵 sceneMorning: 인트로 음악 시작
  if (id === 'sceneMorning' && !isMuted) {
    bgmIntro.currentTime = 0;
    bgmIntro.play();
  }

  // 🧩 sceneDilemmaIntro: 타자기 BGM 재생 + 텍스트 출력
  if (id === 'sceneDilemmaIntro') {
    // 🔇 인트로 음악 정지
    bgmIntro.pause();
    bgmIntro.currentTime = 0;

    // 🔊 타자기 배경음 재생
    if (!isMuted && bgmTyping) {
      bgmTyping.currentTime = 0;
      bgmTyping.play();
    }

    setTimeout(() => {
      const message =
`이제부터 당신은 애인과 따로 심문을 받게 됩니다.\n
자백하면 가벼운 형을 받을 수 있지만,\n
애인의 선택에 따라 결과가 달라집니다.\n
침묵하거나 자백할지… 이제 선택은 당신의 몫입니다.`;

      typeText(message, 'typeTextTarget', () => {
        // 👉 심문 시작 버튼 활성화
        const btn = document.getElementById('startInterrogationBtn');
        if (btn) {
          btn.disabled = false;
          btn.style.display = 'inline-block';
        }

        // 🔇 타자기 BGM 멈춤
        if (bgmTyping) {
          bgmTyping.pause();
          bgmTyping.currentTime = 0;
        }
      });
    }, 100);
  }
}

  
  
  
  
  

  

function selectCrime(crime) {
  if (!isMuted) sfxClick.play();
  crimes.push(crime);
  if (crimes.length === 1) goToScene('sceneLunch');
  else if (crimes.length === 2) goToScene('sceneAfternoon1');
  else if (crimes.length === 3) goToScene('sceneAfternoon2');
  else if (crimes.length === 4) goToScene('scenePolice');
}

function startInterrogation() {
    currentInterrogation = 0;
  
    // ✅ 타자 효과음 멈추기
    if (sfxType) {
      sfxType.pause();
      sfxType.currentTime = 0;
    }
  
    if (!isMuted) {
      bgmIntro.pause(); // 🎵 부드럽게 intro 음악 끄고
      bgmHorror.currentTime = 0;
      bgmHorror.play();
    }
  
    showInterrogation();
  }
  
  

function showInterrogation() {
  const crime = crimes[currentInterrogation];
  const text = getDramaticInterrogationText(crime);
  document.getElementById('crimeTitle').innerText = `${currentInterrogation + 1}. ${crime}`;
  document.getElementById('interrogationText').innerText = text;
  goToScene('sceneInterrogation');
}

function getDramaticInterrogationText(crime) {
  switch (crime) {
    case '계단에서 민다': return '계단에서 밀려 떨어진 집주인은 결국 숨졌습니다.\n애인이 당신을 지목할 수도 있습니다.';
    case '도끼로 친다': return '피는 아직도 바닥에 남아 있습니다.\n애인은 이미 자백했을지도 모릅니다.';
    case '절도': return 'CCTV는 일부만 찍혔습니다.\n애인이 진실을 말하면 당신만 남게 됩니다.';
    case '협박': return '점원은 두려워 떨고 있었습니다.\n당신이 들고 있던 물체는 무엇이었을까요?';
    case '소극적 절도': return '조용히 챙긴 물건들 중 하나가\n추적 장치였을 가능성도 있습니다.';
    case '대담한 절도': return '집 전체를 뒤진 흔적이 뚜렷합니다.\n신고가 들어갔을 수도 있습니다.';
    case '도망': return '아이는 당신의 얼굴을 기억하고 있습니다.\n도망쳤지만 흔적은 남아 있습니다.';
    case '감금': return '아이의 손목에는 줄 자국이 남았습니다.\n애인이 입을 열면 끝입니다.';
    case '유괴': return '아이는 아직 돌아오지 않았습니다.\n당신의 행동이 결정적이었습니다.';
    default: return `${crime}에 대해 자백하시겠습니까?`;
  }
}

function isSevereCrime(crime) {
  return crime.includes('도끼') || crime.includes('강도') || crime.includes('유괴');
}

function choose(choice) {
  if (!isMuted) sfxClick.play();
  const crime = crimes[currentInterrogation];
  const lover = Math.random() < 0.5 ? '자백' : '묵비권';
  playerChoices.push(choice);
  loverChoices.push(lover);

  let playerSentence = 0;
  let loverSentence = 0;

  if (choice === '묵비권' && lover === '묵비권') {
    playerSentence = 1;
    loverSentence = 1;
  } else if (choice === '자백' && lover === '자백') {
    const isHeavy = isSevereCrime(crime);
    playerSentence = isHeavy ? 10 : 5;
    loverSentence = isHeavy ? 10 : 5;
  } else if (choice === '자백' && lover === '묵비권') {
    playerSentence = 0;
    loverSentence = 10;
  } else if (choice === '묵비권' && lover === '자백') {
    playerSentence = 10;
    loverSentence = 0;
  }

  totalSentence += playerSentence;
  currentInterrogation++;

  if (currentInterrogation < crimes.length) {
    showInterrogation();
  } else {
    showResult();
  }
}

function calculateTrustRate(playerChoices, loverChoices) {
  let match = 0;
  for (let i = 0; i < playerChoices.length; i++) {
    if (playerChoices[i] === loverChoices[i]) match++;
  }
  return Math.round((match / playerChoices.length) * 100);
}

function showTrustRate() {
    const rate = calculateTrustRate(playerChoices, loverChoices);
    const trustDisplay = document.getElementById('trustDisplay');
    trustDisplay.innerHTML = `🤖 신뢰도: ${rate}% (당신과 애인의 선택 일치율)`;
  
    // 💬 평가 문구 + 색상
    let trustComment = '';
    let color = '#ccc'; // 기본 회색
  
    if (rate >= 90) {
      trustComment = '❤️ 거의 완벽한 신뢰 관계였습니다.';
      color = '#66ffcc'; // 청록
    } else if (rate >= 70) {
      trustComment = '😊 서로 꽤 믿고 있었습니다.';
      color = '#aaffaa'; // 연두
    } else if (rate >= 50) {
      trustComment = '😐 반은 믿고, 반은 의심했습니다.';
      color = '#ffff99'; // 노랑
    } else if (rate >= 30) {
      trustComment = '😞 신뢰는 거의 없었습니다.';
      color = '#ff9966'; // 주황
    } else {
      trustComment = '💔 완전히 배신당한 관계였습니다.';
      color = '#ff4444'; // 빨강
    }
  
    // 애인 총 형량 계산
    const loverTotal = loverChoices.reduce((acc, choice, i) => {
      const me = playerChoices[i];
      const crime = crimes[i];
      let loverSentence = 0;
  
      if (me === '묵비권' && choice === '묵비권') loverSentence = 1;
      else if (me === '자백' && choice === '자백') loverSentence = isSevereCrime(crime) ? 10 : 5;
      else if (me === '묵비권' && choice === '자백') loverSentence = 0;
      else if (me === '자백' && choice === '묵비권') loverSentence = 10;
  
      return acc + loverSentence;
    }, 0);
  
    // 📊 출력 요소 생성
    const summary = document.createElement('p');
    summary.style.fontSize = '0.9rem';
    summary.style.marginTop = '5px';
    summary.style.color = color;
    summary.innerText = `${trustComment} | 애인의 총 형량: ${loverTotal}년`;
  
    trustDisplay.appendChild(summary);
  }
  

// ✅ 완성된 showResult() 함수 + 엔딩 타이틀 표시 포함
function showResult() {
    if (navigator.vibrate) navigator.vibrate(200);
    bgmHorror.pause();
    goToScene('sceneResult');
  
    const display = document.getElementById('sentenceDisplay');
    const messageBox = document.getElementById('endingMessage');
    const titleEl = document.getElementById('endingTitle');
  
    // 형량 애니메이션
    display.classList.add('highlight');
    let current = 0;
    const timer = setInterval(() => {
      current++;
      display.innerText = totalSentence === 0 ? '석방' : `${current}년`;
      if (current >= totalSentence) clearInterval(timer);
    }, 20);
  
    // 형량표 생성
    let table = `<table><tr><th>사건</th><th>나</th><th>애인</th><th>형량</th></tr>`;
    for (let i = 0; i < crimes.length; i++) {
      const me = playerChoices[i];
      const lover = loverChoices[i];
      const isHeavy = isSevereCrime(crimes[i]);
  
      let playerSentence = 0, loverSentence = 0;
      if (me === '묵비권' && lover === '묵비권') {
        playerSentence = 1;
        loverSentence = 1;
      } else if (me === '자백' && lover === '자백') {
        playerSentence = isHeavy ? 10 : 5;
        loverSentence = isHeavy ? 10 : 5;
      } else if (me === '자백' && lover === '묵비권') {
        playerSentence = 0;
        loverSentence = 10;
      } else if (me === '묵비권' && lover === '자백') {
        playerSentence = 10;
        loverSentence = 0;
      }
  
      table += `<tr><td>${crimes[i]}</td><td>${me}</td><td>${lover}</td><td>${playerSentence}년<br><small>나: ${playerSentence}년 / 애인: ${loverSentence}년</small></td></tr>`;
    }
    table += '</table>';
    document.getElementById('resultTable').innerHTML = table;
  
    // 신뢰도 표시
    showTrustRate();
  
    // 애인의 총 형량 계산
    const loverTotal = loverChoices.reduce((acc, choice, i) => {
      const me = playerChoices[i];
      const crime = crimes[i];
      let loverSentence = 0;
      if (me === '묵비권' && choice === '묵비권') loverSentence = 1;
      else if (me === '자백' && choice === '자백') loverSentence = isSevereCrime(crime) ? 10 : 5;
      else if (me === '묵비권' && choice === '자백') loverSentence = 0;
      else if (me === '자백' && choice === '묵비권') loverSentence = 10;
      return acc + loverSentence;
    }, 0);
  
    // 🎯 엔딩 타이틀 결정
    let endingTitle = '';
    if (totalSentence === 0 && loverTotal >= 10) {
      endingTitle = '🔥 배신 엔딩 - 당신만 살아남았습니다';
    } else if (totalSentence === 0 && loverTotal === 0) {
      endingTitle = '🕊 완벽한 침묵 엔딩 - 둘 다 석방';
    } else if (totalSentence >= 50) {
      endingTitle = '💀 파멸 엔딩 - 모든 것을 잃었습니다';
    } else if (totalSentence <= 1) {
      endingTitle = '🎯 완벽한 엔딩 - 치밀한 전략';
    } else if (totalSentence <= 5) {
      endingTitle = '🧠 전략적 생존 엔딩';
    } else if (loverTotal === 0 && totalSentence >= 10) {
      endingTitle = '🔪 완벽히 배신당한 엔딩';
    } else if (totalSentence >= 10 && loverTotal >= 10) {
      endingTitle = '💥 붕괴 엔딩 - 둘 다 무너졌습니다';
    } else {
      endingTitle = '🌀 혼란스러운 엔딩';
    }
    titleEl.innerText = endingTitle;
  
    // 🎉 엔딩 메시지 구성
    if (totalSentence === 0) {
      if (!isMuted) sfxWin.play();
      if (navigator.vibrate) navigator.vibrate([200, 100, 200]);
      document.body.classList.add('shake');
      setTimeout(() => document.body.classList.remove('shake'), 500);
  
      messageBox.innerHTML = `
        <span style="font-size:2rem; color:#00ff99; animation: pop 0.8s ease-out infinite alternate;">
          🎉 축하합니다! 석방입니다! 🎉
        </span>
        <p style="font-size:0.95rem; color:#ccc; margin-top: 1rem;">
          애인은 총 <strong>${loverTotal}년</strong>의 형량을 받았습니다.
        </p>
        <p style="color:#aaa; font-size: 0.85rem;">
          당신은 살아남았지만, 모두가 행복하진 않았습니다.
        </p>
      `;
      confetti({ particleCount: 200, spread: 120, origin: { y: 0.6 } });
      return;
    }
  
    if (totalSentence <= 5) {
      if (!isMuted) sfxWin.play();
      messageBox.innerHTML = `<span style="font-size:1.2rem; color:#66ffcc;">🎉 가볍게 끝났습니다! 거의 무사 통과!</span>`;
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.6 } });
    } else if (totalSentence >= 50) {
      if (!isMuted) sfxFail.play();
      if (navigator.vibrate) navigator.vibrate([100, 100, 100, 100, 100]);
      document.body.classList.add('flash');
      setTimeout(() => document.body.classList.remove('flash'), 600);
      messageBox.innerHTML = `<span style="font-size:1.4rem; color:#ff4444;">💀 모든 것을 잃었습니다...</span>`;
    } else {
      if (!isMuted) sfxFail.play();
    }
  
    // 감정 요약 메시지
    const diff = totalSentence - loverTotal;
    let relationshipMsg = '';
    if (Math.abs(diff) <= 1) {
      relationshipMsg = '🤝 당신과 애인은 비슷한 선택을 했습니다. 서로를 끝까지 믿었거나, 함께 무너졌습니다.';
    } else if (diff > 5) {
      relationshipMsg = '💔 당신은 침묵했지만, 애인은 자백했습니다. 관계는 돌이킬 수 없게 되었습니다.';
    } else if (diff < -5) {
      relationshipMsg = '🧊 당신은 애인을 배신하고 살았습니다. 자유는 얻었지만, 그 대가는…';
    } else if (totalSentence === 0 && loverTotal === 10) {
      relationshipMsg = '🔥 당신은 완벽히 배신했습니다. 석방은 되었지만, 남은 건 공허함뿐.';
    }
  
    let styleMsg = '';
    if (totalSentence <= 1) {
      styleMsg = '🎯 치밀한 판단으로 완벽한 결과를 얻었습니다.';
    } else if (totalSentence <= 5) {
      styleMsg = '🧠 전략적으로 잘 피해갔습니다. 탁월한 선택이었습니다.';
    } else if (totalSentence >= 50) {
      styleMsg = '😵 결과가 너무 참혹합니다. 다음엔 조금 더 의심해보는 건 어떨까요?';
    } else {
      styleMsg = '🌀 혼란 속에서 당신은 여러 번 흔들렸습니다. 신뢰란 무엇일까요?';
    }
  
    const replayMsg = '🔁 선택을 바꾸면 결과는 달라집니다. 다시 시도해보시겠어요?';
  
    messageBox.innerHTML += `
      <p style="margin-top: 20px;">${relationshipMsg}</p>
      <p>${styleMsg}</p>
      <p style="color:#ccc; font-size: 0.9rem; margin-top:10px;">${replayMsg}</p>
    `;
  }
  

// ✅ 버튼 클릭 시 무조건 효과음 재생 (모든 버튼에 적용)
document.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => {
      if (!isMuted && sfxClick) sfxClick.play();
    });
  });

  const sfxHover = document.getElementById('sfxHover');

// 버튼에 마우스를 올리거나 터치할 때 효과음 재생
document.querySelectorAll('button').forEach(btn => {
  btn.addEventListener('mouseover', () => {
    if (!isMuted && sfxHover) {
      sfxHover.currentTime = 0;
      sfxHover.play();
    }
  });

  btn.addEventListener('touchstart', () => {
    if (!isMuted && sfxHover) {
      sfxHover.currentTime = 0;
      sfxHover.play();
    }
  });
});


function typeText(text, elementId, callback) {
    const el = document.getElementById(elementId);
    el.innerHTML = '';
    let i = 0;
  
    // 👉 버튼 숨기기 (심문 시작 버튼)
    const nextBtn = document.getElementById('startInterrogationBtn');
    if (nextBtn) nextBtn.style.display = 'none';
  
    // 🔁 타이핑 시작
    typingInterval = setInterval(() => {
      const char = text[i];
  
      if (char === '\n') {
        el.innerHTML += '<br>';
      } else {
        el.innerHTML += char;
  
        // 🎵 타자기 소리 재생 (다른 소리와 겹치지 않게 약간 딜레이)
        if (!isMuted && sfxType && char !== ' ' && char !== '\n') {
          setTimeout(() => {
            try {
              sfxType.pause();
              sfxType.currentTime = 0;
              sfxType.play();
            } catch (e) {
              console.warn('타자기 소리 재생 실패:', e);
            }
          }, 50);
        }
      }
  
      i++;
  
      // ✅ 타이핑 완료
      if (i >= text.length) {
        clearInterval(typingInterval);
        typingInterval = null;
  
        // 🎵 소리 정지
        if (sfxType) {
          sfxType.pause();
          sfxType.currentTime = 0;
        }
  
        // 👉 버튼 다시 보이기
        if (nextBtn) nextBtn.style.display = 'inline-block';
  
        if (callback) callback();
      }
    }, 45); // ← 타이핑 속도 조절 (낮을수록 빠름)
  }
  

