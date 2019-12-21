var MACHINE_ID = Math.random() * 0xFFFFFF >> 0;
var index = Math.random() * 0xFFFFFF >> 0;
var pid = (typeof process === 'undefined' || typeof process.pid !== 'number' ? Math.floor(Math.random() * 100000) : process.pid) % 0xFFFF;

export default () => {
  const time = (Date.now() / 1000 >> 0) % 0xFFFFFFFF;

  return hex(8, time) + hex(6, MACHINE_ID) + hex(4, pid) + hex(6, next());
}

function hex(length: number, n: number | string) {
  n = n.toString(16);
  return (n.length === length) ? n : '00000000'.substring(n.length, length) + n;
}

function next() {
  return index = (index + 1) % 0xFFFFFF;
}