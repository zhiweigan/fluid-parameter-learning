import torch
import torchaudio
from scipy.signal import hilbert
import numpy as np
from Naked.toolshed.shell import execute_js
import time
import skimage.measure

class FluidEnv:

  def __init__(self, num_params, target, max_timesteps):

    success = execute_js('session-setup.js')
    if not success:
      raise Exception("session-setup.js ran incorrectly")

    x, sr = torchaudio.load(target)

    self.num_params = num_params
    self.target_amp = np.abs(hilbert(x))
    self.target_mel = torchaudio.transforms.MelSpectrogram(sr, )(x)

    self.target_amp = skimage.measure.block_reduce(self.target_amp, (1, 500), np.max)


    self.current_state = torch.Tensor(np.zeros(num_params))
    self.step_count = 0
    self.max_timesteps = max_timesteps

  def step(self, action):

    self.current_state = torch.clamp(self.current_state + action, 0, 1)

    args = ' '.join(map(str, self.current_state.tolist()))

    success = execute_js('change-param.js', args)
    if not success:
      raise Exception("change-param.js ran incorrectly")

    try:
      x, sr = torchaudio.load('data/out.wav')  
    except:
      time.sleep(2)
      x, sr = torchaudio.load('data/out.wav')  

    state_amp = np.abs(hilbert(x))
    state_amp = skimage.measure.block_reduce(state_amp, (1, 500), np.max)
    state_mel = torchaudio.transforms.MelSpectrogram(sr)(x)
    
    # reward = -torch.mean((state_mel - self.target_mel) ** 2) 
    reward = -torch.sum(torch.Tensor(state_amp - self.target_amp) ** 2)

    done = False if self.step_count < self.max_timesteps else True
    self.step_count += 1

    return self.current_state, reward, done, None


  def reset(self):
    self.current_state = torch.Tensor(np.zeros(self.num_params) + 0.5)
    self.step_count = 0
    return self.current_state
