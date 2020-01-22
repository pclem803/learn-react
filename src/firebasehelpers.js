import firebase from "firebase/app";
import "firebase/database";

require("firebase/functions");

const firebaseConfig = {
  apiKey: "AIzaSyAKtSbdBxQlY_vLPIvXJKSO7qe8EcfF9sE",
  authDomain: "clement-cart-f3a8b.firebaseapp.com",
  databaseURL: "https://clement-cart-f3a8b.firebaseio.com",
  projectId: "clement-cart-f3a8b",
  storageBucket: "clement-cart-f3a8b.appspot.com",
  messagingSenderId: "264854384177",
  appId: "1:264854384177:web:fcd9ce4bb98d569fc52f10",
  measurementId: "G-M2NZP82RVD"
};
firebase.initializeApp(firebaseConfig);
var db = firebase.database().ref();

const saveItem = ({ name, creator, unit, houseName }) => {
  const id = generateUUID();
  const itemAttrs = {
    id,
    active: true,
    productName: name,
    unit,
    neededBy: [
      {
        name: creator,
        quantity: 1
      }
    ]
  };
  db.child("houses")
    .child(houseName)
    .child("items")
    .child(id)
    .set(itemAttrs)
    .catch(error => alert(error));
};

const deleteItem = (id, houseName) => {
  db.child("houses")
    .child(houseName)
    .child("items")
    .child(id)
    .update({ active: false })
    .catch(error => alert(error));
};
const S4 = () => {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
};

// https://stackoverflow.com/a/38872723
const generateUUID = () => {
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

const updateItemNumber = (personName, data, incr, houseName) => {
  if (data.neededBy === undefined) {
    data.neededBy = [];
  }
  const entryIndex = Object.values(data.neededBy).findIndex(
    person => person.name === personName
  );
  if (entryIndex === -1) {
    if (incr > 0) {
      db.child("houses")
        .child(houseName)
        .child("items")
        .child(data.id)
        .update({
          neededBy: [
            ...Object.values(data.neededBy),
            {
              name: personName,
              quantity: 1
            }
          ]
        })
        .catch(error => alert(error));
    }
  } else {
    const updatedQty = Math.max(
      0,
      Object.values(data.neededBy)[entryIndex].quantity + incr
    );
    let newNeededBy = Object.values(data.neededBy);
    newNeededBy.splice(entryIndex, 1);
    newNeededBy.push({
      name: personName,
      quantity: updatedQty
    });
    if (updatedQty > 0) {
      db.child("houses")
        .child(houseName)
        .child("items")
        .child(data.id)
        .update({
          neededBy: newNeededBy
        })
        .catch(error => alert(error));
    } else if (updatedQty === 0) {
      newNeededBy.pop();
      db.child("houses")
        .child(houseName)
        .child("items")
        .child(data.id)
        .update({
          neededBy: newNeededBy
        });
    }
  }
};


const createUser = user => {
  let dbData;
  db.once("value", function(data) {
    dbData = data.val();
    if (dbData.users[removeDot(user.email)] === undefined) {
      db.child("users")
        .child(removeDot(user.email))
        .set({
          houses: [],
          email: removeDot(user.email)
        })
        .catch(error => alert(error));
    }
  });
};

export {
  functions,
  saveItem,
  deleteItem,
  db,
  updateItemNumber,
  createUser,
  removeDot
};
