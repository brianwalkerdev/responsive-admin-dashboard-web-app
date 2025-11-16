// Create alert banner

const alertBanner = document.getElementById("alert");
// create the html for the banner
alertBanner.innerHTML = `
<div class="alert-banner">
  <p><strong>Alert:</strong> You have <strong>6</strong> overdue tasks to complete</p>
  <p class="alert-banner-close">x</p>
</div>
`;

alertBanner.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("alert-banner-close")) {
    alertBanner.style.display = "none";
  }
});

// Line Graph

// Check if Chart.js is loaded
if (typeof Chart !== 'undefined') {
  const trafficData = {
    labels: [
      "16-22",
      "23-29",
      "30-5",
      "6-12",
      "13-19",
      "20-26",
      "27-3",
      "4-10",
      "11-17",
      "18-24",
      "25-31",
    ],
    datasets: [
      {
        data: [750, 1250, 1000, 2000, 1500, 1750, 1250, 1850, 2250, 1500, 2500],
        backgroundColor: "#4D4C72",
        borderWidth: 5,
        borderColor: "#4D4C72",
      },
    ],
  };

  const trafficOptions = {
    maintainAspectRatio: false,
    animation: {
      duration: 1000,
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  const trafficCanvas = document.getElementById("traffic-chart");
  if (trafficCanvas) {
    new Chart(trafficCanvas.getContext("2d"), {
      type: "line",
      data: trafficData,
      options: trafficOptions,
    });
  }
}

// Bar Graph

if (typeof Chart !== 'undefined') {
  const dailyCanvas = document.getElementById("daily-chart");

  const dailyData = {
    labels: ["S", "M", "T", "W", "T", "F", "S"],
    datasets: [
      {
        label: "Daily Hits",
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: "#7477BF",
        borderWidth: 1,
        borderColor: "#4D4C72",
      },
    ],
  };

  const dailyOptions = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  if (dailyCanvas) {
    const dailyChart = new Chart(dailyCanvas.getContext("2d"), {
      type: "bar",
      data: dailyData,
      options: dailyOptions,
    });
  }
}

// Doughnut Chart

if (typeof Chart !== 'undefined') {
  const mobileCanvas = document.getElementById("doughnut-chart");

  const mobileData = {
    labels: ["Phones", "Tablets", "Desktop"],
    datasets: [
      {
        label: "Mobile Users",
        data: [2000, 550, 500],
        backgroundColor: ["#D5D6EC", "#7477BF", "#4D4C72"],
        borderWidth: 1,
        borderColor: "#4D4C72",
      },
    ],
  };

  const mobileOptions = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "right",
        labels: {
          boxWidth: 20,
          fontStyle: "bold",
        },
      },
    },
  };

  if (mobileCanvas) {
    const mobileChart = new Chart(mobileCanvas.getContext("2d"), {
      type: "doughnut",
      data: mobileData,
      options: mobileOptions,
    });
  }
}

// Messaging Section

const user = document.getElementById("userField");
const message = document.getElementById("messageField");
const send = document.getElementById("send");

send.addEventListener("click", (e) => {
  e.preventDefault();
  
  // Trim whitespace from inputs
  const userValue = user.value.trim();
  const messageValue = message.value.trim();
  
  // ensure user and message fields are filled out
  if (userValue === "" && messageValue === "") {
    alert("Please fill out user and message fields before sending");
  } else if (userValue === "") {
    alert("Please fill out user field before sending");
  } else if (messageValue === "") {
    alert("Please fill out message field before sending");
  } else {
    alert(`Message successfully sent to: ${userValue}`);
    // Clear form after successful send
    user.value = "";
    message.value = "";
  }
});

// Sticky Navbar

// When the user scrolls the page, execute myFunction
window.onscroll = function () {
  myFunction();
};

// Get the navbar
const navbar = document.querySelector(".navigation");

// Get the offset position of the navbar
const sticky = navbar.offsetTop;

// Add the sticky class to the navbar when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.pageYOffset >= sticky) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
}
