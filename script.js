function displayTrainingPriority() {
    const fatigueFactor = calculateFatigueFactor();
    console.log("fatigueFactor", fatigueFactor);
    const goal300mTime = calculateGoal300mTime(fatigueFactor);
    console.log("goal300mTime", goal300mTime);
    const trainingPriority = getTrainingPriority(fatigueFactor);
    console.log("trainingPriority", trainingPriority);

    document.getElementById("priority").innerHTML = "Training Priority: " + trainingPriority;
    document.getElementById("goal-300m-time").innerHTML = "Goal 300m Time: " + formatTime(goal300mTime);
    document.getElementById("fatigue-factor").innerHTML = "Fatigue Factor: " + fatigueFactor + "%";
}

function calculateFatigueFactor() {
  const time300m = document.getElementById("test300m").value;
  const time1_5Mile = document.getElementById("test1_5mile").value;

  const time300mInSeconds = convertTimeToSeconds(time300m);
  const time1_5MileInSeconds = convertTimeToSeconds(time1_5Mile);

  const fatigueFactor =
    ((Math.log(time1_5MileInSeconds) - Math.log(time300mInSeconds)) /
      Math.log(1609.34 / 300)) *
    100;

  return fatigueFactor.toFixed(2);
}

function displayTrainingPriority() {
    const fatigueFactor = calculateFatigueFactor();
    const goal300mTime = calculateGoal300mTime(fatigueFactor);
    const trainingPriority = getTrainingPriority(fatigueFactor);

    document.getElementById("priority").innerHTML = "Training Priority: " + trainingPriority;
    document.getElementById("goal-300m-time").innerHTML = "Goal 300m Time: " + formatTime(goal300mTime);
    document.getElementById("fatigue-factor").innerHTML = "Fatigue Factor: " + fatigueFactor + "%";
}

function calculateGoal300mTime(fatigueFactor) {
  const twoPointFiveMilesInMeters = 4023.36;
  const threeHundredMetersInMeters = 300;

  const time1_5MileInSeconds = convertTimeToSeconds(
    document.getElementById("test1_5mile").value
  );

  const goal300mTimeInSeconds =
    time1_5MileInSeconds *
    Math.pow(threeHundredMetersInMeters / (1609 * 1.5), fatigueFactor + 1);

  return goal300mTimeInSeconds;
}

function getTrainingPriority(fatigueFactor) {
  const threshold = 0.01;

  if (fatigueFactor >= threshold) {
    return "Endurance";
  } else {
    return "Speed";
  }
}

function formatTime(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = (timeInSeconds - minutes * 60).toFixed(1);
  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

document
  .getElementById("calculate-button")
  .addEventListener("click", displayTrainingPriority);
