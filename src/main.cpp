#include <esp-fs-webserver.h>   // https://github.com/cotestatnt/esp-fs-webserver

#include <FS.h>
#include <LittleFS.h>
#include <PString.h>

#define FILESYSTEM LittleFS

#ifndef LED_BUILTIN
#define LED_BUILTIN 2
#endif

#define BTN_SAVE  5

// Test "options" values
uint8_t ledPin = LED_BUILTIN;
bool inputpullup;
//uint32_t longVar = 1234567890;
float floatVar = 15.5F;
String stringVar = "Test option String";

// Var labels (in /setup webpage)
#define LED_LABEL "The LED pin number"
#define INPUT_MODE "Input pullup"
#define TIMEOUT_LABEL "Timeout (millisec.)"
#define FLOAT_LABEL "A float variable"
#define STRING_LABEL "A String variable"

// Timezone definition to get properly time from NTP server
#define MYTZ "CET-1CEST,M3.5.0,M10.5.0/3"
struct tm Time;

#ifdef ESP8266
ESP8266WebServer server(80);
#elif defined(ESP32)
WebServer server(80);
#endif

FSWebServer myWebServer(FILESYSTEM, server);


static const char save_btn_htm[] PROGMEM = R"EOF(
<div class="btn-bar">
  <a class="btn" onclick="reload();">Ricarica le opzioni</a>
</div>
)EOF";

static const char button_script[] PROGMEM = R"EOF(
function reload() {
  console.log('Ricarica dei parametri di configurazione');
  fetch('/reload')
  .then((response) => {
    if (response.ok) {
      openModalMessage('Opzioni ricaricate', 'Le opzioni sono sono state ricaricate dal file di configurazione');
      return;
    }
    throw new Error('Something goes wrong with fetch');
  })
  .catch((error) => {
    openModalMessage('Error', 'Something goes wrong with your request');
  });
}
)EOF";

/* Costanti e definizioni per funzioni applicative
*/
#define windSpeedPin 4
//#define windDirPin 3
#define windSpeedINT 0 // INT0
//#define windDirINT 1   // INT1

// Pin 13 has an LED connected on most Arduino boards.
int LED = 13;
volatile uint8_t inputmode;
const unsigned long DEBOUNCE = 10000ul;      // Minimum switch time in microseconds
const unsigned long DIRECTION_OFFSET = 0ul;  // Manual direction offset in degrees, if required
/*const*/ unsigned long TIMEOUT = 1500ul;       // Maximum time allowed between speed pulses in millisec.
const unsigned long UPDATE_RATE = 500ul;     // How often to send out NMEA data in milliseconds
const float filterGain = 0.25;               // Filter gain on direction output filter. Range: 0.0 to 1.0
                                             // 1.0 means no filtering. A smaller number increases the filtering

// Knots is actually stored as (Knots * 100). Deviations below should match these units.
const int BAND_0 =  10 * 100;
const int BAND_1 =  80 * 100;

const int SPEED_DEV_LIMIT_0 =  5 * 100;     // Deviation from last measurement to be valid. Band_0: 0 to 10 knots
const int SPEED_DEV_LIMIT_1 = 10 * 100;     // Deviation from last measurement to be valid. Band_1: 10 to 80 knots
const int SPEED_DEV_LIMIT_2 = 30 * 100;     // Deviation from last measurement to be valid. Band_2: 80+ knots

// Should be larger limits as lower speed, as the direction can change more per speed update
const int DIR_DEV_LIMIT_0 = 25;     // Deviation from last measurement to be valid. Band_0: 0 to 10 knots
const int DIR_DEV_LIMIT_1 = 18;     // Deviation from last measurement to be valid. Band_1: 10 to 80 knots
const int DIR_DEV_LIMIT_2 = 10;     // Deviation from last measurement to be valid. Band_2: 80+ knots

volatile unsigned long speedPulse = 0ul;    // Time capture of speed pulse
volatile unsigned long dirPulse = 0ul;      // Time capture of direction pulse
volatile unsigned long speedTime = 0ul;     // Time between speed pulses (microseconds)
volatile unsigned long directionTime = 0ul; // Time between direction pulses (microseconds)
volatile boolean newData = false;           // New speed pulse received
volatile boolean timeout_expired = false;
volatile unsigned long lastUpdate = 0ul;    // Time of last serial output

volatile int knotsOut = 0;    // Wind speed output in knots * 100
volatile int dirOut = 0;      // Direction output in degrees
volatile boolean ignoreNextReading = false;

boolean debug = false;

hw_timer_t *timeout_timer;

// fine costanti e definizioni per funzioni applicative

////////////////////////////////  Filesystem  /////////////////////////////////////////
void startFilesystem() {
  // FILESYSTEM INIT
  if ( FILESYSTEM.begin()) {
    File root = FILESYSTEM.open("/", "w");
    File file = root.openNextFile();
    while (file) {
      const char* fileName = file.name();
      size_t fileSize = file.size();
      Serial.printf("FS File: %s, size: %lu\n", fileName, (long unsigned)fileSize);
      file = root.openNextFile();
    }
    Serial.println();
  }
  else {
    Serial.println("ERROR on mounting filesystem. It will be formatted!");
    FILESYSTEM.format();
    ESP.restart();
  }
}

/*Funzioni applicative
*/
void IRAM_ATTR readWindSpeed()
{
    // Despite the interrupt being set to FALLING edge, double check the pin is now LOW
    if (((micros() - speedPulse) > DEBOUNCE) && (digitalRead(windSpeedPin) == LOW))
    {
        // Work out time difference between last pulse and now
        speedTime = micros() - speedPulse;
        dirPulse = speedPulse + 100; //Fake fintanto che winddir è calcolata con sine/cosine VDO/Stowe MHU

        // Direction pulse should have occured after the last speed pulse
        if (dirPulse - speedPulse >= 0) directionTime = dirPulse - speedPulse;

        newData = true;
        speedPulse = micros();    // Capture time of the new speed pulse
    }
}

void IRAM_ATTR timerINT ()
{
  timeout_expired = true;
}

boolean checkSpeedDev(long knots, int dev)
{
    if (knots < BAND_0)
    {
        if (abs(dev) < SPEED_DEV_LIMIT_0) return true;
    }
    else if (knots < BAND_1)
    {
        if (abs(dev) < SPEED_DEV_LIMIT_1) return true;
    }
    else
    {
        if (abs(dev) < SPEED_DEV_LIMIT_2) return true;
    }
    return false;
}

void readWindDir()
{
    /*if (((micros() - dirPulse) > DEBOUNCE) && (digitalRead(windDirPin) == LOW))
    {
      dirPulse = micros();        // Capture time of direction pulse
    }*/
  
}

boolean checkDirDev(long knots, int dev)
{
    if (knots < BAND_0)
    {
        if ((abs(dev) < DIR_DEV_LIMIT_0) || (abs(dev) > 360 - DIR_DEV_LIMIT_0)) return true;
    }
    else if (knots < BAND_1)
    {
        if ((abs(dev) < DIR_DEV_LIMIT_1) || (abs(dev) > 360 - DIR_DEV_LIMIT_1)) return true;
    }
    else
    {
        if ((abs(dev) < DIR_DEV_LIMIT_2) || (abs(dev) > 360 - DIR_DEV_LIMIT_2)) return true;
    }
    return false;
}
byte getChecksum(char* str)
{
    byte cs = 0;
    for (unsigned int n = 1; n < strlen(str) - 1; n++)
    {
        cs ^= str[n];
    }
    return cs;
}

/*=== MWV - Wind Speed and Angle ===
 *
 * ------------------------------------------------------------------------------
 *         1   2 3   4 5
 *         |   | |   | |
 *  $--MWV,x.x,a,x.x,a*hh<CR><LF>
 * ------------------------------------------------------------------------------
 *
 * Field Number:
 *
 * 1. Wind Angle, 0 to 360 degrees
 * 2. Reference, R = Relative, T = True
 * 3. Wind Speed
 * 4. Wind Speed Units, K/M/N
 * 5. Status, A = Data Valid
 * 6. Checksum
 *
 */
void printWindNmea()
{
    char windSentence [30];
    float spd = knotsOut / 100.0;
    byte cs;
    //Assemble a sentence of the various parts so that we can calculate the proper checksum

    PString str(windSentence, sizeof(windSentence));
    str.print("$WIMWV,");
    str.print(dirOut);
    str.print(".0,R,");
    str.print(spd);
    str.print(",N,A*");
    //calculate the checksum

    cs = getChecksum(windSentence);
    //bug - arduino prints 0x007 as 7, 0x02B as 2B, so we add it now
    if (cs < 0x10) str.print('0');
    str.print(cs, HEX); // Assemble the final message and send it out the serial port
    Serial.println(windSentence);
}

void calcWindSpeedAndDir()
{
    unsigned long dirPulse_, speedPulse_;
    unsigned long speedTime_;
    unsigned long directionTime_;
    long windDirection = 0l, rps = 0l, knots = 0l;

    static int prevKnots = 0;
    static int prevDir = 0;
    int dev = 0;

    // Get snapshot of data into local variables. Note: an interrupt could trigger here
    noInterrupts();
    dirPulse_ = dirPulse;   // da omettere quando il calcolo sarà per sensore VDO/Stowe MHU
    speedPulse_ = speedPulse;
    speedTime_ = speedTime;
    directionTime_ = directionTime; // da omettere quando il calcolo sarà per sensore VDO/Stowe MHU
    interrupts();

    // Make speed zero, if the pulse delay is too long
    if (micros() - speedPulse_ > TIMEOUT*1000) speedTime_ = 0ul;  // da rivedere se usare un parametro diverso da TIMEOUT

    // The following converts revolutions per 100 seconds (rps) to knots x 100
    // This calculation follows the Peet Bros. piecemeal calibration data
    if (speedTime_ > 0)
    {
        rps = 100000000/speedTime_;                  //revolutions per 100s

        // Formule valide per anemometro Peet-Bros da rivedere per VDO/STOWE MHU
        if (rps < 323)
        {
          knots = (rps * rps * -11)/11507 + (293 * rps)/115 - 12;
        }
        else if (rps < 5436)
        {
          knots = (rps * rps / 2)/11507 + (220 * rps)/115 + 96;
        }
        else
        {
          knots = (rps * rps * 11)/11507 - (957 * rps)/115 + 28664;
        }
        // fine formule Peet-Bros anemometro

        //knots = mph * 0.86897
        //knots = m/s * 1.94384
        //knots = kmh * 0,539957

        if (knots < 0l) knots = 0l;  // Remove the possibility of negative speed
        // Find deviation from previous value
        dev = (int)knots - prevKnots;

        // Only update output if in deviation limit
        if (checkSpeedDev(knots, dev))
        {
          knotsOut = knots;

          // If speed data is ok, then continue with direction data
          if (directionTime_ > speedTime_)
          {
              windDirection = 999;    // For debugging only (not output to knots)
          }
          else
          {
            // Calculate direction from captured pulse times - Valido per Peet-Bros windvane
            // da rivedere per sine/cosine output del sensore VDO/Stowe MHU

            //windDirection = (((directionTime_ * 360) / speedTime_) + DIRECTION_OFFSET) % 360;

            windDirection = random (0,360); // 'fake' casuale per test in attesa d'implementare sine/cosine per VDO/Stowe MHU
          

            // Find deviation from previous value
            dev = (int)windDirection - prevDir;

            // Check deviation is in range
            if (checkDirDev(knots, dev))
            {
              int delta = ((int)windDirection - dirOut);
              if (delta < -180)
              {
                delta = delta + 360;    // Take the shortest path when filtering
              }
              else if (delta > +180)
              {
                delta = delta - 360;
              }
              // Perform filtering to smooth the direction output
              dirOut = (dirOut + (int)(round(filterGain * delta))) % 360;
              if (dirOut < 0) dirOut = dirOut + 360;
            }
            prevDir = windDirection;
          }
        }
        else
        {
          ignoreNextReading = true;
        }

        prevKnots = knots;    // Update, even if outside deviation limit, cause it might be valid!?
    }
    else
    {
        knotsOut = 0;
        prevKnots = 0;
    }

    if (debug)
    {
        Serial.print(millis());
        Serial.print(",");
        Serial.print(dirOut);
        Serial.print(",");
        Serial.print(windDirection);
        Serial.print(",");
        Serial.println(knotsOut/100);
        //Serial.print(",");
        //Serial.print(knots/100);
        //Serial.print(",");
        //Serial.println(rps);
    }
    else
    {
      if (millis() - lastUpdate > UPDATE_RATE)
      {
        printWindNmea();
        lastUpdate = millis();
      }
    }
}
////////////////////  Load application options from filesystem  ////////////////////
template <typename T>
inline void printOption (const char *label, const char *frm, T var )
{
  String etichetta;
  etichetta= String(label) + String(frm);
  const char *formato = etichetta.c_str();
  Serial.printf(formato, var);
}
bool loadOptions() {
  //using std::string;
  String etichetta;
  if (FILESYSTEM.exists("/config.json")) {
    myWebServer.getOptionValue(LED_LABEL, ledPin);
    myWebServer.getOptionValue(INPUT_MODE, inputpullup);
    myWebServer.getOptionValue(TIMEOUT_LABEL, TIMEOUT); //stored in millisec. used in microsec.
    myWebServer.getOptionValue(FLOAT_LABEL, floatVar);
    myWebServer.getOptionValue(STRING_LABEL, stringVar);

    Serial.println();
    printOption ( LED_LABEL, ": %d\n", ledPin);
    printOption ( INPUT_MODE, ": %s\n", (inputpullup ? "true" : "false"));
    printOption ( TIMEOUT_LABEL, ": %d\n", TIMEOUT);
    printOption ( FLOAT_LABEL, ": %6.1f\n", floatVar);
    printOption ( STRING_LABEL, ": %s\n", stringVar.c_str());
    return true;
  }
  else
    //inputpullup = true;
    Serial.println(F("File \"config.json\" not exist"));
  return false;
}

void saveOptions() {
  myWebServer.saveOptionValue(LED_LABEL, ledPin);
  myWebServer.saveOptionValue(INPUT_MODE, inputpullup);
  //TIMEOUT /= 1000; //stored in millisec. used in microsec.
  myWebServer.saveOptionValue(TIMEOUT_LABEL, TIMEOUT);
  myWebServer.saveOptionValue(FLOAT_LABEL, floatVar);
  myWebServer.saveOptionValue(STRING_LABEL, stringVar);
  Serial.println(F("Application options saved."));
}

////////////////////////////  HTTP Request Handlers  ////////////////////////////////////
void handleLoadOptions() {
  WebServerClass* webRequest = myWebServer.getRequest();
  loadOptions();
  Serial.println(F("Application option loaded after web request"));
  webRequest->send(200, "text/plain", "Optzioni caricate");
}


void setup() {
  
  Serial.begin(115200, SERIAL_8N1);
  pinMode(BTN_SAVE, INPUT_PULLUP);
  pinMode(LED_BUILTIN, OUTPUT);

  // FILESYSTEM INIT
  startFilesystem();

  // Try to connect to stored SSID, start AP if fails after timeout
  IPAddress myIP = myWebServer.startWiFi(15000, "ESP8266_AP", "123456789" );

  // Load configuration (if not present, default will be created when webserver will start)
  if (loadOptions())
    Serial.println(F("Application option loaded"));
  else
    Serial.println(F("Application options NOT loaded!"));

  // Add custom page handlers to webserver
  myWebServer.addHandler("/reload", HTTP_GET, handleLoadOptions);

  // Configure /setup page and start Web Server
  myWebServer.addOptionBox("Opzioni");
  myWebServer.addOption(LED_LABEL, ledPin);
  myWebServer.addOption(TIMEOUT_LABEL, TIMEOUT);
  myWebServer.addOption(FLOAT_LABEL, floatVar, 0.0, 100.0, 0.01);
  myWebServer.addOption(STRING_LABEL, stringVar);
  myWebServer.addOption(INPUT_MODE, inputpullup);
  myWebServer.addOption("raw-html-button", save_btn_htm);
  myWebServer.addJavascript(button_script);

  if (myWebServer.begin()) {
    Serial.print(F("ESP Web Server started on IP Address: "));
    Serial.println(myIP);
    Serial.println(F("Open /setup page to configure optional parameters"));
    Serial.println(F("Open /edit page to view and edit files"));
    Serial.println(F("Open /update page to upload firmware and filesystem updates"));
  }

  // setup funzioni applicative
  if (inputpullup) 
  {
    inputmode = INPUT_PULLUP;
  }
  else 
  {
    inputmode = INPUT;
  }
  pinMode(LED, OUTPUT);
  randomSeed (millis()); //serve solo per la 'finta' direzione del vento (casuale)
  //Serial.begin(115200, SERIAL_8N1); // provvisorio per output su console 
                                    //da portare a 38400 0 4800 quando sarà utilizzata seriale definitiva
  //Serial.println(VERSION);
  Serial.print("Direction Filter: ");
  Serial.println(filterGain);
  pinMode(windSpeedPin, inputmode);
  attachInterrupt(windSpeedPin, readWindSpeed, FALLING);
  /*pinMode(windDirPin, INPUT);
  attachInterrupt(windDirINT, readWindDir, FALLING); non serve per sensore sine/cosine VDO/Stowe MHU - per Peet-Bros*/
  timeout_timer = timerBegin(0, 80, true);
  timerAttachInterrupt(timeout_timer, &timerINT, true);
  timerAlarmWrite(timeout_timer, TIMEOUT*1000, true);  //TIMEOUT stored in millisec. used in microsec.
  //interrupts();
  timerAlarmEnable(timeout_timer);
  interrupts();
  // Fine setup funzioni applicative
}


void loop() {
  myWebServer.run();   // webserver in ascolto nell'inner loop

  // sezione void loop per funzioni applicative
  // int i;
  // const unsigned int LOOP_DELAY = 50;
  // const unsigned int LOOP_TIME = TIMEOUT / LOOP_DELAY;
  if (timeout_expired) {

    digitalWrite(LED, !digitalRead(LED));    // Toggle LED
    timeout_expired = false;
    calcWindSpeedAndDir();    // only print NMEA if rate expired
  }
  else {
    if (newData) {
      calcWindSpeedAndDir();    // Process new data
      newData = false;
    }
  }
  // i = 0;
  // If there is new data, process it, otherwise wait for LOOP_TIME to pass
  // while ((newData != true) && (i < LOOP_TIME))
  // {
  //  i++;
  //  delayMicroseconds(LOOP_DELAY);
    
  // }

  // calcWindSpeedAndDir();    // Process new data
  // newData = false;

  if (! digitalRead(BTN_SAVE)) {
    digitalWrite(LED_BUILTIN,HIGH);
    saveOptions();
    delay(1000);
    digitalWrite(LED_BUILTIN,LOW);
  }
}