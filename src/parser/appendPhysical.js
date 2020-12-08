export default function appendPhysical(result, text, options) {
  const { debug = false } = options;
  if (/(m|b)p\.[^;]*/.test(text)) {
    result.physical = {};
    for (let points of text.match(/(m|b)p\.[^;]*/g)) {
      if (debug) result.physical.source = text.match(/(m|b)p\.[^;]*/g);
      let temperatures = points.match(/[0-9]+(\.[0-9]+)?/g);
      let point = {};
      if (temperatures.length === 2) {
        point.low = parseFloat(temperatures[0]);
        point.high = parseFloat(temperatures[1]);
      } else {
        point.low = parseFloat(temperatures[0]);
      }
      if (points.includes('bp.')) {
        if (!result.physical.bp) result.physical.bp = [];
        result.physical.bp.push(point);
      }
      if (points.includes('mp.')){
        if (!result.physical.mp) result.physical.mp = [];
        result.physical.mp.push(point);
      }
    }
  }
}
