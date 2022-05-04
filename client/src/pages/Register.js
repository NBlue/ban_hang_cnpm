import styled from "styled-components";
import { mobile } from "../responsive";
import { register } from "../redux/apiCalls";
import { useState } from "react";
import { useDispatch } from "react-redux";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://previews.123rf.com/images/maximleshkovich/maximleshkovich1710/maximleshkovich171000265/88532663-women-modern-fashion-clothes-and-accessories-background-with-frame-for-text-flat-lay-female-casual-s.jpg")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75%" })}
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;

const Register = () => {
  const dispatch=useDispatch();
  const [username,setUsername]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const handleClick=(e)=>{
  e.preventDefault();
  register(dispatch,{username,email,password})
  alert("Tạo tài khoản thành công!");
  }
  
  return (
    <Container>
      <Wrapper>
        <Title>TẠO TÀI KHOẢN</Title>
        <Form>
          <Input placeholder="tên" />
          <Input placeholder="họ" />
          <Input placeholder="tên tài khoản" name="username" onChange={(e)=>{setUsername(e.target.value)}} />
          <Input placeholder="email" name="username" onChange={(e)=>{setEmail(e.target.value)}}/>
          <Input placeholder="mật khẩu" name="password" onChange={(e)=>setPassword(e.target.value)}/>
          
          <Agreement>
           Bằng việc tạo tài khoản, bạn đã đồng ý với <b>chính sách bảo mật của chúng tôi</b>
          </Agreement>
          <Button onClick={handleClick}>CREATE</Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Register;
