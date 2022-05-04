import { useEffect, useState } from "react";
import { useSelector,useDispatch} from "react-redux";
import { deleteCart } from "../redux/cartRedux";
import { useLocation } from "react-router";
import { userRequest } from "../requestMethod";
import {Link} from "react-router-dom"
import {setPoint} from "./../redux/userRedux"

const Success = () => {
  const dispatch=useDispatch();
  const location = useLocation();
  //in Cart.jsx I sent data and cart. Please check that page for the changes.(in video it's only data)
  const data = location.state.stripeData;
  const cart = location.state.products;
  const value=location.state.value;
  const currentUser = useSelector((state) => state.user.currentUser);
  const point = useSelector((state) => state.user.point);
  let level=point/1000000;
  if(level<1) level=0;
  if(1<=level&&level<2) level=1;
  if(level<3&&level>=2) level=2
  if(level>=3) level=3;
  const [orderId, setOrderId] = useState(null);
  console.log(currentUser)
  const deleCart=()=>{
    dispatch(deleteCart());
  }
  useEffect(() => {
    const createOrder = async () => {
      
      try {
        
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total*(1-value)+50000-level*10000,
          address: data,
        });
        console.log(res.data + "null")
        setOrderId(res.data._id);
      } catch {}
    };
    const updateUser= async ()=>{
      try{
       
        const newpoint=currentUser.point+cart.total*(1-value)+50000-level*10000
        dispatch(setPoint(newpoint));
        const res1=await userRequest.put(`/users/${currentUser._id}`,{point:newpoint})
        console.log(res1.data)
      }
      catch{
        console.log('loi updateuser')
      }
    }
    data && createOrder();
    data&&updateUser();
  }, [cart, data, currentUser]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {orderId
        ? `Order has been created successfully. Your order number is ${orderId}`
        : `Successfull. Your order is being prepared...`}
      <Link to="/" ><button style={{ padding: 10, marginTop: 20 }} onClick={deleCart}>Go to Homepage</button></Link>
    </div>
  );
};

export default Success;