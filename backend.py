from flask import Flask, render_template, jsonify
import threading
import time
import random

app = Flask(__name__)

status_fumaca = "Carregando..."
arduino_conectado = False

# 🔌 Tentar conectar com Arduino
try:
    import serial
    arduino = serial.Serial('COM3', 9600, timeout=1)
    arduino_conectado = True
    print("✅ Arduino conectado!")
except:
    print("⚠️ Arduino não encontrado, iniciando simulação...")

# 🔥 Função que roda com Arduino
def ler_arduino():
    global status_fumaca
    while True:
        if arduino.in_waiting > 0:
            dado = arduino.readline().decode().strip()

            if dado == "FUMACA":
                status_fumaca = "🚨 Fumaça detectada!"
            elif dado == "NORMAL":
                status_fumaca = "✅ Ambiente normal"

# 🎲 Função de simulação
def simular_sensor():
    global status_fumaca
    while True:
        valor = random.randint(0, 1)

        if valor == 1:
            status_fumaca = "🚨 Fumaça detectada!"
        else:
            status_fumaca = "✅ Ambiente normal"

        time.sleep(3)

# 🚀 Iniciar thread correta
if arduino_conectado:
    thread = threading.Thread(target=ler_arduino)
else:
    thread = threading.Thread(target=simular_sensor)

thread.daemon = True
thread.start()

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/status")
def status():
    return jsonify({"status": status_fumaca})

app.run(debug=True)