import React, { useEffect, useState } from "react";
import "rbx/index.css";
import {
  Content,
} from "rbx";

const MakeDesc = ({ code, addState, cartState }) => {
    let code_string = code.price.toString();
    if (!code_string.includes(".")) {
      code_string += ".";
    }
    let dec_point = code_string.indexOf(".");
    let cents = code_string.substr(dec_point);
    let dollar_price = Math.floor(code.price);
    while (cents.length < 3) {
      cents = cents + "0";
    }
    return (
      <Content size="large">
        $<strong>{dollar_price}</strong>
        {cents}
      </Content>
    );
  };

export default MakeDesc