import Header from './components/Header'
import Footer from './components/Footer'
import React from 'react'
import HomeScreen from './screens/HomeScreen'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'
import PaymentScreen from './screens/PaymentScreen'
import PlaceOrderScreen from './screens/PlaceOrderScreen'
import OrderScreen from './screens/OrderScreen'
import UsersListScreen from './screens/UsersListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import ProductsOfSeller from './screens/ProductsOfSeller'
import ProductCreateScreen from './screens/ProductCreateScreen'
import OrdersForSeller from './screens/OrdersForSeller'
import CategoryScreen from './screens/CategoryScreen'
import SearchScreen from './screens/SearchScreen'

const App = () => {
  return (
    
    <Router>
      <Header />
      <div className='container'>
        <main >
          <Route path='/product/:id' component={ProductScreen} />
          <Route path='/order/:id' component={OrderScreen} />
          <Route path='/login' component={LoginScreen} />
          <Route path='/shipping' component={ShippingScreen} />
          <Route path='/payment' component={PaymentScreen} />
          <Route path='/placeorder' component={PlaceOrderScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/cart/:id?' component={CartScreen}  />
          <Route path='/admin/userlist' component={UsersListScreen}  />
          <Route path='/admin/user/:id/edit' component={UserEditScreen}  />
          <Route path='/admin/productlist' component={ProductListScreen} exact />
          <Route path='/admin/productlist/:pageNumber' component={ProductListScreen} exact />
          <Route path='/admin/orderlist' component={OrderListScreen}  />
          <Route path='/seller/product/:id/edit' component={ProductEditScreen}  />
          <Route path='/seller/:id/productlist/' component={ProductsOfSeller}  />
          <Route path='/seller/:id/createproduct/' component={ProductCreateScreen}  />
          <Route path='/seller/:id/orderlist/' component={OrdersForSeller}  />
          <Route path='/category/:category/:subcategory/' component={CategoryScreen}  />
          <Route path='/search/:keyword' component={SearchScreen} exact/>
          <Route path='/page/:pageNumber' component={SearchScreen} exact />
          <Route path='/search/:keyword/page/:pageNumber' component={SearchScreen} exact />
          <Route path='/' component={HomeScreen} exact />          
        </main>
        </div>
      <Footer />
    </Router>
  )
}

export default App
