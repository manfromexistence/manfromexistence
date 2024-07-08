# import mido
# from mido import MidiFile, MidiTrack, Message
# from keras.layers import LSTM, Dense, Activation, Dropout, Flatten
# from keras.preprocessing import sequence
# from keras.models import Sequential
# from keras.optimizers import Adam
# from keras.callbacks import ModelCheckpoint
# from sklearn.preprocessing import MinMaxScaler
# import numpy as np
# import tensorflow as tf
# from midi2audio import FluidSynth
#
# 
#
#
#
# def generate(midiFileLocation,progressBar,completed,mood):
#     completed += 10
#     # progressBar.setValue(completed)
#     mid = MidiFile(midiFileLocation)
#     notes = []
#
#     for msg in mid:
#         if not msg.is_meta and msg.channel == 0 and msg.type == 'note_on':
#             data = msg.bytes()
#             notes.append(data[1])
#
#     notesnp=np.array(notes)
#     print(notesnp.shape)
#     print(notesnp)
#
#     scaler = MinMaxScaler(feature_range=(0,1))
#     scaler.fit(np.array(notes).reshape(-1,1))
#     notes = list(scaler.transform(np.array(notes).reshape(-1,1)))
#
#     notesnp=np.array(notes)
#     print(notesnp.shape)
#     print(notesnp)
#
#     # LSTM layers requires that data must have a certain shape
#     # create list of lists fist
#     notes = [list(note) for note in notes]
#
#     # subsample data for training and prediction
#     X = []
#     y = []
#     # number of notes in a batch
#     n_prev = 30
#     for i in range(len(notes)-n_prev):
#         X.append(notes[i:i+n_prev])
#         y.append(notes[i+n_prev])
#     # save a seed to do prediction later
#     #
#     # ynp=np.array(y)
#     # print(ynp.shape)
#     # print(y)
#     Xnp = np.array(X)
#     print("X: ",Xnp.shape)
#     print("X[0]: ",Xnp[0].shape)
#     completed +=10
#     progressBar.setValue(completed)
#     print(Xnp)
#
#     X_test = X[-300:]
#
#     Xtnp = np.array(X_test)
#     print("X_test: ",Xtnp.shape)
#     print(Xtnp)
#
#     X = X[:-300]
#     y = y[:-300]
#
#     Xnpafter = np.array(X)
#     print("X after: ",Xnpafter.shape)
#     print(Xnpafter)
#     completed += 10
#     progressBar.setValue(completed)
#     if(mood==1):
#         print("Happy model")
#         model = tf.keras.models.load_model('/Users/abdullahkhan/PycharmProjects/fyp/KerasmodelBeatiful.model')
#     elif(mood==2):
#         print("sad model")
#         model = tf.keras.models.load_model('/Users/abdullahkhan/PycharmProjects/fyp/KerasmodelSad.model')
#
#     completed += 20
#     progressBar.setValue(completed)
#     prediction = model.predict(np.array(X_test))
#     prediction = np.squeeze(prediction)
#     prediction = np.squeeze(scaler.inverse_transform(prediction.reshape(-1,1)))
#     prediction = [int(i) for i in prediction]
#     print("Prediction length",prediction.__len__())
#     mid = MidiFile()
#     track = MidiTrack()
#     t = 0
#     completed += 20
#     progressBar.setValue(completed)
#     for note in prediction:
#         # 147 means note_on
#         # 67 is velosity
#         note = np.asarray([147, note, 67])
#         bytes = note.astype(int)
#         msg = Message.from_bytes(bytes[0:3])
#         t += 1
#         msg.time = t
#         track.append(msg)
#
#     mid.tracks.append(track)
#     mid.save('LSTM_music.mid')
#     completed += 20
#     progressBar.setValue(completed)
#
#
#
