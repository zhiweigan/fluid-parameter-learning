import torch
import torchaudio
from scipy.signal import hilbert
import numpy as np
from Naked.toolshed.shell import execute_js
import time
import skimage.measure
import os
from pydub import AudioSegment
import time

class FluidEnv:

  def __init__(self, num_params, target, max_timesteps):

    success = execute_js('session-setup.js')
    if not success:
      raise Exception("session-setup.js ran incorrectly")

    self.num_params = num_params

    x, sr = torchaudio.load('./data/helm_long.wav')
    self.target_amp_long = np.abs(hilbert(x))
    self.target_mel_long = torchaudio.transforms.MelSpectrogram(sr, )(x)
    self.target_amp_long = skimage.measure.block_reduce(self.target_amp_long, (1, 500), np.max)    

    x, sr = torchaudio.load('./data/helm_short.wav')
    self.target_amp_short = np.abs(hilbert(x))
    self.target_mel_short = torchaudio.transforms.MelSpectrogram(sr, )(x)
    self.target_amp_short = skimage.measure.block_reduce(self.target_amp_short, (1, 500), np.max)

    self.current_state = torch.Tensor(np.zeros(num_params))
    self.step_count = 0
    self.max_timesteps = max_timesteps

  def getRewardPartial(self, x, target_mel, target_amp, sr):
    state_amp = np.abs(hilbert(x))
    state_amp = skimage.measure.block_reduce(state_amp, (1, 500), np.max)
    state_mel = torchaudio.transforms.MelSpectrogram(sr)(x)
    
    reward = torch.sum((state_mel - target_mel) ** 2) / 10000
    reward += torch.sum(torch.Tensor(state_amp - target_amp) ** 2) * 10 

    return -reward
      
  def getReward(self, x_short, x_long, sr):
    r = self.getRewardPartial(x_short, self.target_mel_short, self.target_amp_short, sr) / 2
    r += self.getRewardPartial(x_long, self.target_mel_long, self.target_amp_long, sr) / 2
    return r

  def step(self, action):
    start = time.time()
    temp = np.round(torch.clamp(self.current_state+action, 0, 1), 3)
    args = ' '.join(map(str, temp.tolist()))

    success = execute_js('change-param.js', args)
    if not success:
      raise Exception("change-param.js ran incorrectly")
    try:
      x_l, sr = torchaudio.load('data/out_long.wav')  
      x_s, sr = torchaudio.load('data/out_short.wav')  
    except:
      time.sleep(2)
      x_l, sr = torchaudio.load('data/out_long.wav')  
      x_s, sr = torchaudio.load('data/out_short.wav') 

    end = time.time() 
    print("step: ", end-start)

    r = self.getReward(x_s, x_l, sr)

    done = False if self.step_count < self.max_timesteps else True
    self.step_count += 1
    self.current_state = temp

    return self.current_state, r, done, None


  def reset(self):
    self.current_state = torch.Tensor(np.zeros(self.num_params) + 0.5)
    self.step_count = 0
    return self.current_state
