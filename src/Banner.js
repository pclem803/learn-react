import React, { useEffect, useState } from "react";
import "rbx/index.css";
import {
  Notification,
  Title,
  Content,
  Block,
  Message,
  Button,
  Level,
  Column
} from "rbx";
import firebase from 'firebase/app';
import 'firebase/auth';
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

const Banner = ({ openState, user }) => {
  
  return (
    <React.Fragment>
      <Block></Block>
        <Notification textAlign="centered" color="warning">
          <Title>Clement Cart</Title>
          <Content>A Dynamic E-Commerce Application</Content>
            <Button
              rounded
              size="large"
              color="warning"
              inverted
              onClick={() => openState.openCart(true)}
            >
              Open Cart
            </Button>
        </Notification>
      {user ? <Welcome user={user} /> : <SignIn />}
      <Block/>
    </React.Fragment>
  );
};

const Welcome = ({ user }) => (
  <Column size={4} offset={4}>
    <Notification color="warning">
      <Level>
        <Level.Item>
        Welcome {user.displayName}!
        </Level.Item>
        <Level.Item>
        <Button color="warning" inverted onClick={() => firebase.auth().signOut()}>
        Log out
      </Button>
        </Level.Item>
      </Level>
      
    </Notification>
  </Column>
);

const SignIn = () => (
  <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
);

const uiConfig = {
  signInFlow: "popup",
  signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
  callbacks: {
    signInSuccessWithAuthResult: () => false
  }
};

export default Banner;
