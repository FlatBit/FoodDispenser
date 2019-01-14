import sys
import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM) #number of GPIO

PUL = 24
DIR = 23
ENA = 18

GPIO.setwarnings(False)
GPIO.setup(PUL, GPIO.OUT)
GPIO.setup(DIR, GPIO.OUT)
GPIO.setup(ENA, GPIO.OUT)

quarters = sys.argv[1]

SleepTime = 0.0035 * 4 
stepMul = 4 / 4 * int(quarters)
StepsPerRotation = 200 * stepMul / 4 

GPIO.output(ENA, GPIO.LOW) #Unlock the motor
GPIO.output(DIR, GPIO.HIGH) #Set rotation direction counter-clockwise


print ("Move Backward")
for i in range (int(StepsPerRotation)):
	GPIO.output(PUL, GPIO.HIGH)
	time.sleep(SleepTime)
	GPIO.output(PUL, GPIO.LOW)
	time.sleep(SleepTime)
	print ("Moving : " + str(i)) 

print ("Revolution Completed\n")

GPIO.output(ENA, GPIO.LOW)

#print ("Move Forward")
#GPIO.output(DIR, GPIO.LOW) #Set rotation direction clockwise

#for i in range (StepsPerRotation):
#	GPIO.output(PUL, GPIO.HIGH)
#	time.sleep(SleepTime)
#	GPIO.output(PUL, GPIO.LOW)
#	time.sleep(SleepTime)
#	print ("Moving : " + str(i))

#print ("Revolution Completed\n")

print ("FINISH\n\n")
#time.sleep(1)
