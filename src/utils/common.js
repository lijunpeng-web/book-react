import { getToken } from "./local";
export function checkLogin() {
  const token = getToken()
  if (!token) {
    window.location.href = "http://192.168.122.179:5000/#/login"
    return
  }
}