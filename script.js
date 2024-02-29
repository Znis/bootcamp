document.getElementById('salaryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    var yearsOfExperience = parseFloat(document.getElementById('yearsOfExperience').value);
    
    if (!isNaN(yearsOfExperience)) {
    document.getElementById('predictButton').disabled = true;
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
            const temp = parseFloat(result.salary)
            const numberParts = temp.toFixed(2).toString().split('.');
            const formattedIntegerPart = numberParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            const formattedNumber = 'Rs. ' + formattedIntegerPart + '.' + numberParts[1];
          document.getElementById('note').style.display = 'none';
          document.getElementById('result').innerHTML = `Predicted Salary per Month: <b> ${formattedNumber} </b>`;
      })
      .catch(error => {
          console.error('Error:', error);
          document.getElementById('result').innerHTML = 'An error occurred while processing your request.';
      }) 
        .finally(() => {
                document.getElementById('predictButton').disabled = false;
            });
  } else {
      document.getElementById('result').innerHTML = 'Please enter a valid number for years of experience.';
  }
});
      
 
  
