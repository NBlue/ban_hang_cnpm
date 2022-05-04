import Product from "./pages/Product";
import Home from "./pages/Home";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import Error from "./pages/Error"
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import Success from "./pages/Success";
import Voucher from "./pages/Voucher"
import Order from "./pages/Order"
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { useSelector } from "react-redux";
//sua lai slider //
//sua filter,sort
//hien thi chi tiet ra dung san pham da chon 
//them sp vao gio hang, cap nhat gio hang
//chú ý: nếu thêm sp vào giỏ hàng chưa chọn size và số lượng phải thông báo
const App = () => {
  const user = useSelector((state)=>state.user.currentUser);
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/products/:category">
          <ProductList />
        </Route>
        <Route path="/product/:id">
          <Product />
        </Route>
        <Route path="/cart">
          <Cart />
        </Route>
        <Route path="/success">
          <Success />
        </Route>
        <Route path="/order">
          <Order/>
        </Route>
        <Route path="/voucher">
          <Voucher />
        </Route>
        <Route path="/login">{user ? <Redirect to="/" /> : <Login />}</Route>
        <Route path="/register">
          {user ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};


export default App;
