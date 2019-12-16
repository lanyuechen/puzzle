import { parse } from 'querystring';
import pathRegexp from 'path-to-regexp';
import update from 'immutability-helper';
import _ from 'lodash';

// updateByPath如果连续调用的话，会导致data的旧值覆盖新值，这里通过缓存的方式防止覆盖
const CACHE = Symbol('cache');
const DATA_IDX = Symbol('data_idx');
export const updateByPath = (data: any, path: any, spec: any) => {
  if (window[DATA_IDX] !== data) {
    window[DATA_IDX] = data;
    window[CACHE] = data;
  }
  if (typeof(path) === 'string') {
    path = path.split('.');
  }
  spec = path.reduceRight((p: any, k: any) => ({ [k]: p }), spec);
  window[CACHE] = update(window[CACHE], spec);
  return window[CACHE];
}

export const toCamelCase = (name: string) => {
  if (!name) {
    return name;
  }
  return name.split('-').map(toUpperFirstCase).join('');
}

export const toUpperFirstCase = (str: string) => {
  if (!str) {
    return str;
  }
  return str.replace(/^\S/, s => s.toUpperCase());
}

export const prepareProps = (props: any = {}, parentProps: any) => {
  const res = {};
  Object.entries(props).map(([k, v]: any) => {
    if (v.includes('props.')) {
      res[k] = _.get(parentProps, v.replace('props.', '')) || v;
    } else {
      res[k] = v;
    }
  });
  return res;
};

/* eslint no-useless-escape:0 import/prefer-default-export:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

export const isUrl = (path: string): boolean => reg.test(path);

export const isAntDesignPro = (): boolean => {
  if (ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return true;
  }
  return window.location.hostname === 'preview.pro.ant.design';
};

// 给官方演示站点用，用于关闭真实开发环境不需要使用的特性
export const isAntDesignProOrDev = (): boolean => {
  const { NODE_ENV } = process.env;
  if (NODE_ENV === 'development') {
    return true;
  }
  return isAntDesignPro();
};

export const getPageQuery = () => parse(window.location.href.split('?')[1]);

/**
 * props.route.routes
 * @param router [{}]
 * @param pathname string
 */
export const getAuthorityFromRouter = <T extends { path: string }>(
  router: T[] = [],
  pathname: string,
): T | undefined => {
  const authority = router.find(({ path }) => path && pathRegexp(path).exec(pathname));
  if (authority) return authority;
  return undefined;
};
