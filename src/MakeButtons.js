import React from "react";
import "rbx/index.css";
import {
  Button,
} from "rbx";
import AddtoCart from './AddToCart'
import MutateInventory from './MutateInventory'

const MakeButtons = ({ product, cartState, openState, stockState, userState }) => {
  let operation = 1;
  let stock_operation = -1
  let key = product.sku.toString()
  let object_stock = stockState.inventory[key]
  if (object_stock){
    if (object_stock["S"]===0 && object_stock["M"]===0 && object_stock["L"]===0 && object_stock["XL"]===0){
      return (
        <Button fullwidth color="warning" size="large" disabled>Out of Stock</Button>
      )
    }
    return (
      <Button.Group hasAddons align="centered" size="large" color="warning" >
        <Button color="warning" inverted outlined disabled={!(object_stock["S"])}
        onClick={() => {
          let size = "S";
          AddtoCart({ product, cartState, size, operation, userState });
          openState.openCart(true)
          MutateInventory({stockState, product, stock_operation, size})
        }}>
          S
        </Button>
        <Button color="warning" inverted outlined disabled={!(object_stock["M"])}
        onClick={() => {
          let size = "M";
          AddtoCart({ product, cartState, size, operation, userState });
          openState.openCart(true)
          MutateInventory({stockState, product, stock_operation, size})
        }}>
          M
        </Button>
        <Button color="warning" inverted outlined disabled={!(object_stock["L"])}
        onClick={() => {
          let size = "L";
          AddtoCart({ product, cartState, size, operation, userState });
          openState.openCart(true)
          MutateInventory({stockState, product, stock_operation, size})
        }}>
          L
        </Button>
        <Button color="warning" inverted outlined disabled={!(object_stock["XL"])}
        onClick={() => {
          let size = "XL";
          AddtoCart({ product, cartState, size, operation, userState });
          openState.openCart(true)
          MutateInventory({stockState, product, stock_operation, size})
        }}>
          XL
        </Button>
      </Button.Group>
    );
  }
  else{
    return(
      <Button size="large" fullwidth state="loading" color="warning"></Button>
    )
  }
};

export default MakeButtons;
