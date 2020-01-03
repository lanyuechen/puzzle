import _ from 'lodash';

export const getValue = (data: any, condition: string) => {
  const key = condition.split('|')[0];
  return _.get(data, key);
}

export default (condition: string, value: any) => {
  
}


export function calcCondition(data: any, condition: string) {
  condition = condition.split('|').join('');
  try {
    return eval(`(data.${condition.trim()})`); // todo 条件判断
  } catch(err) {
    return false;
  }
}
