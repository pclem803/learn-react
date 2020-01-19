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

const Banner = () => {
    return (
        <React.Fragment>
          <Block></Block>
          <Column size={12} offset={0}>
            <Notification textAlign="centered" color="warning" >
              <Title>Clement Cart</Title>
              <Content>The best way to shop for your home!</Content>
            </Notification>
          </Column>
          <Block></Block>
        </React.Fragment>
      );
};


export default Banner;
