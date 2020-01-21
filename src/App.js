import React, { useEffect, useState } from "react";
import {
  Container,
} from "rbx";
import "rbx/index.css";
import Banner from "./Banner";
import LoadItems from "./LoadItems";
import LoadModal from './LoadModal'
import firebase from 'firebase/app';
import 'firebase/database';

function App() {
  const [data, setData] = useState({});
  const [open, openCart] = useState(false);
  const [cart, setCart]= useState([])
  const [inventory, setInventory] = useState([])


  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    const fetchInventory = async () => {
      const response = await fetch("./data/inventory.json");
      const json = await response.json();
      setInventory(json);
    };
    fetchInventory();
  }, []);

  return (
    <Container>
      <Banner openState= {{open, openCart}}/>
      <LoadItems products = {products} cartState={{cart, setCart}} openState= {{open, openCart}} stockState={{inventory, setInventory}}/>
      <LoadModal openState= {{open, openCart}} cartState={{cart, setCart}} stockState={{inventory, setInventory}}/>
    </Container>
  );
}

export default App;
