import Vue from 'vue'
import VueRouter from 'vue-router'
import CartPage from '../components/cart/cart-page'
import ShoppingPage from '../components/product-page/item-page'
import SignInPage from '../components/accounts-login/sign-in-page'
import RegisterPage from '../components/accounts-login/register-page'
import AccountsPage from '../components/accounts-login/accounts'
import ManageInventory from '../components/manage-inventory/manage-inventory'
import PaymentPage from '../components/cart/payment'
import HelpPage from '../components/help/help-page'

Vue.use(VueRouter)

const routes = [
  {
    path: '/cart',
    name: 'cart',
    component: CartPage,
    props: true
  },
  {
    path: '/help',
    name: 'help',
    component: HelpPage,
    props: true
  },
  {
    path: '/payment',
    name: 'payment',
    component: PaymentPage,
    props: true
  },
  {
    path: '/manage-inventory',
    name: 'Manage Inventory',
    component: ManageInventory,
    props: true
  },
  {
    path: '/',
    name: 'shopping',
    component: ShoppingPage,
  },
  {
    path: '/sign-in',
    name: 'Sign In',
    component: SignInPage
  },
  {
    path: '/accounts',
    name: 'Accounts',
    component: AccountsPage
  },
  {
    path: '/register-page',
    name: 'Register',
    component: RegisterPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
