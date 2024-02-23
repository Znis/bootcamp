document.getElementById('salaryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var yearsOfExperience = parseFloat(document.getElementById('yearsOfExperience').value);
    
    if (!isNaN(yearsOfExperience)) {
      const data = {
        "years_of_experience": yearsOfExperience
      };
      
      fetch('https://bootcamp-03yf.onrender.com/predict-salary/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
      })
      .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
      })
      .then(result => {
          document.getElementById('result').innerHTML = `Predicted Salary: Rs. ${result.salary}`;
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('result').innerHTML = 'An error occurred while processing your request.';
      });
  } else {
      document.getElementById('result').innerHTML = 'Please enter a valid number for years of experience.';
  }
});
      
 
  
