

export function setToken(data) {
  localStorage.setItem('token', data);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  return localStorage.removeItem('token');
}


export function setUser(data) {
  localStorage.setItem('userInfo', data);
}

export function getUser() {
  let params = localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : false
  return params;
}

export function removeUser() {
  return localStorage.removeItem('userInfo');
}


export function setReadSet(data) {
  let params = JSON.stringify(data)
  localStorage.setItem('readSet', params);
}

export function getReadSet() {
  let params = localStorage.getItem('readSet') ? JSON.parse(localStorage.getItem('readSet')) : false
  return params;
}

export function removeReadSet() {
  return localStorage.removeItem('readSet');
}
