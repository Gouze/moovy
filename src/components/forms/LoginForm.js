import React from "react";

import { useFormik } from "formik";
import {
  Input,
  FormControl,
  FormHelperText,
  FormLabel,
  useToast,
} from "@chakra-ui/react";

import firebase from "firebase/app";
import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const toast = useToast();
  const history = useHistory();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      toast({
        title: "Logging in",
        status: "info",
        duration: 2000,
      });
      firebase
        .auth()
        .signInWithEmailAndPassword(values.email, values.password)
        .then((userCredential) => {
          console.log(userCredential);
          toast({
            title: "Successfully logged",
            status: "success",
            duration: 2000,
          });

          history.push("/");
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
export default LoginForm;
