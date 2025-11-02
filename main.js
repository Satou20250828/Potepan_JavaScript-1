$(document).ready(function () {
  const timerDOM = $("#timer");
  let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
  let timerId = null;

  const setButtonState = (start, stop, reset) => {
    $("#startButton").prop("disabled", !start);
    $("#stopButton").prop("disabled", !stop);
    $("#resetButton").prop("disabled", !reset);
  };

  const format = (num, length = 2) => num.toString().padStart(length, '0');

  function updateTimer() {
    timerDOM.text(
      `${format(hours)}:${format(minutes)}:${format(seconds)}.${format(milliseconds)}`
    );
  }

  function time() {
    milliseconds++;
    if (milliseconds >= 10) {
      milliseconds = 0;
      seconds++;
    }
    if (seconds >= 60) {
      seconds = 0;
      minutes++;
    }
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
    updateTimer();
  }

  // スタート
  $("#startButton").click(function () {
    if (timerId === null) {
      timerId = setInterval(time, 100);
      setButtonState(false, true, true);
    }
  });

  // ストップ
  $("#stopButton").click(function () {
    clearInterval(timerId);
    timerId = null;
    setButtonState(true, false, true);
  });

  // リセット
  $("#resetButton").click(function () {
    clearInterval(timerId);
    timerId = null;
    hours = minutes = seconds = milliseconds = 0;
    updateTimer();
    setButtonState(true, false, false);
  });

  updateTimer();
  setButtonState(true, false, false);
});
