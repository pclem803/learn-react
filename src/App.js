import React, { useEffect, useState } from "react";
import { Message, Button, Container } from "rbx";
import "rbx/index.css";
import Banner from "./Banner";
import LoadItems from "./LoadItems";
import LoadModal from "./LoadModal";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/database";

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
  const [cart, setCart] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [user, setUser] = useState(null);

  //GETTING THE PRODUCTS
  const products = Object.values(data);
  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("./data/products.json");
      const json = await response.json();
      setData(json);
    };
    fetchProducts();
  }, []);

  //SETTING INVENTORY
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

  //LOGIN
  useEffect(() => {
    firebase.auth().onAuthStateChanged(setUser);
  }, []);
  
  if (user) {
    let dbData;
    let id = user.displayName;
    db.once("value", function(data) {
      dbData = data.val();
      if (dbData.Users[id] && dbData.Users[id].cart !== undefined) {
        let user_cart = JSON.stringify(cart)
        let databse_cart = JSON.stringify(dbData.Users[id].cart)
        if (user_cart!==databse_cart){
          setCart(dbData.Users[id].cart)
        }
      }
      else{
        const user_attributes = {
          name: id,
          cart: cart
        };
        db.child("Users")
          .child(id)
          .set(user_attributes);
      }
    });
  }

  return (
    <Container>
      <Banner openState={{ open, openCart }} user={user} />
      <LoadItems
        products={products}
        cartState={{ cart, setCart }}
        openState={{ open, openCart }}
        stockState={{ inventory, setInventory }}
        userState= {{user, setUser}}
      />
      <LoadModal
        openState={{ open, openCart }}
        cartState={{ cart, setCart }}
        stockState={{ inventory, setInventory }}
        userState= {{user, setUser}}
      />
    </Container>
  );
}

const addInventory = helper => ({
  inventory: helper.Inventory,
  users: helper.users
});

export default App;
