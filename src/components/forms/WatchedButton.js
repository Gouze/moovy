import React, { useEffect, useState } from "react";
import { IconButton } from "@chakra-ui/react";
import { FiCheck } from "react-icons/fi";

import _ from "lodash";

import firebase from "firebase/app";

const WatchedButton = (props) => {
  const db = firebase.firestore();
  const user = firebase.auth().currentUser;
  const [isWatched, setIsWatched] = useState();

  useEffect(() => {
    if (user) {
      const fetchList = db
        .collection("collections")
        .doc(user.uid)
        .onSnapshot((snap) => {
          const result = snap
            .data()
            .watchedList.find((obj) => obj.id === parseInt(props.movieId));
          if (_.isUndefined(result)) {
            setIsWatched(false);
          } else {
            setIsWatched(true);
          }
          console.log(snap.data());
        });

      return () => fetchList();
    }
  }, [props.movieId, db, user]);

  const addMovie = () => {
    const collectionRef = db.collection("collections").doc(user.uid);

    return db
      .runTransaction((transaction) => {
        return transaction.get(collectionRef).then((collection) => {
          const wList = collection.data().watchedList;
          const newObj = {
            id: parseInt(props.movieId),
            addedAt: firebase.firestore.Timestamp.fromDate(new Date()),
          };
          wList.push(newObj);
          transaction.update(collectionRef, { watchedList: wList });
        });
      })
      .then(() => {
        console.log("Transaction successfully committed!");
      })
      .catch((error) => {
        console.log("Transaction failed: ", error);
      });
  };

  const removeMovie = () => {
    const collectionRef = db.collection("collections").doc(user.uid);

    return db
      .runTransaction((transaction) => {
        return transaction.get(collectionRef).then((collection) => {
          const wList = collection.data().watchedList.filter((obj) => {
            return obj.id !== parseInt(props.movieId);
          });

          transaction.update(collectionRef, { watchedList: wList });
        });
      })
      .then(() => {
        console.log("Transaction successfully committed!");
      })
      .catch((error) => {
        console.log("Transaction failed: ", error);
      });
  };

  if (user) {
    if (!_.isUndefined(isWatched)) {
      if (isWatched) {
        return (
          <IconButton color="green.500" onClick={() => removeMovie()}>
            <FiCheck />
          </IconButton>
        );
      } else {
        return (
          <IconButton onClick={() => addMovie()}>
            <FiCheck />
          </IconButton>
        );
      }
    } else {
      return <> </>;
    }
  } else {
    return <> </>;
  }
};

export default WatchedButton;
