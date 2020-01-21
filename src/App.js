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

const firebaseConfig = {
  apiKey: "AIzaSyAKtSbdBxQlY_vLPIvXJKSO7qe8EcfF9sE",
  authDomain: "clement-cart-f3a8b.firebaseapp.com",
  databaseURL: "https://clement-cart-f3a8b.firebaseio.com",
  projectId: "clement-cart-f3a8b",
  storageBucket: "clement-cart-f3a8b.appspot.com",
  messagingSenderId: "264854384177",
  appId: "1:264854384177:web:fcd9ce4bb98d569fc52f10",
  measurementId: "G-M2NZP82RVD"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database().ref();


function App() {
  const [data, setData] = useState({});
  const [open, openCart] = useState(false);
  const [cart, setCart]= useState([])
  const [inventory, setInventory] = useState([])
  const [user, setUser]=useState()


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
    const handleData = snap => {
      if (snap.val()) {
        setInventory(addInventory(snap.val()).inventory);
      }
    };
    db.on("value", handleData, error => alert(error));
    return () => {
      db.off("value", handleData);
    };
  }, []);

  return (
    <Container>
      <Banner openState= {{open, openCart}}/>
      <LoadItems products = {products} cartState={{cart, setCart}} openState= {{open, openCart}} stockState={{inventory, setInventory}}/>
      <LoadModal openState= {{open, openCart}} cartState={{cart, setCart}} stockState={{inventory, setInventory}}/>
    </Container>
  );
}

const addInventory = helper =>({
  inventory: helper.Inventory,
  users: helper.users
})

export default App;
