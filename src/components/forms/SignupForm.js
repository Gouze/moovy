import React from "react";

import { useFormik } from "formik";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@chakra-ui/react";

import { SignupSchema } from "../../validators/SignupSchema";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const SignupForm = () => {
  const db = firebase.firestore();
  const formik = useFormik({
    initialValues: {
      displayName: "",
      email: "",
      password: "",
    },
    validationSchema: SignupSchema,

    onSubmit: (values) => {
      firebase
        .auth()
        .createUserWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          db.collection("users")
            .doc(userCredential.user.uid)
            .set({
              displayName: values.displayName,
            })
            .then(() => {
              db.collection("collections")
                .doc(userCredential.user.uid)
                .set({
                  watchedList: [],
                })
                .then(() => {
                  console.log("User created");
                })
                .catch((error) => {
                  console.error("Error writing document: ", error);
                });
            })
            .catch((error) => {
              console.error("Error writing document: ", error);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode, errorMessage);
        });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <FormControl id="displayName">
        <FormLabel>Display name</FormLabel>
        <Input
          id="displayName"
          name="displayName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.displayName}
        />
      </FormControl>
      <FormControl id="email">
        <FormLabel>Email address</FormLabel>
        <Input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        <FormHelperText>{formik.errors.email}</FormHelperText>
      </FormControl>
      <FormControl id="password" mt="2">
        <FormLabel>Password</FormLabel>
        <Input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          value={formik.values.password}
        />
        <FormHelperText>{formik.errors.password}</FormHelperText>
      </FormControl>

      <button type="submit">Submit</button>
    </form>
  );
};
export default SignupForm;
