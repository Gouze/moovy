import React from "react";

import { FormControl, FormLabel, Input, Stack, Button } from "@chakra-ui/react";
import { useFormik } from "formik";
import firebase from "firebase";
import _ from "lodash";

const AddRiverLinkForm = (props) => {
  const db = firebase.firestore();
  const formik = useFormik({
    initialValues: {
      riverLink: "",
      riverType: "",
    },
    onSubmit: (values) => {
      const riverRef = db.collection("rivers").doc(props.movieId);
      return db
        .runTransaction((transaction) => {
          return transaction.get(riverRef).then((collection) => {
            if (_.isUndefined(collection.data())) {
              const linksList = [];
              const newLink = {
                url: values.riverLink,
                type: values.riverType,
              };
              linksList.push(newLink);
              transaction.set(riverRef, { links: linksList });
            } else {
              const linksList = collection.data().links;
              const newLink = {
                url: values.riverLink,
                type: values.riverType,
              };
              linksList.push(newLink);
              transaction.update(riverRef, { links: linksList });
            }
          });
        })
        .then(() => {
          console.log("Transaction successfully committed!");
        })
        .catch((error) => {
          console.log("Transaction failed: ", error);
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Stack spacing={4}>
        <FormControl id="riverLink">
          <FormLabel>Magnet Link</FormLabel>
          <Input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </FormControl>
        <FormControl id="riverType">
          <FormLabel>Type</FormLabel>
          <Input
            type="text"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
        </FormControl>
        <Stack spacing={10}>
          <Button
            bg={"blue.400"}
            color={"white"}
            _hover={{
              bg: "blue.500",
            }}
            type="submit"
          >
            Add link
          </Button>
        </Stack>
      </Stack>
    </form>
  );
};

export default AddRiverLinkForm;
