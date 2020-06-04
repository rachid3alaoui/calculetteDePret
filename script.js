// Listen for submit

document.getElementById('loan-form').addEventListener('submit', (e) => {
  calculateResults();
  e.preventDefault();
});

function calculateResults() {
  // console.log('Calculating ..... Please wait!');
  // Getting UI elements values
  const loanAmount = document.getElementById('loanAmount');
  const effectiveRate = document.getElementById('effectiveRate');
  const duration = document.getElementById('duration');
  checkFields([loanAmount, effectiveRate, duration]);
}

// Checking fields function
function checkFields(inputsArray) {
  if (
    inputsArray[0].value === '' ||
    inputsArray[1].value === '' ||
    inputsArray[2].value === ''
  ) {
    // Create div message
    const errorMessage = document.createElement('div');
    // Add classname
    errorMessage.className = 'alert alert-danger text-center';
    // Add textNode and append it to the div
    errorMessage.appendChild(
      document.createTextNode('Veuillez remplir tous les champs.')
    );
    // Get elements
    const card = document.querySelector('.card');
    const form = document.querySelector('#loan-form');
    // Insert errorMessage div
    card.insertBefore(errorMessage, form);
    setTimeout(clearError, 3000);
  } else {
    // Parsing string from inputs
    const parseLoanAmount = parseFloat(loanAmount.value);
    const parseEffRate = parseFloat(effectiveRate.value) / 100;
    const parseDuration = parseInt(parseFloat(duration.value));

    // Formula
    const power = -parseDuration;
    const base = 1 + parseEffRate / 12;

    const result =
      (parseLoanAmount * (parseEffRate / 12)) / (1 - Math.pow(base, power));
    showLoadingImg();
    setTimeout(function () {
      const results = document.querySelector('#results');
      const m = result.toFixed(2);
      const resultInput = document.querySelector('#resultInput');
      document.querySelector('#loading').style.display = 'none';
      resultInput.value = m;
      results.style.display = 'block';
    }, 2000);
  }
}

function showLoadingImg() {
  document.querySelector('#loading').style.display = 'block';
}

// Clearing error function
function clearError() {
  document.querySelector('.alert').remove();
}
