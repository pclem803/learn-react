import React, { useEffect, useState } from "react";
import { Image, Column, Button, Notification, Content } from "rbx";
import AddtoCart from "./AddToCart";
import MutateInventory from './MutateInventory'

const CartProduct = ({ item, cartState, openState, stockState, userState }) => {
  let total_price = FormatMoney(item.price);
  let size = item.size;

  let key = item.sku.toString();
  let object_stock = stockState.inventory[key];
  if (object_stock) {
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
              <Button
                size="medium"
                inverted
                color="warning"
                outlined
                onClick={() => {
                  let size = item.size;
                  let product = item;
                  let operation = -1;
                  let stock_operation = 1;
                  AddtoCart({ product, cartState, size, operation, userState });
                  MutateInventory({stockState, product, stock_operation, size})
                  return 0;
                }}
              >
                -
              </Button>
              <Button
                size="medium"
                inverted
                color="warning"
                outlined
                disabled={!(object_stock[size])}
                onClick={() => {
                  let size = item.size;
                  let product = item;
                  let operation = 1;
                  let stock_operation = -1;
                  AddtoCart({ product, cartState, size, operation, userState });
                  MutateInventory({stockState, product, stock_operation, size})
                  return 0;
                }}
              >
                +
              </Button>
            </Button.Group>
          </Column>
        </Column.Group>
      </Notification>
    );
  }
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
export default CartProduct;
