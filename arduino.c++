const int smokeSensorPin = A0;
const int ledPin = 13;        
const int buzzerPin = 9;      
const int smokeThreshold = 300;  

void setup() {
  pinMode(ledPin, OUTPUT);
  pinMode(buzzerPin, OUTPUT);
  pinMode(smokeSensorPin, INPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorValue = analogRead(smokeSensorPin);

  if (sensorValue > smokeThreshold) {
    digitalWrite(ledPin, HIGH);
    digitalWrite(buzzerPin, HIGH);

    Serial.println("FUMACA"); // 🔥 sinal simples
  } else {
    digitalWrite(ledPin, LOW);    
    digitalWrite(buzzerPin, LOW); 

    Serial.println("NORMAL");
  }

  delay(1000); 
}