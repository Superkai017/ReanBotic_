import { CourseLevel, LearningModule, LessonContent, Achievement, ProjectCard, UserState } from './types';

export const INITIAL_USER: UserState = {
  name: 'Oudom Art',
  email: 'oudomart@gmail.com',
  xp: 120,
  gems: 350,
  streak: 5,
  hearts: 5,
  level: 1,
  educationLevel: null, // Set during path-selection
  completedLessons: [],
  completedProjects: [],
  unlockedLevels: [1],
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'ach-1',
    title: 'Wildfire',
    description: 'Maintain a 3-day learning streak',
    icon: '🔥',
    xpRequired: 100,
    isUnlocked: true,
    rewardGems: 50,
  },
  {
    id: 'ach-2',
    title: 'Scholar',
    description: 'Complete 3 lessons with perfect scores',
    icon: '📚',
    xpRequired: 300,
    isUnlocked: false,
    rewardGems: 100,
  },
  {
    id: 'ach-3',
    title: 'Hardware Hero',
    description: 'Successfully test a wire in the Circuit Simulator',
    icon: '⚡',
    xpRequired: 500,
    isUnlocked: false,
    rewardGems: 150,
  },
  {
    id: 'ach-4',
    title: 'Champion',
    description: 'Accumulate 1,000 total Study XP',
    icon: '🏆',
    xpRequired: 1000,
    isUnlocked: false,
    rewardGems: 300,
  },
];

export const COURSE_LEVELS: CourseLevel[] = [
  {
    id: 1,
    title: 'Electronics & Arduino Fundamentals',
    description: 'Master resistors, LEDs, circuits, and your very first microcontroller scripts.',
    difficulty: 'Beginner',
    estTime: '4 hrs',
    xpReward: 500,
    isUnlocked: true,
    modulesCount: 4,
  },
  {
    id: 2,
    title: 'Arduino Sensors & Projects',
    description: 'Connect ultrasonic sensors, temperature probes, and servos to build smart gadgets.',
    difficulty: 'Beginner',
    estTime: '6 hrs',
    xpReward: 800,
    isUnlocked: false,
    modulesCount: 5,
  },
  {
    id: 3,
    title: 'ESP32 & IoT Networks',
    description: 'Bridge hardware and cloud. Set up wireless servers, send data over WiFi, and build IoT dashboards.',
    difficulty: 'Intermediate',
    estTime: '8 hrs',
    xpReward: 1200,
    isUnlocked: false,
    modulesCount: 6,
  },
  {
    id: 4,
    title: 'Raspberry Pi Single-Board Computing',
    description: 'Dive into Linux terminal, GPIO control with Python, and run full server software on raw boards.',
    difficulty: 'Intermediate',
    estTime: '10 hrs',
    xpReward: 1500,
    isUnlocked: false,
    modulesCount: 6,
  },
  {
    id: 5,
    title: 'Computer Vision & AI Robotics',
    description: 'Integrate cameras with OpenCV. Track objects, read traffic signs, and detect gestures in real-time.',
    difficulty: 'Advanced',
    estTime: '12 hrs',
    xpReward: 2000,
    isUnlocked: false,
    modulesCount: 8,
  },
  {
    id: 6,
    title: 'ROS2 Framework Basics',
    description: 'Learn the industrial standard Robot Operating System. Master nodes, topics, services, and simulation.',
    difficulty: 'Advanced',
    estTime: '15 hrs',
    xpReward: 2500,
    isUnlocked: false,
    modulesCount: 10,
  },
  {
    id: 7,
    title: 'Autonomous Mobile Robots (AMR)',
    description: 'Build LiDAR navigation, SLAM mapping, and path planning on differential drive physical simulation.',
    difficulty: 'Advanced',
    estTime: '20 hrs',
    xpReward: 3000,
    isUnlocked: false,
    modulesCount: 12,
  },
];

export const LEVEL_1_MODULES: LearningModule[] = [
  {
    id: 'mod-components',
    levelId: 1,
    title: 'Electronic Components',
    description: 'Learn to use and safely wire basic components like LEDs and resistors.',
    difficulty: 'Easy',
    estTime: '45 mins',
    progress: 0,
    lessonsCount: 2,
    isCompleted: false,
  },
  {
    id: 'mod-electricity',
    levelId: 1,
    title: 'Electricity & Ohm\'s Law',
    description: 'Grasp the invisible forces: voltage, current, resistance, and the law that ties them.',
    difficulty: 'Easy',
    estTime: '50 mins',
    progress: 0,
    lessonsCount: 1,
    isCompleted: false,
  },
  {
    id: 'mod-arduino',
    levelId: 1,
    title: 'Arduino Uno Hardware',
    description: 'Get familiar with pins, power rails, microcontrollers, and standard breadboards.',
    difficulty: 'Medium',
    estTime: '1 hr',
    progress: 0,
    lessonsCount: 1,
    isCompleted: false,
  },
  {
    id: 'mod-programming',
    levelId: 1,
    title: 'C++ Programming Basics',
    description: 'Write your first loops, set pins to output, and program custom hardware blinking.',
    difficulty: 'Medium',
    estTime: '1 hr 15m',
    progress: 0,
    lessonsCount: 1,
    isCompleted: false,
  },
];

export const LESSONS: LessonContent[] = [
  {
    id: 'les-led',
    moduleId: 'mod-components',
    title: 'The Light-Emitting Diode (LED)',
    conceptTitle: 'What is an LED?',
    introduction: 'The Light Emitting Diode (LED) is the gateway to hardware hacking! It acts as a digital indicator, converting electricity into bright light.',
    whatIsIt: 'An LED is a specialized semiconductor diode that glows when current passes through. Crucially, it has polarity, meaning electricity can only flow in one direction: from the long leg (+, Anode) to the short leg (-, Cathode).',
    whyUseIt: 'LEDs are highly energy efficient, emit very little heat, and last for decades. They are used in screens, traffic lights, and status indicators in almost every appliance.',
    howItWorks: 'When voltage pushes electrons across the p-n junction inside the LED, they drop into a lower energy state and release energy as light photons. The color of light is determined by the semiconductor materials used.',
    realWorldApp: 'Automotive headlamps, TV displays, emergency lighting, and smartphone flashlights.',
    commonMistakes: '1. Connecting it backwards (it won\'t light up!).\n2. Connecting it directly to a 5V source without a resistor (it will instantly draw too much current and burn out, sometimes popping!).',
    visualType: 'led',
    quiz: {
      id: 'quiz-led',
      type: 'multiple-choice',
      prompt: 'Which leg of the LED is positive and what is its official name?',
      options: [
        'The shorter leg, called the Cathode (-)',
        'The longer leg, called the Anode (+)',
        'The longer leg, called the Cathode (-)',
        'The shorter leg, called the Anode (+)',
      ],
      correctAnswer: 'The longer leg, called the Anode (+)',
      hint: 'Think: A+ (Anode is positive) and C- (Cathode is negative). The positive leg has the larger physical structure/length.',
      explanation: 'The longer leg is the Anode (+) and must connect toward the positive voltage source, while the shorter leg is the Cathode (-) which connects to ground.',
    },
  },
  {
    id: 'les-resistor',
    moduleId: 'mod-components',
    title: 'The Resistor',
    conceptTitle: 'Limiting Electrical Current',
    introduction: 'A resistor is the bodyguard of your circuit! It resists and slows down the flow of electrons to protect delicate parts.',
    whatIsIt: 'A resistor is a passive two-terminal component that introduces electrical resistance. It acts exactly like a narrow neck in a water pipe, restricting the rate of water flow.',
    whyUseIt: 'Without a resistor in series, components like LEDs will pull maximum current from your power supply and immediately destroy themselves. Resistors keep currents in safe bounds.',
    howItWorks: 'Resistors convert electrical energy into tiny amounts of heat. Their strength is measured in Ohms (Ω). Since resistors are tiny, their resistance value is written using a universal system of colored bands.',
    realWorldApp: 'Dimmer switches (potentiometers), heating coils, and electronic volume sliders.',
    commonMistakes: 'Choosing a resistor with too little resistance (the LED burns out) or too much resistance (the LED gets no current and remains completely dark).',
    visualType: 'resistor',
    quiz: {
      id: 'quiz-resistor',
      type: 'fill-blank',
      prompt: 'A resistor\'s strength is measured in ________, represented by the Greek letter Ω.',
      options: ['Ohms', 'Volts', 'Amperes', 'Watts'],
      correctAnswer: 'Ohms',
      hint: 'Named after German physicist Georg Simon Ohm, who formulated the relationship between voltage and current.',
      explanation: 'Resistance is measured in Ohms (Ω). Standard microcontroller pins supply 5V, so protecting a standard red LED requires a resistor of about 220 to 330 Ohms.',
    },
  },
  {
    id: 'les-ohms-law',
    moduleId: 'mod-electricity',
    title: 'Ohm\'s Law Formula',
    conceptTitle: 'The Triad of Electricity',
    introduction: 'Ohm\'s Law is the most famous equation in electronics. It connects Voltage, Current, and Resistance into a single elegant relationship.',
    whatIsIt: 'Ohm\'s Law states that the current (I) flowing through a circuit is directly proportional to the voltage (V) pushed across it, and inversely proportional to the resistance (R) resisting it.',
    whyUseIt: 'You use it constantly to calculate exactly what resistor to use! If you have 5V, and your LED wants 2V at 15mA, you use Ohm\'s Law to find: R = (5V - 2V) / 0.015A = 200 Ohms!',
    howItWorks: 'The formula is written as V = I × R (Voltage = Current × Resistance). You can rearrange it as I = V/R or R = V/I depending on what you want to calculate.',
    realWorldApp: 'Sizing fuses in household breaker boxes, building phone chargers, and configuring power regulators.',
    commonMistakes: 'Confusing Amperes (A) with milliamperes (mA). 20mA is 0.02A! Failing to convert milliamperes to Amperes in the math yields answers that are 1000x too small.',
    visualType: 'voltage',
    quiz: {
      id: 'quiz-ohms-law',
      type: 'word-arrangement',
      prompt: 'Arrange the tokens to form the standard Ohm\'s Law equation:',
      options: ['=', 'Voltage', 'Current', '×', 'Resistance'],
      correctAnswer: ['Voltage', '=', 'Current', '×', 'Resistance'],
      hint: 'The electrical push (force) equals the rate of flow multiplied by the restriction.',
      explanation: 'V = I × R (Voltage = Current × Resistance). This simple formula is the foundation of all electrical analysis.',
    },
  },
  {
    id: 'les-arduino-hw',
    moduleId: 'mod-arduino',
    title: 'Arduino Uno Hardware Layout',
    conceptTitle: 'The Microcontroller Board',
    introduction: 'Think of the Arduino Uno as the brain of your robotics projects. It reads sensors, processes logic, and controls physical actuators.',
    whatIsIt: 'The Arduino Uno is a microdevelopment board built around the ATmega328P processor. It breaks out microcontroller pins into female headers, making it quick and easy to wire components.',
    whyUseIt: 'It is highly durable, inexpensive, has massive community support, and provides 14 Digital Input/Output pins along with 6 Analog Input pins.',
    howItWorks: 'You write code on your computer, compile it, and upload it via USB. The board stores the program in flash memory and executes it immediately when powered via USB or a battery.',
    realWorldApp: 'Robot controllers, smart thermostats, 3D printers, and industrial PLC prototypes.',
    commonMistakes: '1. Plugging wires into Digital Pin 0 and 1 while uploading code (these are used for USB serial communication and will block uploads!).\n2. Accidentally creating a short circuit by letting bare positive wires touch the board\'s metallic casing.',
    visualType: 'breadboard',
    quiz: {
      id: 'quiz-arduino-hw',
      type: 'multiple-choice',
      prompt: 'How many Digital Input/Output pins are broken out on a standard Arduino Uno?',
      options: [
        '6 Pins',
        '14 Pins',
        '20 Pins',
        '32 Pins',
      ],
      correctAnswer: '14 Pins',
      hint: 'Numbered from 0 to 13, located along the top header of the board.',
      explanation: 'There are 14 Digital I/O pins (0 through 13). Six of these (3, 5, 6, 9, 10, 11) can also output PWM signals to simulate analog voltages.',
    },
  },
  {
    id: 'les-cpp-basics',
    moduleId: 'mod-programming',
    title: 'The Anatomy of C++ Hardware Code',
    conceptTitle: 'Setup and Loop',
    introduction: 'Arduino uses a simplified dialect of C++. Every single sketch contains two fundamental functions: setup() and loop().',
    whatIsIt: 'The `setup()` function runs exactly once when the Arduino boots. You use it to initialize pins. The `loop()` function runs repeatedly, over and over, as fast as possible, holding your main program logic.',
    whyUseIt: 'This split is ideal for hardware: `setup()` configures physical pins, and `loop()` constantly monitors the world (e.g. reading button states) and responding instantly.',
    howItWorks: 'Inside `setup()`, you write `pinMode(13, OUTPUT)`. Inside `loop()`, you write `digitalWrite(13, HIGH); delay(1000); digitalWrite(13, LOW); delay(1000);` to toggle a pin.',
    realWorldApp: 'Industrial automated machines running safety polling routines, flight control computers reading sensors.',
    commonMistakes: 'Forgetting that `loop()` runs continuously! If you don\'t write a delay, pin states will toggle millions of times per second, making it look half-on instead of blinking.',
    visualType: 'multimeter',
    quiz: {
      id: 'quiz-cpp-basics',
      type: 'true-false',
      prompt: 'True or False: The loop() function runs only once, whereas setup() runs continuously in the background.',
      options: ['True', 'False'],
      correctAnswer: 'False',
      hint: 'Think about the name "loop" - it means to repeat continuously.',
      explanation: 'False! It is the exact opposite. `setup()` runs once at boot to configure the environment, and then `loop()` runs continuously for as long as the Arduino has power.',
    },
  },
];

export const PROJECTS: ProjectCard[] = [
  {
    id: 'proj-blink',
    title: 'LED Blink (The Hello World of Robotics)',
    description: 'Learn the basic structure of hardware control. Program an Arduino pin to toggle an LED on and off in 1-second intervals.',
    difficulty: 'Beginner',
    xp: 150,
    requiredLessons: ['les-led', 'les-cpp-basics'],
    sampleCode: `// Blink Project C++ Sketch
void setup() {
  // Set digital pin 13 as an output
  pinMode(13, OUTPUT);
}

void loop() {
  // Turn the LED on (HIGH voltage level)
  digitalWrite(13, HIGH);
  delay(1000); // Wait for a second
  
  // Turn the LED off by making the voltage LOW
  digitalWrite(13, LOW);
  delay(1000); // Wait for a second
}`,
  },
  {
    id: 'proj-traffic',
    title: '3-Way Traffic Light Controller',
    description: 'Create a timed sequence controller that cycles Red, Yellow, and Green LEDs to simulate a busy street intersection.',
    difficulty: 'Beginner',
    xp: 250,
    requiredLessons: ['les-led', 'les-resistor', 'les-cpp-basics'],
    sampleCode: `// Traffic Light Simulator Sketch
int redPin = 12;
int yellowPin = 11;
int greenPin = 10;

void setup() {
  pinMode(redPin, OUTPUT);
  pinMode(yellowPin, OUTPUT);
  pinMode(greenPin, OUTPUT);
}

void loop() {
  // Red Light (Stop)
  digitalWrite(redPin, HIGH);
  digitalWrite(yellowPin, LOW);
  digitalWrite(greenPin, LOW);
  delay(5000); // 5 seconds
  
  // Green Light (Go)
  digitalWrite(redPin, LOW);
  digitalWrite(yellowPin, LOW);
  digitalWrite(greenPin, HIGH);
  delay(5000); // 5 seconds
  
  // Yellow Light (Slow Down)
  digitalWrite(redPin, LOW);
  digitalWrite(yellowPin, HIGH);
  digitalWrite(greenPin, LOW);
  delay(2000); // 2 seconds
}`,
  },
  {
    id: 'proj-temp',
    title: 'Smart Temperature Alarm System',
    description: 'Connect an analog temperature sensor and sound an active buzzer if temperature thresholds exceed safety parameters.',
    difficulty: 'Intermediate',
    xp: 400,
    requiredLessons: ['les-resistor', 'les-arduino-hw'],
    sampleCode: `// Temp Sensor Alarm
int tempPin = A0;
int buzzerPin = 8;
int safetyThreshold = 150; // Read threshold

void setup() {
  pinMode(buzzerPin, OUTPUT);
  Serial.begin(9600);
}

void loop() {
  int sensorVal = analogRead(tempPin);
  Serial.println(sensorVal);
  
  if (sensorVal > safetyThreshold) {
    // Sound Alarm (rapid toggle)
    digitalWrite(buzzerPin, HIGH);
    delay(100);
    digitalWrite(buzzerPin, LOW);
    delay(100);
  } else {
    digitalWrite(buzzerPin, LOW);
    delay(500);
  }
}`,
  },
  {
    id: 'proj-night',
    title: 'Automatic Night Light (LDR Sensor)',
    description: 'Measure ambient light levels using a Light Dependent Resistor. Automatically fade on a lamp when the room goes dark.',
    difficulty: 'Intermediate',
    xp: 350,
    requiredLessons: ['les-resistor', 'les-arduino-hw'],
    sampleCode: `// Night Light Controller
int ldrPin = A1;
int ledPin = 9; // PWM pin for fading

void setup() {
  pinMode(ledPin, OUTPUT);
}

void loop() {
  int ldrValue = analogRead(ldrPin);
  // LDR yields lower values in darkness
  if (ldrValue < 300) {
    // Map light reading to PWM intensity
    int brightness = map(ldrValue, 0, 300, 255, 0);
    analogWrite(ledPin, brightness);
  } else {
    analogWrite(ledPin, 0); // Day time, turn off
  }
  delay(100);
}`,
  },
  {
    id: 'proj-dice',
    title: 'Interactive Digital Dice (7-Segment)',
    description: 'Design a single button rolled dice. Clicking the button generates a random digit and prints it to a 7-segment display.',
    difficulty: 'Hard',
    xp: 500,
    requiredLessons: ['les-arduino-hw', 'les-cpp-basics'],
    sampleCode: `// Digital 1-6 Dice Roller
int buttonPin = 2;
int segments[] = {3, 4, 5, 6, 7, 8, 9}; // Seven pins for display

void setup() {
  pinMode(buttonPin, INPUT_PULLUP);
  for (int i = 0; i < 7; i++) {
    pinMode(segments[i], OUTPUT);
  }
  randomSeed(analogRead(A5)); // Seed noise
}

void loop() {
  // If button pressed (LOW due to input pullup)
  if (digitalRead(buttonPin) == LOW) {
    int rolledNum = random(1, 7); // Rolled 1 to 6
    displayNum(rolledNum);
    delay(1000); // Settle
  }
}

void displayNum(int num) {
  // Mock logic: pins corresponding to standard 7 segment hex digits
  // Lights up lines corresponding to number rolled
}`,
  },
];

export const MOCK_LEADERBOARD = [
  { rank: 1, name: 'Sokha Rithy', xp: 2850, country: '🇰🇭', avatar: '🦁', isSelf: false },
  { rank: 2, name: 'Elena Petrova', xp: 2420, country: '🇧🇬', avatar: '🦊', isSelf: false },
  { rank: 3, name: 'Yuki Tanaka', xp: 2110, country: '🇯🇵', avatar: '🐼', isSelf: false },
  { rank: 4, name: 'Oudom Art', xp: 120, country: '🇰🇭', avatar: '🎓', isSelf: true }, // Sync with UserState.xp
  { rank: 5, name: 'Carlos Gomez', xp: 1950, country: '🇪🇸', avatar: '🐱', isSelf: false },
  { rank: 6, name: 'Emma Watson', xp: 1840, country: '🇬🇧', avatar: '🐨', isSelf: false },
  { rank: 7, name: 'Arjun Nair', xp: 1720, country: '🇮🇳', avatar: '🐯', isSelf: false },
];
