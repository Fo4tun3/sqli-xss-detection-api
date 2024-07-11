from flask import Flask, request, jsonify 
import joblib 
import numpy as np
import pandas as pd
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import OneHotEncoder

app = Flask(__name__) 


# Load the column transformer and the model
column_transformer = joblib.load('column_transformer.pkl')

# Load your model 
model = joblib.load('logistics-reg-sqli-xss-model.pkl')

# # Load the column transformer and set handle_unknown to 'ignore'
# column_transformer = ColumnTransformer(
#     transformers=[
#         ('cat', OneHotEncoder(handle_unknown='ignore'), ['Query'])  # Assuming the first column is categorical
#     ],
#     remainder='passthrough'
# )


@app.route('/api/v1/predict', methods=['POST']) 
def predict(): 
    try:
        data = request.get_json(force=True)
        query = data.get('query')

        # Convert input to DataFrame for processing
        input_data = pd.DataFrame({'Query': [query]})

        # Transform input data using the loaded column transformer
        transformed_data = column_transformer.fit_transform(input_data)

        # Make prediction
        prediction = model.predict(transformed_data)

        print(app.url_map)

        # Return the prediction as JSON
        return jsonify({'prediction': int(prediction[0])})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__': 
    app.run(debug=True) # Run the app in debug mode for development
 