import { Add, Remove } from "@material-ui/icons";
import styled from "styled-components";
import Announcement from "../components/Announcement";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { mobile } from "../responsive";
import { useSelector,useDispatch} from "react-redux";
import { useHistory } from "react-router";
import { useState,useEffect } from "react";
import { deleteCart } from "../redux/cartRedux";
import { voucherdata } from "../voucherdata";
import { userRequest } from "../requestMethod";
import {addVoucher} from "../redux/voucherRedux"
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
  const cart = useSelector((state) =>state.cart);
  const [address,setAddress]=useState("");
  const [voucher,setVoucher]=useState(true);
  const history = useHistory();
  const currentUser = useSelector((state) => state.user.currentUser);
  console.log(currentUser);
  
  const [vouchers,setVouchers]=useState([]);
  const point = useSelector((state) => state.user.point);
  let level=point/1000000;
  if(level<1) level=0;
  if(1<=level&&level<2) level=1;
  if(level<3&&level>=2) level=2
  if(level>=3) level=3;

  useEffect(() => {
    
    const getVouchers = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/vouchers"
        );
        
        setVouchers(res.data);
      } catch (err) {}
    };
  //  const getTypeVouchers=async ()=>{
   //   try {
     //   const res= await userRequest.get(`http://localhost:5000/api/carts/find/${currentUser._id}`)
    //    console.log('type vouchers'+res)
    //  }
    //  catch(err){
     //   console.log(err)
    //  }
   // }
    getVouchers();
   // getTypeVouchers();
  }, [voucher]);//them vouchers vao day
  const onSave=(newvoucher)=>{
    let status=true;
       const res1= userRequest.put(`/vouchers/${newvoucher._id}`,{status});
      console.log({...newvoucher});
      
      setVoucher(!voucher);
      dispatch(
        addVoucher({...newvoucher})
        );
      
  }

  const unSave=(newvoucher)=>{
    let status=false;
       const res1= userRequest.put(`/vouchers/${newvoucher._id}`,{status});
      console.log(newvoucher);
      setVoucher(!voucher);

  }
  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <Title>Voucher của shop
        </Title>
        <Text>(Cấp độ thân thiện {level})</Text>
        <Bottom>
          <Info>
          {vouchers.map((voucher) => (
              <Product>
                <ProductDetail>
                  <Image src={voucher.img} />
                  <Details>
                  <ProductName>
                      <b>Miêu tả:</b> {voucher.desc}
                    </ProductName>
                    <ProductName>
                      <b>Đơn tối thiểu:</b> {voucher.min}
                    </ProductName>
                    <ProductId>
                      <b>Hạn:</b> {voucher.day}
                    </ProductId>
                   
                    
                  </Details>
                </ProductDetail>
                <PriceDetail>
                {voucher.status?<Over onClick={()=>{unSave(voucher)}}>Đã lưu</Over>:
                <Save onClick={()=>{onSave(voucher)}}>Lưu</Save>}
                  
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
