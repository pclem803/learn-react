import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/database";

const MutateInventory = ({stockState, product, stock_operation, size})=> {
    let db = firebase.database().ref();
    let new_inventory = stockState.inventory
    let key = product.sku.toString()
    let previous_stock = new_inventory[key]
    previous_stock[size]=previous_stock[size]+stock_operation
    new_inventory[key] = previous_stock
    stockState.setInventory(new_inventory)
    db.child("Inventory").set(new_inventory)
}


export default MutateInventory