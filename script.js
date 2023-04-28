function timeToSeconds(time) {
		  const parts = time.split(":");
		  const minutes = parseInt(parts[0]);
		  const seconds = parseFloat(parts[1]);
		  return minutes * 60 + seconds;
		}

		document.addEventListener("DOMContentLoaded", function() {
			const calculateButton = document.getElementById("calculate");
			const errorDiv = document.getElementById("error");
			const resultDiv = document.getElementById("result");
			const priorityDiv = document.getElementById("priority");

			calculateButton.addEventListener("click", () => {
			  const test300m = document.getElementById("test300m").value;
			  const test1_5mile = document.getElementById("test1_5mile").value;

			  if (test300m === "" || test1_5mile === "") {
			    errorDiv.textContent = "Please enter both test times.";
			    resultDiv.textContent = "";
			    priorityDiv.textContent = "";
			  } else {
			    errorDiv.textContent = "";

			    const test300mSeconds = timeToSeconds(test300m);
			    const test1_5mileSeconds = timeToSeconds(test1_5mile);

			  const fatigueFactor =
(Math.log(test1_5mileSeconds / test300mSeconds) / Math.log(300 / (1609 * 1.5))) / 100;


			    resultDiv.textContent =
			      "Fatigue Factor: " + (fatigueFactor * 100).toFixed(2) + "%";

			    if (fatigueFactor < 0.20) {
			      priorityDiv.textContent = "Training Priority: Speed";
			    } else if (fatigueFactor > 0.21) {
			      priorityDiv.textContent = "Training Priority: Endurance";
			    } else {
			      priorityDiv.textContent = "Training Priority: Balanced";
			    }
			  }
			});
		});
