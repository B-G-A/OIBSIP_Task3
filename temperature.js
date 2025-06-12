const temperatureInput = document.getElementById('input');
const unitSelect = document.getElementById('unit');
const convertButton = document.getElementById('Button');
const resultDisplay = document.getElementById('resultDisplay'); 
window.onload = function() {
  const savedInput = localStorage.getItem('lastTempInput');
  const savedUnit = localStorage.getItem('lastUnit');
  if (savedInput !== null) temperatureInput.value = savedInput;
  if (savedUnit !== null) unitSelect.value = savedUnit;
};
convertButton.addEventListener('click', function() {
    convertTemperature();
}); 
temperatureInput.addEventListener('keyup', function(event) {
    if (event.key === 'Enter') {
        convertTemperature();
    }
});
function convertTemperature() {
    const inputValue = parseFloat(input.value); 
    const selectedUnit = unitSelect.value;
    if (isNaN(inputValue)) {
        resultDisplay.innerHTML = '<p class="error">Whoops! Please enter a valid number, like "25" or "-10".</p>';
        return; 
    }
    let outputHtml = '';
    if (selectedUnit === 'Celsius') {
        const fahrenheit = (inputValue * 9 / 5) + 32;
        const kelvin = inputValue + 273.15;
        outputHtml = `<p>${fahrenheit.toFixed(2)} &deg;F</p><p>${kelvin.toFixed(2)} K</p>`;
    } else if (selectedUnit === 'Fahrenheit') {
        const celsius = (inputValue - 32) * 5 / 9;
        const kelvin = celsius + 273.15;
        outputHtml = `<p>${celsius.toFixed(2)} &deg;C</p><p>${kelvin.toFixed(2)} K</p>`;
    } else if (selectedUnit === 'Kelvin') {
        if (inputValue < 0) {
            resultDisplay.innerHTML = '<p class="error">Hey! Kelvin temperature cannot be below 0 K (Absolute Zero).</p>';
            return; 
        }
        const celsius = inputValue - 273.15;
        const fahrenheit = (celsius * 9 / 5) + 32;
        outputHtml = `<p>${celsius.toFixed(2)} &deg;C</p><p>${fahrenheit.toFixed(2)} &deg;F</p>`;

    } else {
        outputHtml = '<p class="error">Hmm, something went wrong with unit selection. Please try again.</p>';
    }
    resultDisplay.innerHTML = outputHtml;
    localStorage.setItem('lastTempInput', input.value);
    localStorage.setItem('lastUnit', selectedUnit);
}
