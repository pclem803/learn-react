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
import LoadCart from './LoadCart'

const LoadModal = ({openState, cartState})=>{
    return(
        <Modal active={openState.open}>
        <Modal.Background onClick={() => openState.openCart(false)} />
        <Modal.Content>
            <LoadCart openState={openState} cartState = {cartState}/>
        </Modal.Content>
        <Modal.Close onClick={() => openState.openCart(false)} />
      </Modal>
    )
}

export default LoadModal