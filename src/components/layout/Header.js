import React from "react";
import { useColorMode, IconButton, Flex, Box, Button } from "@chakra-ui/react";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";

import { Link } from "react-router-dom";
import SearchBar from "../forms/SearchBar";

import {
  FirebaseAuthConsumer,
  IfFirebaseAuthed,
  IfFirebaseUnAuthed,
} from "@react-firebase/auth";
import { FiPower } from "react-icons/fi";
import firebase from "firebase/app";
import "firebase/auth";

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  const logout = () => {
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("logged out");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box
      as="header"
      position="fixed"
      width="100%"
      h="68px"
      bgGradient="linear(to-b, black, transparent)"
      zIndex="100"
    >
      <Flex maxW="container.xl" marginX="auto" justifyContent="center" h="full">
        <Flex alignItems="center" w="25%">
          Mouvy
        </Flex>
        <Flex alignItems="center" w="50%">
          <SearchBar />
        </Flex>
        <Flex
          w="25%"
          justifyContent="end"
          alignItems="center"
          textAlign="right"
        >
          <IfFirebaseUnAuthed>
            {({ authState }) => {
              return (
                <>
                  <Button mr="2" as={Link} to="/login/">
                    Login
                  </Button>
                  <Button as={Link} to="/signup/">
                    Signup
                  </Button>
                </>
              );
            }}
          </IfFirebaseUnAuthed>
          <IfFirebaseAuthed>
            {() => (
              <>
                <FirebaseAuthConsumer>
                  {({ user }) => {
                    return <span>{user.displayName}</span>;
                  }}
                </FirebaseAuthConsumer>
                <IconButton
                  borderRadius="full"
                  bg="transparent"
                  mr="2"
                  onClick={logout}
                >
                  <FiPower />
                </IconButton>
              </>
            )}
          </IfFirebaseAuthed>
          <IconButton
            borderRadius="full"
            bg="transparent"
            mr="2"
            onClick={toggleColorMode}
          >
            {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
          </IconButton>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
