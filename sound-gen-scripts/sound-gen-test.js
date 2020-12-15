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

client.send([
  cybr.global.activate(path.join(__dirname, 'long.tracktionedit'), true),
  
  fluid.audiotrack.select('default'),
  fluid.midiclip.create('default', 0, 4, 
    [{ type: 'midiNote', n: 64, startTime: 0, length: 1}],
  ),

  fluid.audiotrack.select('default'),
  fluid.pluginPodolski.select(),
  fluid.pluginPodolski.setEnv1Attack(0.4),
  fluid.pluginPodolski.setEnv1Decay(0.75),
  fluid.pluginPodolski.setEnv1Sustain(0.95),
  fluid.pluginPodolski.setEnv1Release(0.55),

  fluid.pluginPodolski.setOsc1WaveWarp(1),
  fluid.pluginPodolski.setVcf0Cutoff(0.55),
  fluid.pluginPodolski.setVcf0Resonance(0.9),
  fluid.pluginPodolski.setVcf0CutoffMod1(1),
  fluid.pluginPodolski.setVcf0Modsource1(16/17),

  fluid.audiotrack.renderRegion(
    path.join(
      __dirname, 
      '..',
      'data', 
      'podo_long_helm_2.wav',
    ), 0, 4),
]);

// client.send([
//   cybr.global.activate(path.join(__dirname, 'short.tracktionedit'), true),
  
//   fluid.audiotrack.select('default'),
//   fluid.midiclip.create('default', 0, 4, 
//     [{ type: 'midiNote', n: 64, startTime: 0, length: 0.25}],
//   ),

//   fluid.audiotrack.select('default'),
//   fluid.pluginPodolski.select(),

//   fluid.pluginPodolski.setEnv1Attack(0.4),
//   fluid.pluginPodolski.setEnv1Decay(0.75),
//   fluid.pluginPodolski.setEnv1Sustain(0.95),
//   fluid.pluginPodolski.setEnv1Release(0.55),

//   fluid.pluginPodolski.setOsc1WaveWarp(1),
//   fluid.pluginPodolski.setVcf0Cutoff(0.9),
//   fluid.pluginPodolski.setVcf0Resonance(0.9),
//   fluid.pluginPodolski.setVcf0CutoffMod1(1),
//   fluid.pluginPodolski.setVcf0Modsource1(16/17),

//   fluid.audiotrack.renderRegion(
//     path.join(
//       __dirname, 
//       '..',
//       'data', 
//       'podo_short_helm.wav',
//     ), 0, 4),
// ]);
