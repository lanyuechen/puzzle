import _ from 'lodash';

const ACCESS_TOKEN = 'e30728f1964aadc3314331ee80123026398b31ca';
const ENDPOINT = 'https://api.github.com/graphql';

/**
 * 读取文件内容
 * @param expression
 */
export async function read(expression: string) {
  const res = await graph(`{
    repository(name: "ant-design", owner: "ant-design") {
      object(expression: "${expression}") {
        ... on Blob {
          id
          text
        }
      }
    }
  }`);
  return _.get(res, 'data.repository.object.text');
}

/**
 * 多去文件夹下所有文件内容
 * @param expression 
 */
export async function readDir(expression: string) {
  const res = await graph(`{
    repository(name: "ant-design", owner: "ant-design") {
      object(expression: "${expression}") {
        ... on Tree {
          entries {
            object {
              ... on Blob {
                text
              }
            }
          }
        }
      }
    }
  }`);
  const entries = _.get(res, 'data.repository.object.entries', []);
  return entries.map((entry: any) => _.get(entry, 'object.text'));
}

/**
 * graphql请求入口
 * @param {Object} query 
 * @param {Object} variables 
 */
export function graph(query: any, variables: any = {}) {
  return fetch(ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': `bearer ${ACCESS_TOKEN}`,
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  }).then(res => res.json());
};
