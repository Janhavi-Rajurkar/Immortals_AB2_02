from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

app = Flask(__name__)

# Configure Gemini API
genai.configure(api_key="Your_API_Key")

def generate_ui(prompt):
    model = genai.GenerativeModel("gemini-pro")  # Use an appropriate Gemini model
    generation_config = {"temperature": 0.9, "top_p": 1, "top_k": 1, "max_output_tokens": 2048}
    model = genai.GenerativeModel("gemini-1.5-flash", generation_config=generation_config)

    response = model.generate_content(f"Generate an  lengthy HTML and advanced CSS UI for: {prompt}. Make sure you give internal css in style tag and dont give me any instructions only give me code")
    return response.text  # Extract text from response

@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        prompt = request.form['prompt']
        ui_code = generate_ui(prompt)
        return jsonify({'code': ui_code})
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
