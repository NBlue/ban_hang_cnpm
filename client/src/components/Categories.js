import styled from "styled-components";
import { categories } from "../data";
import { mobile } from "../responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  display: flex;
  padding: 20px;
  justify-content: space-between;
  ${mobile({ padding: "0px", flexDirection:"column" })}

`;
const Logo = styled.h1`
  font-weight: bold;
  
  ${mobile({ fontSize: "24px" })}
`;
const A = styled.h1`
  text-align:center;
`;
const Categories = () => {
  return (
    <A>
    <Logo>Các loại sản phẩm của cửa hàng</Logo>
    <Container>
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
    </A>
  );
};

export default Categories;
