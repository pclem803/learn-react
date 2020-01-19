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

function App() {
  const [data, setData] = useState({});

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
      <Banner />
      <LoadItems products = {products}/>
    </Container>
  );
}

export default App;
