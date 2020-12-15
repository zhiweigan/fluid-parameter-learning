const path   = require('path');
const fluid  = require('fluid-music');
const cybr   = fluid.cybr;

const client = new cybr.Client();

client.send([
  cybr.global.activate(path.join(__dirname, 'session.tracktionedit'), true),
  
  fluid.audiotrack.select('default'),

  fluid.midiclip.create('default', 0, 4, 
    [{ type: 'midiNote', n: 64, startTime: 0, length: 1}],
  ),

  fluid.pluginPodolski.select(),
  fluid.pluginPodolski.setEnv1Attack(0.45),
  fluid.pluginPodolski.setEnv1Decay(0.45),
  fluid.pluginPodolski.setEnv1Sustain(0.1),
  fluid.pluginPodolski.setEnv1Release(0.2),
  fluid.pluginPodolski.setVcf0Cutoff(0.5),
  fluid.pluginPodolski.setVcf0Resonance(0.5),

  fluid.audiotrack.renderRegion(
    path.join(
      __dirname, 
      'data', 
      'sound.wav',
    ), 0, 4),
]);