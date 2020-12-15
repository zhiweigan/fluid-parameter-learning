const path   = require('path');
const fluid  = require('fluid-music');
const { ClientRequest } = require('http');
const cybr   = fluid.cybr;

const client = new cybr.Client();

const bound = (num, x, y) => {
  if (num < x) return x;
  if (num > y) return y;
  return num;
}

let out = process.argv.slice(2);

for(let i = 0; i < 9; i++){
  let fl = parseFloat(out[i]);
  out[i] = bound(fl, 0, 1);
}

client.send([  
  fluid.audiotrack.select('default'),
  fluid.pluginPodolski.select(),

  fluid.pluginPodolski.setEnv1Attack(0.2),
  fluid.pluginPodolski.setEnv1Decay(0.3),
  fluid.pluginPodolski.setEnv1Sustain(0.4),
  fluid.pluginPodolski.setEnv1Release(0.5),
  fluid.pluginPodolski.setEnv1FallRise(0.6),

  fluid.pluginPodolski.setOsc1WaveWarp(0.7),

  fluid.pluginPodolski.setVcf0Cutoff(0.8),
  fluid.pluginPodolski.setVcf0Resonance(0.9),
  fluid.pluginPodolski.setVcf0CutoffMod1(1),
  fluid.pluginPodolski.setVcf0Modsource1(16/17),

  fluid.audiotrack.renderRegion(
    path.join(
      __dirname, 
      'data', 
      'out_short.wav',
    ), 0, 4),
]);