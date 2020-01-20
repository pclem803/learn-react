import React, { useEffect, useState } from "react";
import "rbx/index.css";
import {
  Image,
  Box,
  Notification,
  Title,
  Content,
  Block,
  Message,
  Button,
  Column
} from "rbx";
import AddtoCart from './AddToCart'

const MakeButtons = ({ product, cartState, openState }) => {
    let operation = 1;
  return (
    <Button.Group hasAddons align="centered" size="large" color="warning">
      <Button color="warning" inverted outlined
      onClick={() => {
        let size = "S";
        AddtoCart({ product, cartState, size, operation });
        openState.openCart(true)
      }}>
        S
      </Button>
      <Button color="warning" inverted outlined
      onClick={() => {
        let size = "M";
        AddtoCart({ product, cartState, size, operation });
        openState.openCart(true)
      }}>
        M
      </Button>
      <Button color="warning" inverted outlined
      onClick={() => {
        let size = "L";
        AddtoCart({ product, cartState, size, operation });
        openState.openCart(true)
      }}>
        L
      </Button>
      <Button color="warning" inverted outlined
      onClick={() => {
        let size = "XL";
        AddtoCart({ product, cartState, size, operation });
        openState.openCart(true)
      }}>
        XL
      </Button>
    </Button.Group>
  );
};

export default MakeButtons;
