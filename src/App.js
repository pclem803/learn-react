import React, { useEffect, useState } from "react";
import {
  Image,
  Box,
  Column,
  Button,
  Container,
  Title,
  Notification,
  Content,
  Modal,
  Card,
  Heading
} from "rbx";
import "rbx/index.css";
import Banner from "./Banner";
import LoadItems from "./LoadItems";
import LoadModal from './LoadModal'

function App() {
  const [data, setData] = useState({});
  const [open, openCart] = useState(false);
  const [cart, setCart]= useState([])

  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  return (
    <Container>
      <Banner openState= {{open, openCart}}/>
      <LoadItems products = {products} cartState={{cart, setCart}} openState= {{open, openCart}} />
      <LoadModal openState= {{open, openCart}} cartState={{cart, setCart}}/>
    </Container>
  );
}

export default App;
