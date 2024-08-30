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
    
    fetch('http://127.0.0.1:8080/api/v1/predict-sqli-xss', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: inputText }),
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        // const resultInput = document.getElementById('resultInput');
        
        const sql = data.prediction['SQL Injection'];
        const xss = data.prediction['Cross-Site Scripting (XSS)'];
        const nom = data.prediction['Normal'];

        let largestNumber = Math.max(sql, xss, nom);
        let predictedPercent = (largestNumber * 100).toFixed(3) + '%';
        
        // if (data.predicted_class == 'Normal') {
        //     resultInput.style.backgroundColor = 'green';
        // }

        resultDiv.innerHTML = `
            <h2>Prediction Result</h2>

            <div class="new_predict_result">
                <div>
                    <label for="predicted_class" style="font-weight: bold;">Predicted Class:
                        <input id= "resultInput" class="resultInput" type="text" disabled value="${data.predicted_class}">
                    </label>
                </div>
                <div>
                    <label for="predicted_percentage" style="font-weight: bold;">Prediction Percent:
                        <input id= "resultInput" class="resultInput" type="text" disabled value="${predictedPercent}">
                    </label>
                </div>
            </div>
            <!-- <h5><strong>SQL Injection:</strong> ${data.prediction['SQL Injection']}</h5>
            <h5><strong>Cross-Site Scripting (XSS):</strong> ${data.prediction['Cross-Site Scripting (XSS)']}</h5>
            <h5><strong>Normal:</strong> ${data.prediction['Normal']}</h5>
            <h5><strong>Predicted Class:</strong> ${data.predicted_class}</h5> --!>
        `;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});