# import fyp.medlai1
# import fyp.medlai2
# import fyp.medlai3
from PyQt5 import QtCore, QtGui, QtWidgets
from PyQt5.QtGui import QImage, QPalette, QBrush
from PyQt5.QtCore import QSize
from PyQt5.QtGui import QImage, QPalette, QBrush
import os
import sys
# import fyp.musicGenerator
# import PyQt5.QtMultimedia as M
# import pygame
import time
# import musicGeneratorTransformers
import sadGenerator

currentDir = os.path.dirname(os.path.realpath(__file__))

# def play_music(music_file,p):
#     """
#     stream music with mixer.music module in blocking manner
#     this will stream the sound from disk while playing
#     """
#     if(p==0):
#
#         clock = pygame.time.Clock()
#         try:
#             pygame.mixer.music.load(music_file)
#             print ("Music file %s loaded!" % music_file)
#         except pygame.error:
#             print ("File %s not found! (%s)" % (music_file, pygame.get_error()))
#             return
#         pygame.mixer.music.play()
#
#         # while pygame.mixer.music.get_busy():
#         #     # check if playback has finished
#         #     clock.tick(30)
#     elif(p==1):
#         print("pause")
#         pygame.mixer.music.stop()

class window1(QtWidgets.QMainWindow, fyp.medlai1.Ui_MainWindow):
    def __init__(self, *args, **kwargs):
        QtWidgets.QMainWindow.__init__(self, *args, **kwargs)
        self.setupUi(self)
        self.getStartedBtn.clicked.connect(self.getStarted_click)

    def getStarted_click(self):
        print("get started")
        self.hide()
        self.generatorWindow = window2()
        # self.generatorWin = QtWidgets.QMainWindow()
        # self.ui = medlai2.Ui_MainWindow()
        # self.ui.setupUi(self.generatorWin)
        self.generatorWindow.moodLabel.setHidden(True)
        self.generatorWindow.confirmlabel.setHidden(True)
        self.generatorWindow.progressBar.setValue(0)
        self.generatorWindow.progressBar.hide()
        self.generatorWindow.show()

class window2(QtWidgets.QMainWindow, fyp.medlai2.Ui_MainWindow):
    def __init__(self, *args, **kwargs):
        QtWidgets.QMainWindow.__init__(self, *args, **kwargs)
        self.setupUi(self)
        self.generateMelodyBtn.clicked.connect(self.generateMelody_click)
        # self.uploadImageBtn.clicked.connect(self.uploadImg_click)
        self.uploadSeedBtn.clicked.connect(self.uploadSeed_click)
        self.moodCombo.activated[str].connect(self.mood_choice)
        self.mood = "Select Your Mood"
        self.midiFileLocation = None

    def uploadImg_click(self):

        ImgFileLocation = QtWidgets.QFileDialog.getOpenFileName(self, 'Open Image/Video File')

    def uploadSeed_click(self):
        if(self.mood == 'Select Your Mood'):
            self.moodLabel.setText("Please select your mood first")
            self.moodLabel.setHidden(False)
        else:
            midiLoc = None
            midiLoc = QtWidgets.QFileDialog.getOpenFileName(self, 'Open MIDI File')
            if midiLoc is not None:
                self.midiFileLocation = midiLoc[0]
                self.confirmlabel.setText("Seed Uploaded Successfully")
                self.confirmlabel.setHidden(False)

    def generateMelody_click(self):
        self.progressBar.setHidden(False)
        if(self.midiFileLocation is None):
            pass
        elif(self.mood == 'Happy'):

            # fyp.musicGenerator.generate(self.midiFileLocation,self.progressBar,10,1)
            musicGeneratorTransformers.generate()
            self.hide()
            self.playerWindow = window3()

            self.playerWindow.setWindowTitle("MEDLAI Player")
            oImage = QImage("/Users/abdullahkhan/PycharmProjects/fyp/3.jpg")
            sImage = oImage.scaled(QSize(800, 600))  # resize Image to widgets size
            palette = QPalette()
            palette.setBrush(10, QBrush(sImage))
            self.playerWindow.setPalette(palette)
            self.playerWindow.playerSlider.hide()
            # self.generatorWin = QtWidgets.QMainWindow()
            # self.ui = medlai2.Ui_MainWindow()
            # self.ui.setupUi(self.generatorWin)
            self.playerWindow.show()
        elif(self.mood== 'Sad'):
            # fyp.musicGenerator.generate(self.midiFileLocation, self.progressBar,10, 2)
            sadGenerator.generator()
            self.hide()
            self.playerWindow = window3()

            self.playerWindow.setWindowTitle("MEDLAI Player")
            oImage = QImage("/Users/abdullahkhan/PycharmProjects/fyp/3.jpg")
            sImage = oImage.scaled(QSize(800, 600))  # resize Image to widgets size
            palette = QPalette()
            palette.setBrush(10, QBrush(sImage))
            self.playerWindow.setPalette(palette)
            self.playerWindow.playerSlider.hide()
            # self.generatorWin = QtWidgets.QMainWindow()
            # self.ui = medlai2.Ui_MainWindow()
            # self.ui.setupUi(self.generatorWin)
            self.playerWindow.show()

    def mood_choice(self,text):
        if(text == "Select Your Mood"):
            self.moodLabel.setHidden(True)
        else:
            self.mood = text
            self.moodLabel.setText("Mood Detected: "+self.mood)
            self.moodLabel.setHidden(False)


class window3(QtWidgets.QMainWindow, fyp.medlai3.Ui_MainWindow):
    def __init__(self, *args, **kwargs):
        QtWidgets.QMainWindow.__init__(self, *args, **kwargs)
        self.setupUi(self)
        self.playerSlider.setValue(0)
        self.playerSlider.setEnabled(False)
        # self.playerSlider.sliderReleased.connect(self.slider_value_change)
        # self.play_pauseBtn.clicked.connect(self.play_or_pause)
        self.play_pauseBtn.setText("Play")
        #self.play_pauseBtn.setEnabled(False)
        self.current_time = 0

    # def play_or_pause(self):
    #     # print("play")
    #     # self.url = QtCore.QUrl.fromLocalFile("")
    #     # self.content = M.QMediaContent(self.url)
    #     # self.player = M.QMediaPlayer()
    #     # self.player.setMedia(self.content)
    #     # self.player.play()
    #     freq = 44100  # audio CD quality
    #     bitsize = -16  # unsigned 16 bit
    #     channels = 2  # 1 is mono, 2 is stereo
    #     buffer = 1024  # number of samples
    #     pygame.mixer.init(freq, bitsize, channels, buffer)
    #     music_file = "/Users/abdullahkhan/PycharmProjects/fyp/LSTM_music.mid"
    #
    #     if(self.play_pauseBtn.text()=="Play"):
    #         print("Play")
    #         # optional volume 0 to 1.0
    #         pygame.mixer.music.set_volume(0.8)
    #         play_music(music_file,0)
    #         self.play_pauseBtn.setText("Stop")
    #     elif(self.play_pauseBtn.text()=="Stop"):
    #         self.play_pauseBtn.setText("Play")
    #         play_music(music_file,1)


if __name__ == '__main__':
    app = QtWidgets.QApplication(sys.argv)
    MainWindow1 = window1()

    MainWindow1.setWindowTitle("MEDLAI")
    oImage = QImage("/Users/abdullahkhan/PycharmProjects/fyp/1.jpg")
    sImage = oImage.scaled(QSize(800, 600))  # resize Image to widgets size
    palette = QPalette()
    palette.setBrush(10, QBrush(sImage))
    MainWindow1.setPalette(palette)

    MainWindow1.show()
    sys.exit(app.exec_())


