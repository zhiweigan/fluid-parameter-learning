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

  fluid.pluginPodolski.setVcf0Cutoff(0.5),
  fluid.pluginPodolski.setVcf0Resonance(0.5),
]);