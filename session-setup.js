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
  fluid.global.save()
]);

client.send([
  cybr.global.activate(path.join(__dirname, 'short.tracktionedit'), true),
  fluid.audiotrack.select('default'),
  fluid.midiclip.create('default', 0, 4, 
    [{ type: 'midiNote', n: 64, startTime: 0, length: 0.25}],
  ),
  fluid.global.save()
]);