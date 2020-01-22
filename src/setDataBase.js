import React, { useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import "firebase/database";

const setDataBase = ({ userState, new_cart }) => {
  if (userState.user) {
    let id = userState.user.displayName;
    let db = firebase.database().ref();
    let user_attributes;
    if (new_cart === undefined) {
      let new_cart= []
      console.log('hello')
      user_attributes = {
        name: id,
        cart: new_cart
      };
    } else {
      user_attributes = {
        name: id,
        cart: new_cart
      };
    }
    db.child("Users")
      .child(id)
      .set(user_attributes);
  }
};

export default setDataBase;
