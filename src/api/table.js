import fetch from '@/utils/fetch';

export function getList(params) {
  return fetch({
    url: '/article_table/list',
    method: 'get',
    params
  });
}
// export function fetchList(query) {
//   return fetch({
//     url: '/article_table/list',
//     method: 'get',
//     params: query
//   });
// }


