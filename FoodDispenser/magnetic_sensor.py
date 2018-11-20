import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM) #number of GPIO

SENSOR = 4

GPIO.setup(SENSOR, GPIO.IN)