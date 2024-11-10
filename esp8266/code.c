#include <ESP8266WiFi.h>
#include <ESP8266WebServer.h>

// Network credentials
const char* ssid = "hello";
const char* password = "password";

// Define server on port 80
ESP8266WebServer server(80);

// Segment and button pin definitions
const int segmentPins[] = {5, 4, 10, 12, 13, 15, 16}; // a, b, c, d, e, f, g

const bool digitPatterns[10][7] = {
  {1, 1, 1, 1, 1, 1, 0}, // 0
  {0, 1, 1, 0, 0, 0, 0}, // 1
  {1, 1, 0, 1, 1, 0, 1}, // 2
  {1, 1, 1, 1, 0, 0, 1}, // 3
  {0, 1, 1, 0, 0, 1, 1}, // 4
  {1, 0, 1, 1, 0, 1, 1}, // 5
  {1, 0, 1, 1, 1, 1, 1}, // 6
  {1, 1, 1, 0, 0, 0, 0}, // 7
  {1, 1, 1, 1, 1, 1, 1}, // 8
  {1, 1, 1, 1, 0, 1, 1}  // 9
};

const int buttonPin = 14;
bool counting = true;
int counter = 0;

void setup() {
  Serial.begin(9600);
  Serial.println("Connecting to WiFi...");

  // Initialize WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nConnected to WiFi");
  Serial.print("IP Address: ");
  Serial.println(WiFi.localIP()); // Display IP on Serial Monitor

  // Initialize segment pins
  for (int i = 0; i < 7; i++) {
    pinMode(segmentPins[i], OUTPUT);
  }

  // Initialize button pin
  pinMode(buttonPin, INPUT_PULLUP);

  // Define web server endpoints
  server.on("/", handleRoot);
  server.on("/getDigit", HTTP_GET, handleGetDigit);
  server.on("/getIP", HTTP_GET, handleGetIP); // New endpoint to get IP address
  server.begin();
  Serial.println("HTTP server started");
}

void loop() {
  // Handle client requests
  server.handleClient();
  
  // Update display only if counting is true and button pressed
  if (digitalRead(buttonPin) == LOW && counting) {
    counter = random(0, 10); // Generate a random digit
    displayDigit(counter); // Display it on 7-segment
    delay(100); 
  }
  else {
    counting = false;
  }
}

// Function to display a digit on the 7-segment display
void displayDigit(int digit) {
  for (int i = 0; i < 7; i++) {
    digitalWrite(segmentPins[i], digitPatterns[digit][i]);
  }
}

// Handle root path
void handleRoot() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/plain", "ESP8266 Server");
}

// Handle /getDigit request to fetch the current displayed digit
void handleGetDigit() {
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/plain", String(counter));
}

// New function to handle /getIP request to fetch the IP address
void handleGetIP() {
  String ipAddress = WiFi.localIP().toString(); // Convert IP to string
  server.sendHeader("Access-Control-Allow-Origin", "*");
  server.send(200, "text/plain", ipAddress);
}
