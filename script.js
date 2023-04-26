const calculateButton = document.getElementById("calculate");

calculateButton.addEventListener("click", () => {
  const test300m = document.getElementById("test300m").value;
  const test1_5mile = document.getElementById("test1_5mile").value;

  if (test300m === "" || test1_5mile === "") {
    document.getElementById("error").textContent =
      "Please enter both test times.";
    document.getElementById("result").textContent = "";
  } else {
    document.getElementById("error").textContent = "";

    const test300mSeconds = timeToSeconds(test300m);
    const test1_5mileSeconds = timeToSeconds(test1_5mile);

    const fatigueFactor =
      ((test1_5mileSeconds - test300mSeconds) / test300mSeconds) * 100;

    document.getElementById("result").textContent =
      "Fatigue Factor: " + fatigueFactor.toFixed(1) + "%";
  }
});

function timeToSeconds(time) {
  const parts = time.split(":");
  const minutes = parseInt(parts[0]);
  const seconds = parseFloat(parts[1]);
  return minutes * 60 + seconds;
}

