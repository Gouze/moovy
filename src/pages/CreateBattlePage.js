import React, { useState, useEffect } from "react";

import axios from "axios";

import {
  Heading,
  Box,
  FormLabel,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  Flex,
  Button,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
} from "@chakra-ui/react";

import _ from "lodash";
import firebase from "firebase/app";
import { FiCheck, FiTrash } from "react-icons/fi";
import { hri } from "human-readable-ids";

const CreateBattlePage = () => {
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [queryResult, setQueryResult] = useState([]);
  const [battleType, setBattleType] = useState();
  const [duration, setDuration] = useState(15);
  const [battleName, setBattleName] = useState("");
  const [battleDesc, setBattleDesc] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [createdBattleUrl, setCreatedBattleUrl] = useState("");

  const user = firebase.auth().currentUser;
  const db = firebase.firestore();

  const createBattle = () => {
    const battleId = hri.random();
    const items = selectedMovies;
    items.forEach((element) => {
      element.battleScore = 0;
    });

    db.collection("battles")
      .doc(battleId)
      .set({
        creator: user.uid,
        createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
        finishAt: firebase.firestore.Timestamp.fromDate(
          new Date(new Date().getTime() + duration * 60000)
        ),
        name: battleName,
        description: battleDesc,
        type: battleType,
        opponents: items,
      })
      .then(() => {
        setIsDone(true);
        setCreatedBattleUrl(`${window.location.host}/battle/${battleId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSearchChange = (e) => {
    if (e.target.value.length > 0) {
      axios
        .get(
          (battleType === "movie"
            ? process.env.REACT_APP_MOVIES_API_SEARCH_MOVIE
            : process.env.REACT_APP_MOVIES_API_SEARCH_TV) + e.target.value
        )
        .then((res) => {
          setQueryResult(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setQueryResult([]);
  };

  const addToSelectedItems = (item) => {
    setSelectedMovies((selectedMovies) => [...selectedMovies, item]);
  };

  const removeFromSelectedItems = (item) => {
    setSelectedMovies(selectedMovies.filter((result) => result !== item));
  };

  const copyToClipboard = (url) => {
    navigator.clipboard.writeText(url);
  };
  return (
    <div>
      {isDone && (
        <Box maxWidth="container.xl" mx="auto" pt="78px">
          <Text>Battle créée</Text>
          <Flex>
            <InputGroup>
              <InputLeftAddon children="URL" />
              <Input
                type="tel"
                placeholder="phone number"
                value={createdBattleUrl}
              />
            </InputGroup>
            <Button onClick={() => copyToClipboard(createdBattleUrl)}>
              Copy
            </Button>
          </Flex>
        </Box>
      )}
      {!isDone && (
        <Box maxWidth="container.xl" mx="auto" pt="78px">
          <Heading marginBottom="6" textAlign="center">
            Créer une battle{" "}
          </Heading>
          {_.isUndefined(battleType) && (
            <>
              <Button onClick={() => setBattleType("movie")}>Movie</Button>
              <Button onClick={() => setBattleType("tv")}>Tv Show</Button>
            </>
          )}

          {!_.isUndefined(battleType) && (
            <>
              <FormControl mb="4">
                <FormLabel>Nom de la battle</FormLabel>
                <Input
                  type="text"
                  onChange={(e) => setBattleName(e.target.value)}
                />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Description</FormLabel>

                <Textarea onChange={(e) => setBattleDesc(e.target.value)} />
              </FormControl>
              <FormControl mb="4">
                <FormLabel>Duration</FormLabel>
                <NumberInput
                  defaultValue={60}
                  min={1}
                  max={120}
                  onChange={(e) => setDuration(e)}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>
              <Flex>
                <Box w={3 / 4} mr="6">
                  <Heading fontSize="xl" mb="2">
                    Recherchez les {battleType === "movie" ? "films" : "séries"}{" "}
                    à sélectionner
                  </Heading>
                  <Input type="text" onChange={(e) => handleSearchChange(e)} />
                  {queryResult.length > 0 && (
                    <Box maxH="sm" paddingY="2" overflow="auto">
                      {queryResult.length > 0 &&
                        queryResult.map((result, i) => {
                          return (
                            <Box key={i} py="2">
                              {battleType === "movie"
                                ? result.title
                                : result.name}
                              {_.includes(selectedMovies, result) ? (
                                <Button
                                  ml="2"
                                  size="sm"
                                  colorScheme="green"
                                  onClick={() =>
                                    removeFromSelectedItems(result)
                                  }
                                >
                                  <FiCheck />
                                </Button>
                              ) : (
                                <Button
                                  ml="2"
                                  size="sm"
                                  onClick={() => addToSelectedItems(result)}
                                >
                                  +
                                </Button>
                              )}
                            </Box>
                          );
                        })}
                    </Box>
                  )}
                </Box>
                <Box width={1 / 4}>
                  <Heading fontSize="xl" mb="2">
                    {battleType === "movie"
                      ? "Films selectionnés"
                      : "Séries sélectionnées"}
                  </Heading>
                  <Box
                    item={selectedMovies}
                    borderTop="1px"
                    borderBottom="1px"
                    paddingY="2"
                    borderColor="gray.500"
                  >
                    <>
                      {selectedMovies.length == 0 && (
                        <Text color="gray.100">
                          {battleType === "movie"
                            ? "Aucun film sélectionné"
                            : "Aucune série sélectionnée"}
                        </Text>
                      )}
                      {selectedMovies.length > 0 &&
                        selectedMovies.map((result) => {
                          return (
                            <Box key={result.id} marginY="2">
                              {battleType === "movie"
                                ? result.title
                                : result.name}{" "}
                              <Button
                                size="sm"
                                onClick={() => removeFromSelectedItems(result)}
                              >
                                <FiTrash color="red.50" />
                              </Button>
                            </Box>
                          );
                        })}
                    </>
                  </Box>
                  <Box marginTop="4">
                    {selectedMovies.length > 0 && (
                      <Button
                        colorScheme="green"
                        onClick={() => createBattle()}
                      >
                        Create Battle
                      </Button>
                    )}
                    {selectedMovies.length == 0 && (
                      <Button isDisabled>Create Battle</Button>
                    )}
                  </Box>
                </Box>
              </Flex>
            </>
          )}
        </Box>
      )}
    </div>
  );
};

export default CreateBattlePage;
