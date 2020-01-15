import { useEffect, useRef, useState } from 'react';
import update from 'immutability-helper';
import evt from './event';
import _ from 'lodash';
import judge from './condition';

const yaml = require('js-yaml');

export const json2yaml = (data: any) => {
  return yaml.safeDump(data, {
    skipInvalid: true,
  });
};

export const yaml2json = (data: string) => {
  return yaml.safeLoad(data);
};

export const getLabel = (config: any) => {
  if (config.label) {
    return config.label;
  }
  return config.path;
  const label = config.path.split('.').pop();
  return isNaN(label) ? label : '';
};

export function updateByPath(data: any, path: string, value: any) {
  _.set(data, path, _.get(data, path)); // 防止undefined
  const spec = path.split('.').reduceRight((p: any, n: string) => ({ [n]: p }), { $set: value });
  return update(data, spec);
}

export function isTrue(data: any, condition: any, defaultValue = false) {
  if (!condition) {
    return defaultValue;
  }

  return judge(data, condition);
}

function trimHide(data: any, config: any) {
  config.forEach((d: any) => {
    d.items &&
      d.items.forEach((w: any) => {
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
    if (key.indexOf('$') === 0) {
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

export const useValidate = (rules: any, value: any): any => {
  const [err, setErr] = useState<any>([]);
  const ref = useRef(value);

  useEffect(() => {
    if (ref.current !== value && rules) {
      rules = Array.isArray(rules) ? rules : [rules];
      for (let rule of rules) {
        const d = rule.split('|').map((d: string) => d.trim());
        if (d[0] === 'required') {
          if (!value) {
            setErr(['error', d[1]]);
            return;
          }
        } else if (d[0] === 'pattern') {
          const reg = eval(`${d.slice(1, -1).join('|')}`);
          if (!reg.test(value)) {
            setErr(['error', d[d.length - 1]]);
            return;
          }
        }
      }
    }
    setErr([]);
  }, [value]);

  return err;
};

export const useEvent = (data: any, config: any, onChange: Function) => {
  const ref = useRef(data);

  useEffect(() => {
    ref.current = data;
  }, [data]);

  useEffect(() => {
    const paths: string[] = [];
    if (config.linkage) {
      config.linkage.forEach((d: any) => {
        const conditions = Array.isArray(d.condition) ? d.condition : [d.condition];
        conditions.forEach((c: string) => {
          const [ heads ] = c.split(':');
          if (heads) {
            heads.split(',').forEach((key: string) => {
              paths.push(key.trim());
            })
          }
        });
      });
    }
    paths.forEach((path: any) => evt.on(path, handle));
    return () => {
      paths.forEach((path: any) => evt.off(path, handle));
    };
  }, []);

  const handle = () => {
    setTimeout(() => {
      if (config.linkage) {
        const res = config.linkage.find((d: any) => judge(ref.current, d.condition));
        if (res) {
          onChange(config.path, res.value);
        }
      }
    }, 0);
  };
};
