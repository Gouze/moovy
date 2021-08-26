import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import firebase from "firebase/app";
import _ from "lodash";

const BattlePage = () => {
  const [battle, setBattle] = useState(null);
  const { bid } = useParams();

  const db = firebase.firestore();
  useEffect(() => {
    const fetchBattle = db
      .collection("battles")
      .doc(bid)
      .onSnapshot((snap) => {
        setBattle(snap.data());
      });
  }, [bid]);

  return (
    <div>
      {!!battle && (
        <>
          <h1>{battle.name}</h1>
          <p>{battle.description}</p>
          <ul>
            {battle.opponents.map((item) => {
              return <li>{item.title}</li>;
            })}
          </ul>
        </>
      )}
      {_.isUndefined(battle) && <h1>Battle not found</h1>}
    </div>
  );
};

export default BattlePage;
