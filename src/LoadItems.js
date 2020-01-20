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
import MakeDesc from "./MakeDesc";
import MakeButtons from './MakeButtons'

const LoadItems = ({ products, cartState, openState }) => {
  return (
    <React.Fragment>
      <Column.Group breakpoint="desktop" multiline gapSize={6}>
        {products.map(this_product => (
          <Column size={3} textAlign="centered">
            <Box color="primary" textAlign="center" size={20}>
              <Content>{this_product.title}</Content>
              <GetImage code={this_product.sku} />
              <MakeDesc code={this_product} />
              <MakeButtons product={this_product} cartState={cartState} openState={openState}/>
            </Box>
          </Column>
        ))}
      </Column.Group>
    </React.Fragment>
  );
};

const GetImage = ({ code }) => {
  const url = "/data/products/" + code + "_1.jpg";
  return <Image src={url} />;
};

export default LoadItems;
