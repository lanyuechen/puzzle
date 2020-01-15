import _ from 'lodash';

/**
 * condition
 * path[, path, ...]: (path[, path, ...]) => expression
 * foo.bar: (a) => a === 1                 // 等价于`foo.bar === 1`
 * foo.bar, foo.tar: (a, b) => a + b > 10  // 等价于`foo.bar + foo.tar > 10`
 * 简写模式：
 * foo.bar: 1  // 等价于`foo.bar: (a) => a === 1`
 * foo.bar     // 等价于`foo.bar: true`
 * 特殊情况：
 * :() => expression  // 无依赖项（冒号不能省略）
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

  try {
    const fn = eval(condition);
    const params = paths ? paths.split(',').map((path: string) => _.get(data, path.trim())) : [];
    if (typeof fn === 'function') {
      return fn(...params);
    }
    if (fn === undefined) {
      return params[0];
    }
    return params[0] === fn;
  } catch (err) {
    return false;
  }
}