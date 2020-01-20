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
import AddtoCart from './AddToCart'

const CartProduct = ({ item, cartState, openState }) => {
    let total_price = FormatMoney(item.price);
    let size = item.size;
    return (
      <Notification color="light">
        <Column.Group>
          <Column size={3} align="left">
            <Image.Container size={64}>
              <GetImage code={item.sku}></GetImage>
            </Image.Container>
          </Column>
          <Column size={6}>
            <Content align="left">
              <p>
                {item.title}
                <br></br>
                Size: {size}
                <br></br>
                Quantity: {item.quantity}
              </p>
            </Content>
          </Column>
          <Column size={4} textAlign="right">
            <p>Price: ${total_price}</p>
            <Button.Group align="right" hasAddons>
              <Button size="medium" inverted color="warning" outlined onClick={()=>{
                  let size= item.size
                  let product = item
                  let operation = -1
                  AddtoCart({ product, cartState, size, operation });
                  return(0)
              }}>
                -
              </Button>
              <Button size="medium" inverted color="warning" outlined onClick={()=>{
                  let size= item.size
                  let product = item
                  let operation = 1
                  AddtoCart({ product, cartState, size, operation });
                  return(0)
              }}>
                +
              </Button>
            </Button.Group>
          </Column>
        </Column.Group>
      </Notification>
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

  const GetImage = ({ code }) => {
    const url = "/data/products/" + code + "_1.jpg";
    return <Image src={url} />;
  };
export default CartProduct