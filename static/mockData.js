const List = [];
const count = 100;

for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@cname',
    auditor: '@cname',
    title: '@ctitle(10, 20)',
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft', 'deleted'],
    pageviews: '@integer(300, 5000)'
  }));
};


function param2Obj(url) {
   const search = url.split('?')[1];
   if (!search) {
     return {}
   }
   return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}');
 };

function getList(config) {
  const { importance, type, title, page, limit, sort } = param2Obj(config.url);
  console.log({ importance, type, title, page, limit, sort });
  let mockList = List.filter(item => {
    if (importance && item.importance !== +importance) return false;
    if (type && item.type !== type) return false;
    if (title && item.title.indexOf(title) < 0) return false;
    return true;
  });
  if (sort === '-id') {
    mockList = mockList.reverse()
  }

  const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1));
  console.log(pageList);
  return {
    code: 0,
    data: {
      total: mockList.length,
      items: pageList
    }
  }
};

Mock.mock("/Api/User/test", {"code":0,"message":"SUCCESS","data":{"msg":"返回数据撒"}});
Mock.mock("/Api/test", {"code":0,"message":"SUCCESS","data":{"name":"@name()","uid":"@increment()"}});
Mock.mock("/table/list", {"code":0,"message":"SUCCESS","data":{"items":[{"title": "sdfsdf", "author": "milo", "pageviews": "1", "display_time": "2017"}]}});
Mock.mock(/\/Api\/User\/info/, {"code":0,"message":"SUCCESS","data":{"role":"admin","avatar":"https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif","name":"jone"}});
Mock.mock(/\/article_table\/list/, "get", function(options){return getList(options)});
