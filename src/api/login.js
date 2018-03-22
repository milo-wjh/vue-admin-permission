import fetch from '@/utils/fetch';

export function login(email, password) {
  return fetch({
    url: '/Admin/User/login',
    method: 'post',
    data: {
      email,
      password
    }
  });
}

export function getInfo(token) {
  return fetch({
    url: '/Api/User/info',
    method: 'get',
    params: { token }
  });
}

export function logout() {
  return fetch({
    url: '/Api/User/logout',
    method: 'post'
  });
}

export function dialog() {
	return fetch({
		url: '/api/user/info',
		method: 'get'
	});
}

