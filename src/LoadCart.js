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
import CartProduct from "./CartProduct";

const LoadCart = ({ openState, cartState }) => {
  let user_total = FormatMoney(GetTotal(cartState));
  let period = user_total.indexOf(".");
  user_total = user_total.substr(0, period + 3);
  if (cartState.cart.length === 0) {
    return (
      <Content>
        <Notification color="light">
          <Notification color="warning" textAlign="centered">
            <Content size="large">Your Cart</Content>
          </Notification>
          <Notification color="light" textAlign="centered">
            Add items to your cart to get started!
          </Notification>
        </Notification>
      </Content>
    );
  }
  return (
    <Content>
      <Notification color="light">
        <Notification color="warning" textAlign="centered">
          <Content size="large">Your Cart</Content>
        </Notification>
        <Notification color="light" textAlign="centered">
          {cartState.cart.map(item => (
            <CartProduct
              item={item}
              cartState={cartState}
              openState={openState}
            />
          ))}
        </Notification>
        <Title textAlign="centered">Total: ${user_total}</Title>
        <Button
          size="medium"
          fullwidth
          color="warning"
          onClick={() => alert("Your total is: $" + user_total)}
        >
          Checkout
        </Button>
      </Notification>
    </Content>
  );
};

const FormatMoney = number => {
  let code_string = number.toString();
  if (!code_string.includes(".")) {
    code_string += ".";
  }
  let dec_point = code_string.indexOf(".");
  let cents = code_string.substr(dec_point);
  let dollar_price = Math.floor(number);
  while (cents.length < 3) {
    cents = cents + "0";
  }
  let total_price = "" + dollar_price + cents;
  return total_price;
};

const GetTotal = state => {
  let total_price = 0;
  let product_array = state.cart;
  for (let i = 0; i < product_array.length; i++) {
    total_price += Number(product_array[i].price) * product_array[i].quantity;
  }
  return total_price;
};
export default LoadCart;
