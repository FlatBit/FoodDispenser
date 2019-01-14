# needed modules will be imported
import RPi.GPIO as GPIO
import time
import datetime
  
# Tell GPIO library to use GPIO references
GPIO.setmode(GPIO.BCM)

# Motor pins:
PUL = 24
DIR = 23
ENA = 18

# Magnetic sensor pin:
MAG = 26

# Set Switch GPIO as output (Motor)
GPIO.setup(PUL, GPIO.OUT)
GPIO.setup(DIR, GPIO.OUT)
GPIO.setup(ENA, GPIO.OUT)

# Set Switch GPIO as input (Magnetic Sensor)
GPIO.setup(MAG , GPIO.IN)

# Unlock the motor
GPIO.output(ENA, GPIO.LOW)
# Set rotation direction counter-clockwise
GPIO.output(DIR, GPIO.HIGH) 

# 200 steps 1 second:
# 1 step = 2 sleeping times
# step time = 1s / 200 
# sleep time: timePerQuarter / stepPerQuarter / 2

SleepTime = 0.01
stepMul = 1
StepsPerRotation = 200 * stepMul

Spinning = True

def sensorCallback1(channel):
# Called if sensor output goes LOW
    global Spinning
    #timestamp = time.time()
    #stamp = datetime.datetime.fromtimestamp(timestamp).strftime('%H:%M:%S')
    #print ("Sensor LOW " + stamp)
    print ("Starting Position Found")
    Spinning = False

def sensorCallback2(channel):
# Called if sensor output goes HIGH
    global Spinning
    timestamp = time.time()
    stamp = datetime.datetime.fromtimestamp(timestamp).strftime('%H:%M:%S')
    print ("Sensor HIGH " + stamp)
    Spinning = False

def main():
# Wrap main content in a try block so we can
# catch the user pressing CTRL-C and run the
# GPIO cleanup function. This will also prevent
# the user seeing lots of unnecessary error
# messages.

    GPIO.add_event_detect(MAG, GPIO.FALLING, callback=sensorCallback1)
   # GPIO.add_event_detect(MAG, GPIO.RISING, callback=sensorCallback2)

main()

try:
# Loop until users quits with CTRL-C
    while Spinning :
        GPIO.output(PUL, GPIO.HIGH)
        time.sleep(SleepTime)
        GPIO.output(PUL, GPIO.LOW)
        time.sleep(SleepTime)
  


except KeyboardInterrupt:
# Reset GPIO settings
    GPIO.cleanup()

time.sleep(1)
print("Spinning 1 quarter to properly set-up")
i = 0
while i < 50 :
    i+=1
    GPIO.output(PUL, GPIO.HIGH)
    time.sleep(SleepTime)
    GPIO.output(PUL, GPIO.LOW)
    time.sleep(SleepTime)

GPIO.output(ENA, GPIO.HIGH)
GPIO.cleanup()