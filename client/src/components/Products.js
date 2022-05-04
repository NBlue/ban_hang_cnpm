import styled from "styled-components";
import { useState,useEffect} from "react";
import { popularProducts } from "../data";
import Product from "./Product";
import { mobile } from "../responsive";
import axios from "axios";
const Logo = styled.h1`

  ${mobile({ fontSize: "24px" })};
  text-align:center;
`;
const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const A = styled.h1`
  text-align:center;
`;
const Products = ({cat,filters,sort}) => {
  const [products,setProducts]=useState([]);
  const [filteredProducts,setFilteredProducts]=useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  
  useEffect(() => {
    cat &&
      setFilteredProducts(
       products.filter((item) =>
          Object.entries(filters).every(([key, value]) =>
           value=="all"||item[key].includes(value)
          )
        )
      );
  }, [products, cat, filters]);
  
 useEffect(() => {
    if (sort === "newest") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.createdAt - b.createdAt)
      );
    } else if (sort === "asc") {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => a.price - b.price)
      );
    } else {
      setFilteredProducts((prev) =>
        [...prev].sort((a, b) => b.price - a.price)
      );
    }
  }, [sort]);

  return (
    <A><Logo>Các sản phẩm mới
      </Logo>
      <Container>
      {cat
        ? filteredProducts.map((item) => <Product item={item} key={item.id} />)
        : products
            .slice(0, 8)
            .map((item) => <Product item={item} key={item.id} />)}
    </Container>
    </A>
    
  );
};

export default Products;