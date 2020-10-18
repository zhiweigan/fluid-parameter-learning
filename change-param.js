const path   = require('path');
const fluid  = require('fluid-music');
const cybr   = fluid.cybr;

const client = new cybr.Client();

const bound = (num, x, y) => {
  if (num < x) return x;
  if (num > y) return y;
  return num;
}

let out = process.argv.slice(2);

for(let i = 0; i < 4; i++){
  let fl = parseFloat(out[i]);
  out[i] = bound(fl, 0, 1);
}

client.send([  
  fluid.audiotrack.select('default'),
  fluid.pluginPodolski.select(),

  fluid.pluginPodolski.setEnv1Attack(out[0]),
  fluid.pluginPodolski.setEnv1Decay(out[1]),
  fluid.pluginPodolski.setEnv1Sustain(out[2]),
  fluid.pluginPodolski.setEnv1Release(out[3]),

  fluid.pluginPodolski.setVcf0Cutoff(0.5),
  fluid.pluginPodolski.setVcf0Resonance(0.5),

  fluid.audiotrack.renderRegion(
    path.join(
      __dirname, 
      'data', 
      'out.wav',
    ), 0, 4),
]);