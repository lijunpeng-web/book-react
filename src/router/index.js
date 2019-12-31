
import loadableComponents from '@/components/loadableComponents'
const Index = loadableComponents(() => import('@/pages/index'))
const BookStack = loadableComponents(() => import('@/pages/bookStack'))
const Me = loadableComponents(() => import('@/pages/me'))
const BookShelf = loadableComponents(() => import('@/pages/bookShelf'))

const routes = [
  {
    name: '首页',
    isTab: true,
    link: '/home',
    component: Index,
  },
  {
    name: '书库',
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
]
export default routes