import React, { useEffect, useState } from "react";

const AddtoCart = ({ product, cartState, size, operation }) => {
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
        if (array.length == 1) {
          cartState.setCart([]);
          return;
        }
        const new_array = cartState.cart.splice()
        new_array.splice(index,1)
        cartState.setCart(new_array);
        return;
      } else {
        //case that you just have to subtract one
        let new_item = array[index];
        new_item.quantity = new_item.quantity - 1;
        const new_array = cartState.cart.splice()
        new_array.splice(index, 1, new_item);
        cartState.setCart(new_array);
        return;
      }
    }
    if (operation === 1) {
      let new_item = array[index];
      new_item.quantity = new_item.quantity + 1;
      const new_array = cartState.cart.splice()
      new_array.splice(index,1,new_item)
      cartState.setCart(new_array);
      return;
    }
  } else {
    temp_product.quantity = 1;
    array.push(temp_product);
    return;
  }
};

export default AddtoCart;
