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

# 800 steps 6 second:
# 1 step = 2 sleeping times
# step time = 6s / 800 
# sleep time: revolution time / step per revolution / 2

SleepTime = 0.00375
stepMul = 4
StepsPerRotation = 200 * stepMul

Spinning = True

def sensorCallback1(channel):
# Called if sensor output goes LOW
    global Spinning
    print ("Starting Position Found")
    Spinning = False

def sensorCallback2(channel):
# Called if sensor output goes HIGH
    global Spinning
    print ("Starting Position Found")
    Spinning = False

def main():
    GPIO.add_event_detect(MAG, GPIO.FALLING, callback=sensorCallback1)
   # GPIO.add_event_detect(MAG, GPIO.RISING, callback=sensorCallback2)

main()

try:
    while Spinning :
        GPIO.output(PUL, GPIO.HIGH)
        time.sleep(SleepTime)
        GPIO.output(PUL, GPIO.LOW)
        time.sleep(SleepTime)
  


except KeyboardInterrupt:
# Reset GPIO settings if user interupt with CTL-C
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