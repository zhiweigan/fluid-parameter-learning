const path   = require('path');
const fluid  = require('fluid-music');
const cybr   = fluid.cybr;

const client = new cybr.Client();
client.send([
  cybr.global.activate(path.join(__dirname, 'session.tracktionedit'), true),
  
  fluid.audiotrack.select('default'),

  fluid.midiclip.create('default', 0, 4, 
    [{ type: 'midiNote', n: 64 - 12, startTime: 0, length: 0.25}],
  ),

  fluid.audiotrack.select('default'),
  fluid.pluginHelm.select(),
  fluid.pluginHelm.setAmpAttack(0.2),
  fluid.pluginHelm.setAmpDecay(0.3),
  fluid.pluginHelm.setAmpSustain(0.4),
  fluid.pluginHelm.setAmpRelease(0.5),
  fluid.pluginHelm.setCutoff(0.8),
  fluid.pluginHelm.setResonance(0.9),

  fluid.audiotrack.renderRegion(
    path.join(
      __dirname, 
      '..',
      'data', 
      'helm_short.wav',
    ), 0, 4),
]);

client.send([
  cybr.global.activate(path.join(__dirname, 'session.tracktionedit'), true),
  
  fluid.audiotrack.select('default'),

  fluid.midiclip.create('default', 0, 4, 
    [{ type: 'midiNote', n: 64 - 12, startTime: 0, length: 1}],
  ),

  fluid.audiotrack.select('default'),
  fluid.pluginHelm.select(),
  fluid.pluginHelm.setAmpAttack(0.2),
  fluid.pluginHelm.setAmpDecay(0.3),
  fluid.pluginHelm.setAmpSustain(0.4),
  fluid.pluginHelm.setAmpRelease(0.5),
  fluid.pluginHelm.setCutoff(0.8),
  fluid.pluginHelm.setResonance(0.9),

  fluid.audiotrack.renderRegion(
    path.join(
      __dirname, 
      '..',
      'data', 
      'helm_long.wav',
    ), 0, 4),
]);