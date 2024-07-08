import os
import sys
from musicautobot.numpy_encode import *
from musicautobot.utils.file_processing import process_all, process_file
from musicautobot.config import *
from musicautobot.music_transformer import *


# sys.path.append('/Users/abdullahkhan/musicautobot/notebooks/music_transformer')
#
# print(sys.path)
#
# os.chdir('../')
# print(os.getcwd())

#### Load Pretrained

# Location of your midi files
midi_path =  Path('/Users/abdullahkhan/musicautobot/data/midi')

# Location of saved datset
data_path = Path('/Users/abdullahkhan/musicautobot/data/numpy')

# Data
data = MusicDataBunch.empty(data_path)
vocab = data.vocab

# For Saved Data:
# data = load_data(data_path, '/Users/abdullahkhan/musicautobot/data/numpy/musicitem_sad.pkl')

## 3. Load Model
# batch_size = 1
encode_position = True
dl_tfms = [batch_position_tfm] if encode_position else []
# data = load_data(data_path, data_save_name, bs=batch_size, encode_position=encode_position, dl_tfms=dl_tfms)
#
config = default_config()
config['encode_position'] = encode_position
# learn = music_model_learner(data, config=config.copy())

# Learner
pretrained_path='/Users/abdullahkhan/musicautobot/data/numpy/models/example.pth'
# pretrained_path='data/numpy/models/sad.pth'
learn = music_model_learner(data, pretrained_path=pretrained_path,config=config.copy())

## Prediction
#### Choose existing midi file as a starting point
midi_files = get_files(midi_path, recurse=True, extensions='.mid'); midi_files[:4]

idx = 1
f = midi_files[idx]; f
print(f)
# ftest = '/Users/abdullahkhan/musicautobot/data/midi/examples/All I Want For Christmas Is You - Mariah Carey - Pre-Chorus-And-Chorus.mid'
#### NextWord/Autocomplete

# Trim the song to only a few notes. Model will use these notes a seed and continue the idea

cutoff_beat = 10

item = MusicItem.from_file(f, data.vocab)
seed_item = item.trim_to_beat(cutoff_beat)

# seed_item.show()
#
# seed_item.play()

pred, full = learn.predict(seed_item, n_words=400, temperatures=(1.1,0.4), min_bars=12, top_k=24, top_p=0.7)

pred.show()

fp = pred.stream.write('midi', '/Users/abdullahkhan/musicautobot/blah.mid')
pred.play()

full_song = seed_item.append(pred);
full_song.show()

fp = full_song.stream.write('midi', '/Users/abdullahkhan/musicautobot/blahfull_song.mid')
full_song.play()