import React, { useEffect, useState } from "react";
import "rbx/index.css";
import {
  Notification,
  Title,
  Content,
  Block,
  Message,
  Button,
  Column
} from "rbx";

const Banner = ({openState}) => {
    return (
        <React.Fragment>
          <Block></Block>
          <Column size={12} offset={0}>
            <Notification textAlign="centered" color="warning" >
              <Title>Clement Cart</Title>
              <Content>A Dynamic E-Commerce Application</Content>
              <Button rounded size="large" color="warning" inverted onClick={()=>openState.openCart(true)}>Open Cart</Button>
            </Notification>
          </Column>
          <Block></Block>
        </React.Fragment>
      );
};


export default Banner;
