from flask import Flask, request, jsonify, render_template 
import numpy as np
import os
import tensorflow as tf
from tensorflow.keras.models import load_model # type: ignore
import re
from flask_cors import CORS

os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'
print(CORS)

app = Flask(__name__) 
CORS(app)  # Enable CORS for all routes

# Load your model 
model = load_model('sqli_xss_detection_model.h5')

# Define the alphabet and symbol set
alphabet = " abcdefghijklmnopqrstuvwxyz0123456789-,;.!?:'\"/\\|_@#$%^&*~`+-=<>()[]{}"
symbol = " -,;.!?:'\"/\\|_@#$%^&*~`+-=<>()[]{}"

# Define the class labels
class_labels = ['SQL Injection', 'Cross-Site Scripting (XSS)', 'Normal']

# Function to remove comments from the text
def remove_comment(text):
    text = re.sub('//.*?\n|/\*.*?\*/', '', text, flags=re.S)
    text = text.split('--')[0] + "--"
    if '\'' in text:
        removeTarget = text.split('\'')[0]
        text = text.replace(removeTarget, "")
    return text

# Function to convert text to character indices
def data2char_index(X, max_len, is_remove_comment=False):
    result = []
    for data in X:
        mat = []
        if is_remove_comment:
            data = remove_comment(data)
        for ch in data:
            ch = ch.lower()
            if ch in alphabet:
                mat.append(alphabet.index(ch))
        result.append(mat)
    X_char = tf.keras.preprocessing.sequence.pad_sequences(np.array(result, dtype=object), padding='post', truncating='post', maxlen=max_len)
    return X_char

# Function to convert text to symbol tags
def data_to_symbol_tag(X, max_len, is_remove_comment=False):
    result = []
    for data in X:
        mat = []
        if is_remove_comment:
            data = remove_comment(data)
        for ch in data:
            ch = ch.lower()
            if ch not in symbol:
                mat.append(0)
            else:
                mat.append(symbol.index(ch))
        result.append(mat)
    X_char = tf.keras.preprocessing.sequence.pad_sequences(np.array(result, dtype=object), padding='post', truncating='post', maxlen=max_len)
    return X_char

@app.route('/api/v1')
def index():
    welcome_msg = "Welcome to SQLI-XSS Detection API"
    # return render_template('index.html')
    return welcome_msg

@app.route('/api/v1/predict-sqli-xss', methods=['POST'])
def predict():
    data = request.json
    text = data.get('query')
    
    if not text:
        return jsonify({'error': 'No text provided'}), 400
    
    max_len = 1000  # Set this to the same value used during training
    
    # Preprocess the input text
    char_indices = data2char_index([text], max_len, is_remove_comment=True)
    symbol_tags = data_to_symbol_tag([text], max_len, is_remove_comment=True)
    
    # Make a prediction
    prediction = model.predict([char_indices, symbol_tags])
    
    # Convert to a list 
    prediction = prediction.tolist() 
    
    # Map each probability to the corresponding class
    class_probabilities = {class_labels[i]: prediction[0][i] for i in range(len(class_labels))}
    
    # Determine the class with the highest probability
    predicted_class_index = np.argmax(prediction[0])
    predicted_class = class_labels[predicted_class_index]
    
    return jsonify({'prediction': class_probabilities, 'predicted_class': predicted_class}) 
    
if __name__ == '__main__':
    app.run(debug=True)
