// Get the reference to required elements
let loanAmountInput = document.querySelector(".loan-amount");
let interestRateInput = document.querySelector(".interest-rate");
let loanPeriodInput = document.querySelector(".duration");

let monthlyPremiumValue = document.querySelector(".monthly-premium .value");
let totalInterestValue = document.querySelector(".total-interest-payble .value");
let totalAmountValue = document.querySelector("total-amount-payble .value");

let calculateBtn = document.querySelector("calculate-btn");

// Convert all the input to float values
let loanAmount = parseFloat(loanAmountInput.value);
let interestRate = parseFloat(interestRateInput.value);
let loanPeriod = parseFloat(loanPeriodInput.value);

// Arrive at monthly interest rate
let interest = interestRate / 12 / 100;

// Calculate monthly premium 
let calculateMonthlyPremium = () => {
    let monthlyPremium = loanAmount * interest * (Math.pow(1 + interest, loanPeriod) / (Math.pow(1 + interest, loanPeriod) - 1));

    return monthlyPremium;
};

// Update html results section
let updateData = (monthlyPremium) => {
    monthlyPremiumValue.innerHTML = Math.round(monthlyPremium);

    let totalAmountPayble = Math.round(loanPeriod * monthlyPremium);
    totalAmountValue.innerHTML = totalAmountPayble;

    let totalInterestPayble = Math.round(totalAmountPayble - loanAmount);
    totalInterestValue.innerHTML = totalInterestPayble;
};

// Call for monthly premium function
let init = () => {
    let monthlyPremium = calculateMonthlyPremium();
    updateData(monthlyPremium);
};

init();