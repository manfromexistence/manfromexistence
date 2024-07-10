import pyttsx3 
Assistant=pyttsx3.init("sapi5")
voices=Assistant.getProperty("voices")
print("voices")
Assistant.setProperty("voices",voices[0].id)






def Speak(audio):
    print(" ")
    Assistant.say(audio)
    print(" ")
    Assistant.runAndWait()
    
    
Speak("Hello Sir,How are you")    