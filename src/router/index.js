
import loadableComponents from '@/components/loadableComponents'
const Index = loadableComponents(() => import('@/pages/index'))
const BookStack = loadableComponents(() => import('@/pages/bookStack'))
const Me = loadableComponents(() => import('@/pages/me'))
const Login = loadableComponents(() => import('@/pages/login'))
const BookShelf = loadableComponents(() => import('@/pages/bookShelf'))
const BookDetail = loadableComponents(() => import('@/pages/detail'))
const BookList = loadableComponents(() => import('@/pages/bookList'))
const Read = loadableComponents(() => import('@/pages/read'))
const routes = [
  {
    name: '首页',
    isTab: true,
    link: '/home',
    component: Index,
  },
  {
    name: '分类',
    isTab: true,
    link: '/bookstack',
    component: BookStack
  },
  {
    name: '书架',
    isTab: true,
    link: '/bookshelf',
    component: BookShelf
  },
  {
    name: '我的',
    isTab: true,
    link: '/me',
    component: Me
  },
  {
    name: '登录',
    isTab: false,
    link: '/login',
    component: Login
  },
  {
    name: '详情',
    isTab: false,
    link: '/detail/:id',
    component: BookDetail
  },
  {
    name: '榜单',
    isTab: false,
    link: '/booklist/:index',
    component: BookList
  },
  {
    name: '阅读',
    isTab: false,
    link: '/read',
    component: Read
  }


]
export default routes