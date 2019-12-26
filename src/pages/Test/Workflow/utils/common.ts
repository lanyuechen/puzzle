import { useEffect, useRef } from 'react';
import update from 'immutability-helper';
import evt from './event';
import _ from 'lodash';
const yaml = require('js-yaml');

export const json2yaml = (data: any) => {
  return yaml.safeDump(data, {
    skipInvalid: true,
  });
}

export const yaml2json = (data: string) => {
  return JSON.parse(yaml.safeLoad(data));
}

export function updateByPath(data: any, path: string, value: any) {
  const spec = path.split('.').reduceRight((p: any, n: string) => ({[n]: p}), {$set: value});
  return update(data, spec);
}

export function isTrue(data: any, condition: any, defaultValue = false) {
  if (!condition || !condition.length) {
    return defaultValue;
  }
  if (typeof(condition) === 'boolean') {
    return condition;
  }
  if (typeof(condition) === 'string') {
    condition = [condition];
  }

  return !condition.find((d: string) => !calcCondition(data, d));
}

function trimHide(data: any, config: any) {
  config.forEach((d: any) => {
    d.work && d.work.forEach((w: any) => {
      if (!isTrue(data, w.show, true)) {
        data = updateByPath(data, w.path, undefined);
      }
    });
  });
  return data;
}

export function trimEmpty(data: any, config: any) {
  data = trimHide(data, config);

  return JSON.parse(JSON.stringify(data), (key, val) => {
      if (val === null) {
          return undefined;
      }
      if (typeof val === 'object') {
          if (Object.keys(val).length) {
              return val;
          }
          return undefined;
      }
      if (val !== undefined && val !== '') {
          return val;
      }
      return undefined;
  });
}

export function calcCondition(data: any, condition: string) {
  condition = condition.split('|').join('');
  try {
    return eval(`(data.${condition.trim()})`); // todo 条件判断
  } catch(err) {
    return false;
  }
}

export const useEvent = (data: any, config: any, onChange: Function) => {
  const ref = useRef(data);

  useEffect(() => {
    ref.current = data;
  }, [data]);

  useEffect(() => {
    if (config.linkage) {
      config.linkage.forEach((d: any) => {
        const key = d.condition.split('|')[0];
        evt.on(key, handle);
      });
    }
    return () => {
      if (config.linkage) {
        config.linkage.forEach((d: any) => {
          const key = d.condition.split('|')[0];
          evt.off(key, handle);
        });
      }
    }
  }, []);

  const handle = () => {
    setTimeout(() => {
      if (config.linkage) {
        const res = config.linkage.find((d: any) => calcCondition(ref.current, d.condition));
        if (res) {
          onChange(config.path, res.value);
        }
      }
    }, 0);
  }
}