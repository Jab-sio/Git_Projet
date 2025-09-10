from flask import Flask, render_template, request, jsonify
import ollama

app = Flask(__name__)

# Initialisation du client Ollama
client = ollama.Client(host='http://127.0.0.1:11434')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/gallery')
def gallery():
    return render_template('gallery.html')

@app.route('/generate', methods=['POST'])
def generate():
    data = request.get_json()
    prompt = data.get('prompt')

    try:
        # Appel à l'IA avec le prompt
        response = client.chat(model='llama3', messages=[
            {
                'role': 'user',
                'content': f"Écris une histoire courte de 10 à 20 lignes sur le thème : {prompt}",
            },
        ])
        story = response['message']['content']
    except Exception as e:
        story = f"Erreur de communication avec l'IA : {e}"

    return jsonify({'story': story})

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)