// Get the reference to required elements
let loanAmountInput = document.querySelector(".loan-amount");
let interestRateInput = document.querySelector(".interest-rate");
let loanPeriodInput = document.querySelector(".duration");

let monthlyPremiumValue = document.querySelector(".monthly-premium .value");
let totalInterestValue = document.querySelector(".total-interest-payable .value");
let totalAmountValue = document.querySelector(".total-amount-payable .value");

let calculateBtn = document.querySelector(".calculate-btn");

// Convert all the input to float values
let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanPeriod = parseFloat(loanPeriodInput.value);

// Arrive at monthly interest rate
let interest = interestRate / 12 / 100;

// Create a variable for the chart
let myChart;

// Funtion to validate input
let checkValues = () => {
    let loanAmountValue = loanAmountInput.value;
    let interestRateValue = interestRateInput.value;
    let loanPeriodValue = loanPeriodInput.value;

    // Regualar expression for number value input from 0 to 9
    let regexNumber = /^[0-9]+$/;

    // Validation expression - loan amount input
    if (!loanAmountValue.match(regexNumber)) {
        alert(`You entered ${loanAmountInput.value} as LOAN AMOUNT. It shall be a number (e.g.: 10000). Kindly recheck & enter!`);
    }
    // Validation expression - duration input
    if (!loanPeriodValue.match(regexNumber)) {
        alert(`You entered ${loanPeriodInput.value} as LOAN PERIOD. It shall be a number (e.g.: 12). Kindly recheck & enter!`);
    }

    // Regualar expression for decimal value 
    let regexDecimalNumber = /^\d+\.\d+$/;

    // Validation expression - interest rate
    if (!interestRateValue.match(regexDecimalNumber)) {
        alert(`You entered ${interestRateInput.value} as INTEREST RATE. It shall be like, e.g.: 5.00. Kindly recheck & enter!`);
    }

};

// Function to display chart
let displayChart = (totalInterestPayable, loanAmount) => {
    const ctx = document.getElementById('myChart').getContext('2d');
    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ["Total Interest", "Loan Amount"],
            datasets: [{
                data: [totalInterestPayable, loanAmount],
                backgroundColor: ["#0D0D0D", "#0777D9"],

                borderWidth: 0
            }],
        },
    });
};

// Function to update the chart
let updateChart = (totalInterestPayable, loanAmount) => {
    myChart.data.datasets[0].data[0] = totalInterestPayable;
    myChart.data.datasets[0].data[1] = loanAmount;
    myChart.update();
};
// Call Calculate monthly premium function 
let calculateMonthlyPremium = () => {

    // Call check value function
    checkValues();

    // call refresh value function
    refreshInputValues();

    // Calculate monthly premium 
    let monthlyPremium = loanAmount * interest * (Math.pow(1 + interest, loanPeriod) / (Math.pow(1 + interest, loanPeriod) - 1));

    return monthlyPremium;
};

// Update html results section
let updateData = (monthlyPremium) => {
    monthlyPremiumValue.innerHTML = Math.round(monthlyPremium);

    let totalAmountPayable = Math.round(loanPeriod * monthlyPremium);
    totalAmountValue.innerHTML = totalAmountPayable;

    let totalInterestPayable = Math.round(totalAmountPayable - loanAmount);
    totalInterestValue.innerHTML = totalInterestPayable;

    // Call update chart function
    if (myChart) {
        updateChart(totalInterestPayable, loanAmount);
    } else {
        // Call diplay chart function
        displayChart(totalInterestPayable, loanAmount);
    }
};

// Refresh input values
let refreshInputValues = () => {
    loanAmount = parseFloat(loanAmountInput.value);
    interestRate = parseFloat(interestRateInput.value);
    loanPeriod = parseFloat(loanPeriodInput.value);
    interest = interestRate / 12 / 100;
};

// Call for monthly premium function
let init = () => {
    let monthlyPremium = calculateMonthlyPremium();
    updateData(monthlyPremium);
};

init();

// Add event listner to calculate button
calculateBtn.addEventListener("click", init);