const path   = require('path');
const fluid  = require('fluid-music');
const cybr   = fluid.cybr;

const client = new cybr.Client();

client.send([
  cybr.global.activate(path.join(__dirname, 'long.tracktionedit'), true),
  
  fluid.audiotrack.select('default'),
  fluid.midiclip.create('default', 0, 4, 
    [{ type: 'midiNote', n: 64, startTime: 0, length: 1}],
  ),

  fluid.plugin.loadTrkpreset('../bells.trkpreset'),

  fluid.audiotrack.renderRegion(
    path.join(
      __dirname,
      '..', 
      'data', 
      'bell_long.wav',
    ), 0, 4),
]);

client.send([
  cybr.global.activate(path.join(__dirname, 'short.tracktionedit'), true),
  
  fluid.audiotrack.select('default'),
  fluid.midiclip.create('default', 0, 4, 
    [{ type: 'midiNote', n: 64, startTime: 0, length: 0.25}],
  ),

  fluid.plugin.loadTrkpreset('../bells.trkpreset'),

  fluid.audiotrack.renderRegion(
    path.join(
      __dirname, 
      '..',
      'data', 
      'bell_short.wav',
    ), 0, 4),
]);