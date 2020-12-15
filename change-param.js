const path   = require('path');
const fluid  = require('fluid-music');
const cybr   = fluid.cybr;

const OPTIONS = {
  targetPort: 9999,
  targetHost: '127.0.0.1',
  header: 0xf2b49e2c,
  timeout: 5000,
  isUnixDomainSocket: false,
};

const client = new cybr.Client(OPTIONS);

const bound = (num, x, y) => {
  if (num < x) return x;
  if (num > y) return y;
  return num;
}

let out = process.argv.slice(2);

for(let i = 0; i < 6; i++){
  let fl = parseFloat(out[i]);
  out[i] = bound(fl, 0, 1);
}

client.send([  
  cybr.global.activate(path.join(__dirname, 'long.tracktionedit'), false),

  fluid.audiotrack.select('default'),

  fluid.pluginPodolski.select(),

  fluid.pluginPodolski.setEnv1Attack(out[0]),
  fluid.pluginPodolski.setEnv1Decay(out[1]),
  fluid.pluginPodolski.setEnv1Sustain(out[2]),
  fluid.pluginPodolski.setEnv1Release(out[3]),

  fluid.pluginPodolski.setOsc1WaveWarp(out[4]),
  fluid.pluginPodolski.setVcf0Cutoff(out[5]),
  fluid.pluginPodolski.setVcf0Resonance(0.9),
  fluid.pluginPodolski.setVcf0CutoffMod1(1),
  fluid.pluginPodolski.setVcf0Modsource1(16/17),

  fluid.audiotrack.renderRegion(
    path.join(
      __dirname, 
      'data', 
      'out_long.wav',
    ), 0, 4),
]);

client.send([  
  cybr.global.activate(path.join(__dirname, 'short.tracktionedit'), false),
  fluid.audiotrack.select('default'),

  fluid.audiotrack.select('default'),

  fluid.pluginPodolski.select(),

  fluid.pluginPodolski.setEnv1Attack(out[0]),
  fluid.pluginPodolski.setEnv1Decay(out[1]),
  fluid.pluginPodolski.setEnv1Sustain(out[2]),
  fluid.pluginPodolski.setEnv1Release(out[3]),

  fluid.pluginPodolski.setOsc1WaveWarp(out[4]),
  fluid.pluginPodolski.setVcf0Cutoff(out[5]),
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