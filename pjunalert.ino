int tonepin = 12;
int alertpin = 11;
int normpin = 10;

void setup() {
  pinMode(alertpin, OUTPUT);
  pinMode(normpin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  if (Serial.available() > 0) {
    char value = Serial.read();
    if (value == 'p') {
      digitalWrite(alertpin, HIGH);
      digitalWrite(normpin, LOW);
      megalovania();
    }
    else {
      digitalWrite(alertpin, LOW);
      digitalWrite(normpin, HIGH);
      delay(3000);
    }
  }
}

void play(int note, int mil) {
  tone(tonepin, note, mil);
  delay(mil);
  return;
}

void megalovania() {
  play(523, 100);
  delay(10);
  play(523, 100);
  play(1047, 200);
  play(784, 400);
  play(740, 200);
  play(698, 200);
  play(622, 200);
  play(523, 100);
  play(622, 100);
  play(698, 100);
  delay(1290);
}
