import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/database";

const setDataBase = ({ userState, new_cart }) => {
  let id = userState.user.displayName;
  let db = firebase.database().ref();
  let user_attributes
  if (new_cart === undefined) {
    user_attributes = {
      name: id
    };
  } else {
    user_attributes = {
      name: id,
      cart: new_cart
    };
  }
  db.child("Users")
    .child(id)
    .set(user_attributes);
};

const AddtoCart = ({ product, cartState, size, operation, userState }) => {
  let temp = {};
  let product_keys = Object.keys(product);
  for (let i = 0; i < product_keys.length; i++) {
    temp[product_keys[i]] = product[product_keys[i]];
  }
  let temp_product = temp;
  let array = cartState.cart;
  temp_product.size = size;
  let test_string = temp_product.sku + temp_product.size + "";
  let helper_array = array.map(object => {
    let value = "" + object.sku + object.size;
    return value;
  });
  let index = helper_array.indexOf(test_string);
  if (index !== -1) {
    if (operation === -1) {
      if (array[index].quantity === 1) {
        if (cartState.cart.length == 1) {
          let thing = [];
          cartState.setCart(thing);
          setDataBase({ userState, thing });
          return;
        }
        const new_array = cartState.cart.slice();
        console.log(new_array);
        new_array.splice(index, 1);
        console.log(new_array);
        cartState.setCart(new_array);
        let new_cart = new_array;
        setDataBase({ userState, new_cart });
        return;
      } else {
        //case that you just have to subtract one
        let new_item = array[index];
        new_item.quantity = new_item.quantity - 1;
        const new_array = cartState.cart.slice();
        new_array.splice(index, 1, new_item);
        cartState.setCart(new_array);
        let new_cart = new_array;
        setDataBase({ userState, new_cart });
        return;
      }
    }
    if (operation === 1) {
      let new_item = array[index];
      new_item.quantity = new_item.quantity + 1;
      const new_array = cartState.cart.slice();
      new_array.splice(index, 1, new_item);
      cartState.setCart(new_array);
      let new_cart = new_array;
      setDataBase({ userState, new_cart });
      return;
    }
  } else {
    temp_product.quantity = 1;
    array.push(temp_product);
    let new_cart = array;
    setDataBase({ userState, new_cart });

    return;
  }
};

export default AddtoCart;
