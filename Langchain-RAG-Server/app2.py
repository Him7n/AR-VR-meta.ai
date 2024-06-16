import pyttsx3
text_speech = pyttsx3.init()

answer=input("what do want to convert")

def sayyy(answer):
  text_speech.say(answer) 
  text_speech.runAndWait()

sayyy(answer)