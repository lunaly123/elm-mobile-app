import goods from '@/view/goods/goods';
import ratings from '@/view/ratings/ratings';
import seller from '@/view/seller/seller';

export let routeConfig = [
  {
    path: '/',
    redirect: '/goods'
  }, {
    path: '/goods',
    name: 'goods',
    component: goods,
    title:'商家'
  }, {
    path: '/ratings',
    name: "ratings",
    component: ratings,
    title:'评价'
  }, {
    path: '/seller',
    name: 'seller',
    component: seller,
    title:'卖家'
  }
]