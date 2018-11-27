# needed modules will be imported
import RPi.GPIO as GPIO
import time
import datetime
  
# Tell GPIO library to use GPIO references
GPIO.setmode(GPIO.BCM)

print "Setup GPIO pin as input"

# Set Switch GPIO as input
GPIO.setup(26 , GPIO.IN)

def sensorCallback1(channel):
# Called if sensor output goes LOW
    timestamp = time.time()
    stamp = datetime.datetime.fromtimestamp(timestamp).strftime('%H:%M:%S')
    print "Sensor LOW " + stamp

def sensorCallback2(channel):
# Called if sensor output goes HIGH
    timestamp = time.time()
    stamp = datetime.datetime.fromtimestamp(timestamp).strftime('%H:%M:%S')
    print "Sensor HIGH " + stamp

def main():
# Wrap main content in a try block so we can
# catch the user pressing CTRL-C and run the
# GPIO cleanup function. This will also prevent
# the user seeing lots of unnecessary error
# messages.

    GPIO.add_event_detect(26, GPIO.FALLING, callback=sensorCallback1)
   # GPIO.add_event_detect(26, GPIO.RISING, callback=sensorCallback2)

main()

try:
# Loop until users quits with CTRL-C
    while True :
        time.sleep(0.1)
        

except KeyboardInterrupt:
# Reset GPIO settings
    GPIO.cleanup()