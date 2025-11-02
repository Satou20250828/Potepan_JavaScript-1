$(document).ready(function () {
  const timerDOM = $("#timer");

  let timerId = null;
  let startTime = null;        // 計測開始または再開時刻
  let elapsedBefore = 0;       // 停止までに経過したミリ秒（再開時に加算）

  const setButtonState = (start, stop, reset) => {
    $("#startButton").prop("disabled", !start);
    $("#stopButton").prop("disabled", !stop);
    $("#resetButton").prop("disabled", !reset);
  };

  const format = (num, length = 2) => num.toString().padStart(length, '0');

  // 経過ミリ秒から「00:00:00.00」形式を生成
  function formatFromElapsed(elapsedMs) {
    const totalSeconds = Math.floor(elapsedMs / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const hundredths = Math.floor((elapsedMs % 1000) / 10); // 0〜99（小数点第2位）

    return `${format(hours)}:${format(minutes)}:${format(seconds)}.${format(hundredths)}`;
  }

  function updateTimerFromNow() {
    const now = Date.now();
    const elapsed = (now - startTime) + elapsedBefore;
    timerDOM.text(formatFromElapsed(elapsed));
  }

  // スタート
  $("#startButton").click(function () {
    if (timerId === null) {
      startTime = Date.now();
      timerId = setInterval(updateTimerFromNow, 10); // 0.01秒ごとに更新
      setButtonState(false, true, true);
    }
  });

  // ストップ
  $("#stopButton").click(function () {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
      elapsedBefore += Date.now() - startTime;
      startTime = null;
      setButtonState(true, false, true);
    }
  });

  // リセット
  $("#resetButton").click(function () {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
    startTime = null;
    elapsedBefore = 0;
    timerDOM.text("00:00:00.00");
    setButtonState(true, false, false);
  });

  // 初期状態
  timerDOM.text("00:00:00.00");
  setButtonState(true, false, false);
});
