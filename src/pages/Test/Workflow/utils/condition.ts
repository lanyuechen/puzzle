import _ from 'lodash';

/**
 * condition
 * path[, path, ...]: condition
 * foo.bar: foo.bar === "bar"
 * foo.bar: foo.bar > 10 && foo.bar < 100 
 * foo.bar, foo.tar: foo.bar > 10 && foo.tar === 10
 * foo.bar: function(){return this.enable}
 * :data.foo.bar === "bar"
 * true/false
 */

export default (data: any, condition: any) => {
  if (typeof condition === 'boolean') {
    return condition;
  }
  if (typeof condition === 'string') {
    condition = [condition];
  }

  return !!condition.find((d: string) => calc(data, d));
}

function calc(data: any, condition: string) {
  const [ paths, ...others ] = condition.split(':');
  condition = others.join(':').trim();  // 防止条件中出现冒号

  if (/^function/.test(condition)) { //函数
    try {
      const fn = eval(`const fn = ${condition}`);
      return fn.call(data);
    } catch (err) {
      return false;
    }
  }

  if (paths) {
    paths.split(',').forEach((path: any) => {
      path = path.trim();
      condition = condition.replace(new RegExp(path.replace(/\./g, '\\.').replace(/\$/g, '\\$'), 'g'), 'data.$&');
    });
  }

  try {
    return eval(condition); // todo 条件判断
  } catch (err) {
    return false;
  }
}