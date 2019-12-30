
import loadableComponents from '@/components/loadableComponents'
// import index from '@/pages/index'
const Index = loadableComponents(() => import('@/pages/index'))
const routes = [
  {
    name: '首页',
    isTab: true,
    link: '/home',
    component: Index
  },
]
export default routes