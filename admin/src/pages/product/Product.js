import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { productData } from "../../dummyData";
import { Publish } from "@material-ui/icons";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethods";
import {updateProduct} from "../../redux/apiCalls";
import { getProduct } from "../../redux/apiCalls";
export default function Product() {
  const dispatch=useDispatch();
  const location = useLocation();
  const productId = location.pathname.split("/")[2];
  const [pStats, setPStats] = useState([]);
  
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  
  const [title,setTitle]=useState(product.title);
  const [desc,setDesc]=useState(product.desc);
  const [price,setPrice]=useState(product.price);
  const [inStock,setStock]=useState(product.inStock);
  const [img,setImg]=useState(product.img);
  
  const handleChange=(e)=>{
    const name=e.target.name;
    console.log(name);
    if(name=="title") setTitle(e.target.value);
    if(name=="desc") setDesc(e.target.value);
    if(name=="price") setPrice(e.target.value);
    if(name=="inStock") setStock(e.target.value);
  }
  const handleUpdate=(e,id)=>{
    updateProduct(id,{title,desc,price,inStock},dispatch);
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

  useEffect(() => {
    console.log(product)
    const getStats = async () => {
      try {
        const res = await userRequest.get("orders/income?pid=" + productId);
        const list = res.data.sort((a,b)=>{
            return a._id - b._id
        })
        list.map((item) =>
          setPStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch (err) {
        console.log(err);
      }
    };
    getStats();
  }, [productId, MONTHS]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input type="text" name="title" placeholder={product.title} onChange={(e)=>{handleChange(e)}} />
            <label>Product Description</label>
            <input type="text" name="desc" placeholder={product.desc} onChange={(e)=>{handleChange(e)}} />
            <label>Price</label>
            <input type="text" name="price" placeholder={product.price} onChange={(e)=>{handleChange(e)}}/>
            <label>In Stock</label>
            <select name="inStock" id="idStock" onChange={(e)=>{handleChange(e)}}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <Link to="/products"><button  className="productButton" onClick={(e)=>{handleUpdate(e,product._id)}}>Update</button></Link>
              
            
          
          </div>
        </form>
      </div>
    </div>
  );
}
