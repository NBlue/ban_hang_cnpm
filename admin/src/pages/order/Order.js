import { Link, useLocation } from "react-router-dom";
import "./order.css";
import Chart from "../../components/chart/Chart";
import { Publish } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {updateOrder} from "../../redux/apiCalls";
import { getOrder } from "../../redux/apiCalls";
export default function Order() {
  const dispatch=useDispatch();
  const location = useLocation();
  const orderId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  const [users, setUser] = useState([]);
  const [user, setUse] = useState({});
  const order = useSelector((state) =>
    state.order.orders.find((order) => order._id === orderId)
  );
  useEffect(()=>{
    const getUsers=async ()=>{
      console.log("loi")
      try{
        const res=await userRequest.get("/users");
        console.log(res);
        setUse(res.data.find((user) => user._id === order.userId ))
        console.log("try");
        setUser(res.data);
        
      }
      catch{console.log("err")};
    };
     
    getUsers();

  },[]);
 
  const [status,setStatus]=useState(order.status);
  
  
  const handleChange=(e)=>{
    setStatus(e.target.value);
  }
  const handleUpdate=(e,id)=>{
    updateOrder(id,{status},dispatch);
    alert("Sửa thành công")
  }
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );


  return (
    <div className="order">
      <div className="orderTitleContainer">
        <h1 className="orderTitle">Order</h1>
        
      </div>
      <div className="orderTop">
        <div className="orderTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="orderTopRight">
          <div className="orderInfoTop">
          <span className="orderInfoKey">Username:</span>
            <span className="orderName">{user.username}</span>
          </div>
          <div className="orderInfoBottom">
            <div className="orderInfoItem">
              <span className="orderInfoKey">productsId:</span>
              
             {order.products.map((product)=>(<span className="orderInfoValue">{product._id+", "}</span>))}
              
            </div>
            
            <div className="orderInfoItem">
              <span className="orderInfoKey">Address:</span>
              <span className="orderInfoValue">{order.address}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="orderBottom">
        <form className="orderForm">
          <div className="orderFormLeft">
            
            <label>Status</label>
            <select name="status" id="status" onChange={(e)=>{handleChange(e)}}>
            <option >Chọn trạng thái</option>
              <option value="pending">pending</option>
              <option value="transporting">transporting</option>
              <option value="completed">completed</option>
            </select>
          </div>
          <div className="orderFormRight">
            
            <Link to="/orders">
            <button  className="orderButton" onClick={(e)=>{handleUpdate(e,order._id)}}>Update</button>
            </Link>
             
            
          
          </div>
        </form>
      </div>
    </div>
  );
}
