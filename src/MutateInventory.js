import React, { useEffect, useState } from "react";

const MutateInventory = ({stockState, product, stock_operation, size})=> {
    let new_inventory = stockState.inventory
    let key = product.sku.toString()
    let previous_stock = new_inventory[key]
    previous_stock[size]=previous_stock[size]+stock_operation
    new_inventory[key] = previous_stock
    stockState.setInventory(new_inventory)
}


export default MutateInventory