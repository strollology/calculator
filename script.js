// This is the content of script.js file

function calculateFatigueFactor() {
    const time300m = document.getElementById("test300m").value;
    const time1_5Mile = document.getElementById("test1_5mile").value;

    const time300mInSeconds = convertTimeToSeconds(time300m);
    const time1_5MileInSeconds = convertTimeToSeconds(time1_5Mile);

    const fatigueFactor = ((Math.log(time1_5MileInSeconds) - Math.log(time300mInSeconds)) / Math.log(1609.34 / 300)) * 100;

    return fatigueFactor.toFixed(2);
}

function displayTrainingPriority() {
    const fatigueFactor = calculateFatigueFactor();
    const goal300mTime = calculateGoal300mTime(fatigueFactor);

    const trainingPriority = getTrainingPriority(fatigueFactor);

    document.getElementById("priority").innerHTML = "Training Priority: " + trainingPriority;
    document.getElementById("goal-300m-time").innerHTML = "Goal 300m Time: " + formatTime(goal300mTime);
}

function calculateGoal300mTime(fatigueFactor) {
    const twoPointFiveMilesInMeters = 4023.36;
    const threeHundredMetersInMeters = 300;

    const time1_5MileInSeconds = convertTimeToSeconds(document.getElementById("test1_5mile").value);

    const goal300mTimeInSeconds = time1_5MileInSeconds * Math.pow(threeHundredMetersInMeters / (1609 * 1.5), fatigueFactor + 1);

    return goal300mTimeInSeconds;
}

function displayTrainingPriority() {
    const fatigueFactor = calculateFatigueFactor();
    const goal300mTime = calculateGoal300mTime(fatigueFactor);

    const trainingPriority = getTrainingPriority(fatigueFactor);

    document.getElementById("priority").innerHTML = "Training Priority: " + trainingPriority;
    document.getElementById("goal-300m-time").innerHTML = "Goal 300m Time: " + formatTime(goal300mTime);
    document.getElementById("fatigue-factor").innerHTML = "Fatigue Factor: " + fatigueFactor.toFixed(2) + "%";
}


function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = (timeInSeconds - minutes * 60).toFixed(1);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}

function convertTimeToSeconds(timeString) {
    const [minutes, seconds] = timeString.split(":");
    return parseInt(minutes) * 60 + parseFloat(seconds);
}

document.getElementById("calculate-button").addEventListener("click", displayTrainingPriority);
