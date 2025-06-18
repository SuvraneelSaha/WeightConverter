// Get DOM elements
const calculateBtn = document.getElementById('calculateBtn');
const usernameInput = document.getElementById('username');
const weightInput = document.getElementById('weight');
const heightInput = document.getElementById('height');

// Result display elements
const userNameDisplay = document.getElementById('userName-display');
const weightDisplay = document.getElementById('weight-display');
const heightDisplay = document.getElementById('height-display');
const convertedWeightDisplay = document.getElementById('converted-weight');
const bmiDisplay = document.getElementById('bmi');
const commentDisplay = document.getElementById('comment');
const commentDisplay1 = document.getElementById('comment1');
const resultContent = document.querySelector('.result-content');

// Add event listener to calculate button
calculateBtn.addEventListener('click', calculateBMI);

// Add enter key support for inputs
document.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        calculateBMI();
    }
});

// Main calculation function
function calculateBMI() {
    // Get input values
    const name = usernameInput.value.trim();
    const weight = parseFloat(weightInput.value);
    const height = parseFloat(heightInput.value);
    
    // Validate inputs
    if (!validateInputs(name, weight, height)) {
        return;
    }
    
    // Show loading state
    showLoadingState();
    
    // Simulate calculation delay for better UX
    setTimeout(() => {
        // Perform calculations
        const bmi = calculateBMIValue(weight, height);
        const weightInLbs = convertKgToLbs(weight);
        const category = getBMICategory(bmi);
        
        // Display results
        displayResults(name, weight, height, weightInLbs, bmi, category);
        
        // Hide loading state
        hideLoadingState();
    }, 1500);
}

// Input validation function
function validateInputs(name, weight, height) {
    // Check if name is provided
    if (!name) {
        showError('Please enter your name');
        usernameInput.focus();
        return false;
    }
    
    // Check if weight is valid
    if (!weight || weight <= 0 || weight > 500) {
        showError('Please enter a valid weight (1-500 kg)');
        weightInput.focus();
        return false;
    }
    
    // Check if height is valid
    if (!height || height <= 0 || height > 300) {
        showError('Please enter a valid height (50-300 cm)');
        heightInput.focus();
        return false;
    }
    
    return true;
}

// BMI calculation function
function calculateBMIValue(weight, height) {
    // Convert height from cm to meters
    const heightInMeters = height / 100;
    
    // Calculate BMI: weight(kg) / height(m)²
    const bmi = weight / (heightInMeters * heightInMeters);
    
    // Return BMI rounded to 1 decimal place
    return Math.round(bmi * 10) / 10;
}

// Weight conversion function (kg to lbs)
function convertKgToLbs(weightInKg) {
    // 1 kg = 2.20462 lbs
    const weightInLbs = weightInKg * 2.20462;
    return Math.round(weightInLbs * 10) / 10;
}

// BMI category determination function
function getBMICategory(bmi) {
    if (bmi < 18.5) {
        return {
            category: 'Underweight',
            className: 'underweight',
            description: 'Below normal weight'
        };
    } else if (bmi >= 18.5 && bmi < 25) {
        return {
            category: 'Normal Weight',
            className: 'normal',
            description: 'Healthy weight range'
        };
    } else if (bmi >= 25 && bmi < 30) {
        return {
            category: 'Overweight',
            className: 'overweight',
            description: 'Above normal weight'
        };
    } else {
        return {
            category: 'Obese',
            className: 'obese',
            description: 'Significantly above normal weight'
        };
    }
}

// Display results function
function displayResults(name, weight, height, weightInLbs, bmi, categoryInfo) {
    // Update display elements
    userNameDisplay.textContent = `Name: ${name}`;
    weightDisplay.textContent = `Weight in Kgs: ${weight} kg`;
    heightDisplay.textContent = `Height in Cms: ${height} cm`;
    convertedWeightDisplay.textContent = `Weight in Lbs: ${weightInLbs} lbs`;
    bmiDisplay.textContent = `BMI: ${bmi}`;
    commentDisplay.textContent = `Category: ${categoryInfo.category}`;
    commentDisplay1.textContent= `Comment: ${categoryInfo.description}`;
    
    // Apply category styling -- directly to the html elements 
    commentDisplay.className = categoryInfo.className;
    commentDisplay1.className=categoryInfo.className;
    
    // Show result section with animation
    resultContent.style.display = 'flex';
    resultContent.classList.remove('hidden');
    
    // Add success animation
    resultContent.style.animation = 'slideIn 0.5s ease-out';
}

// Error handling function
function showError(message) {
    // Create or update error message
    let errorDiv = document.querySelector('.error-message');
    
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        document.querySelector('.input-Element').appendChild(errorDiv);
    }
    
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    
    // Hide error after 3 seconds
    setTimeout(() => {
        errorDiv.style.display = 'none';
    }, 3000);
}

// Loading state functions
function showLoadingState() {
    calculateBtn.textContent = 'Calculating...';
    calculateBtn.disabled = true;
    document.body.classList.add('loading');
}

function hideLoadingState() {
    calculateBtn.textContent = 'Calculate BMI';
    calculateBtn.disabled = false;
    document.body.classList.remove('loading');
}

// Input formatting functions
weightInput.addEventListener('input', function() {
    // Ensure only positive numbers
    if (this.value < 0) this.value = 0;
});

heightInput.addEventListener('input', function() {
    // Ensure only positive numbers
    if (this.value < 0) this.value = 0;
});

// Clear results when inputs change
[usernameInput, weightInput, heightInput].forEach(input => {
    input.addEventListener('input', function() {
        // Hide error messages when user starts typing
        const errorDiv = document.querySelector('.error-message');
        if (errorDiv) {
            errorDiv.style.display = 'none';
        }
    });
});

