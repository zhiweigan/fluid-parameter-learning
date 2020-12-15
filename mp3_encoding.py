from pydub import AudioSegment

AudioSegment.from_wav("./data/podo_long.wav").export("test_96.mp3", format="mp3", bitrate="96k")