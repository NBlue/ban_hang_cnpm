import { Badge } from "@material-ui/core";
import { Search, ShoppingCartOutlined } from "@material-ui/icons";
import React from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import {Link} from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux";
import { logout } from "../redux/apiCalls";
import { deleteCart } from "../redux/cartRedux";
import { deleteVoucher } from "../redux/voucherRedux";
const Container = styled.div`
  height: 60px;
 margin-bottom:20px;
  ${mobile({ height: "50px" })}
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ padding: "10px 0px" })}
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })}
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "50px" })}
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })}
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Navbar = () => {
  const dispatch=useDispatch();
  const quantity=useSelector(state=>state.cart.quantity)
  const handleClick=(e)=>{
    e.preventDefault();
    logout(dispatch);
    dispatch(deleteCart());
    dispatch(deleteVoucher());
  }
  console.log(quantity);
  return (
    <Container>
      <Wrapper>
        <Left></Left>
        <Center>
          <Logo>EVA DE EVA</Logo>
        </Center>
        <Right>
        <MenuItem><Link to="/order">Đơn hàng</Link></MenuItem>
        <MenuItem><Link to="/voucher">Voucher</Link></MenuItem>
          <MenuItem><Link to="/register">Đăng ký</Link></MenuItem>
          <MenuItem><Link to="/login">Đăng nhập</Link></MenuItem>
          <MenuItem onClick={handleClick}>Đăng xuất</MenuItem>
          <Link to="/cart">
          <MenuItem>
            <Badge badgeContent={quantity} color="primary">
              
              <ShoppingCartOutlined />
              
              
            </Badge>
          </MenuItem></Link>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;
