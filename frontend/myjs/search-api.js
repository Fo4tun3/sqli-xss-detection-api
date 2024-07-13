// const input_text = "select * from users"
// fetch('http://127.0.0.1:5000/predict', {
//     method: 'POST',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify({
//         text: input_text
//     }),
// })
// .then(response => response.json())
// .then(data => {
//     console.log('Prediction:', data.prediction);
// })
// .catch((error) => {
//     console.error('Error:', error);
// });


document.getElementById('detectionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const inputText = document.getElementById('inputText').value;
    
    fetch('http://127.0.0.1:5000/api/v1/predict-sqli-xss', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputText }),
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        
        resultDiv.innerHTML = `
            <h2>Prediction Result</h2>
            <h5><strong>SQL Injection:</strong> ${data.prediction['SQL Injection']}</h5>
            <h5><strong>Cross-Site Scripting (XSS):</strong> ${data.prediction['Cross-Site Scripting (XSS)']}</h5>
            <h5><strong>Normal:</strong> ${data.prediction['Normal']}</h5>
            <h5><strong>Predicted Class:</strong> ${data.predicted_class}</h5>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});