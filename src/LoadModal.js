import React, { useEffect, useState } from "react";
import {
  Modal,
} from "rbx";
import LoadCart from './LoadCart'

const LoadModal = ({openState, cartState, stockState})=>{
    return(
        <Modal active={openState.open}>
        <Modal.Background onClick={() => openState.openCart(false)} />
        <Modal.Content>
            <LoadCart openState={openState} cartState = {cartState} stockState={stockState}/>
        </Modal.Content>
        <Modal.Close onClick={() => openState.openCart(false)} />
      </Modal>
    )
}

export default LoadModal