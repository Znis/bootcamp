document.getElementById('salaryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var yearsOfExperience = parseFloat(document.getElementById('yearsOfExperience').value);
    if (!isNaN(yearsOfExperience)) {
      var predictedSalary =  predictSalary(yearsOfExperience);
      document.getElementById('result').innerHTML = `Predicted Salary: Rs. ${predictedSalary.toFixed(2)}`;
    } else {
      document.getElementById('result').innerHTML = 'Please enter a valid number for years of experience.';
    }
  });
  
  function predictSalary(yearsOfExperience) {
   var result = 0.0;
        fetch('https://bootcamp-03yf.onrender.com/predict-salary/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ years_of_experience: yearsOfExperience })
        })
        .then(response => response.json())
        .then(data => {
            result = data.salary
        })
        .catch(error => console.error('Error:', error));
    return result
  }
  
