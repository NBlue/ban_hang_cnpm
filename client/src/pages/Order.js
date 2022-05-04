import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector,useDispatch} from "react-redux";
import { useHistory } from "react-router";
import { useState,useEffect } from "react";

import { userRequest } from "../requestMethod";

import axios from 'axios';
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 20px;
  ${mobile({ padding: "10px" })}
`;

const Title = styled.h1`
  font-weight: 300;
  text-align: center;
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
`;

const TopButton = styled.button`
  padding: 10px;
  font-weight: 600;
  cursor: pointer;
  border: ${(props) => props.type === "filled" && "none"};
  background-color: ${(props) =>
    props.type === "filled" ? "black" : "transparent"};
  color: ${(props) => props.type === "filled" && "white"};
`;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  text-decoration: underline;
  cursor: pointer;
  margin: 0px 10px;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}

`;

const Info = styled.div`
  flex: 3;
`;

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;
const Save=styled.div`
cursor:pointer;
padding-top:15px;
width:100px;
height:50px;
text-align:center;
color:white;
border-radius:5px;
background-color:#008080`


const Over=styled.div`
cursor:pointer;
padding-top:15px;
width:100px;
height:50px;
text-align:center;
color:white;
border-radius:5px;
background-color:grey;`
const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  margin: 5px;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  height: 70vh;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;
const Address=styled.input`
placeholder:"Địa chỉ";
`
;
const SummaryItemText = styled.span``;
const Text=styled.p`
text-align:center;`;
const SummaryItemPrice = styled.span``;

const Button = styled.button`
  width: 100%;
  padding: 10px;
  background-color: black;
  color: white;
  font-weight: 600;
`;

const Cart = () => {
  const dispatch=useDispatch();
  const currentUser = useSelector((state) => state.user.currentUser);  
  let userId;
  currentUser?userId=currentUser._id:userId=null;
  const [orders,setOrders]=useState([]);
   console.log(userId)

  useEffect(() => {
    
    const getOrders = async () => {
      try {
        const res =await userRequest.get(`http://localhost:5000/api/orders/find/${userId}`
        );
        
        setOrders(res.data);
      } catch (err) {}
    };

    getOrders();
   console.log(orders)
  }, []);
  
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Đơn hàng của bạn
        </Title>
        
        <Bottom>
          <Info>
          {orders.map((order) => (
              <Product>
                <ProductDetail>
                  <Image src="https://th.bing.com/th/id/R.9d041082b5eb8c69a186615ac2d72b1b?rik=H4z%2fmnZiCeKY7g&riu=
                  http%3a%2f%2fwww.packagingsource.com%2fresize%2fShared%2fImages%2fProduct%2fRed-Gift-Wrap%2fe6500-red-gift-wrap.jpg%3fbw%3d1000%26w%3d1000%26bh%3d1000%26h%3d1000&ehk=5UqLeiZPlDNzYkyAGRyUXtXtBX7pYSz5lgbIffr3toE%3d&risl=&pid=ImgRaw&r=0
                  " />
                  <Details>
                  <ProductName>
                      <b>Mã đơn hàng:</b> {order._id}
                    </ProductName>
                    <ProductName>
                      <b>Mã sản phẩm:</b> {order.products.map((product)=>(<p>{product.productId},</p>))}
                    </ProductName>
                    <ProductId>
                      <b>Số tiền:</b> {order.amount}
                    </ProductId>
                    <ProductName>
                      <b>Địa chỉ:</b> {order.address}
                    </ProductName>
              
                  </Details>
                </ProductDetail>
                <PriceDetail>
                {order.status=="completed"?<Over>Đã hoàn thành </Over>:
                <Save>{order.status}</Save>}
                  
                </PriceDetail>
              </Product>
            ))}
            <Hr></Hr>
          </Info>
          
        </Bottom>
      </Wrapper>
      <Footer />
    </Container>
  );
};

export default Cart;
