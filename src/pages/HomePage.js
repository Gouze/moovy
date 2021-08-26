import React, { useState, useEffect } from "react";
import axios from "axios";

import { Flex, Box, Heading } from "@chakra-ui/react";

import Movie from "../components/Movie";

const HomePage = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_MOVIES_API_FEATURED)
      .then((res) => {
        setMovies(res.data.results);
      })

      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <Box maxWidth="container.xl" mx="auto" pt="20">
      <Heading marginBottom="6">Les films du moment</Heading>
      <Flex flexWrap="wrap">
        {movies.length > 0 &&
          movies.map((movie) => <Movie key={movie.id} movie={movie} />)}
      </Flex>
    </Box>
  );
};

export default HomePage;
