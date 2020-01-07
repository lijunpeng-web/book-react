

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
  return localStorage.getItem('userInfo');
}

export function removeUser() {
  return localStorage.removeItem('userInfo');
}
