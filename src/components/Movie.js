import React from "react";

import { Box, Image, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

const Movie = (props) => {
  return (
    <Link
      as={RouterLink}
      maxW="xs"
      display="block"
      to={`/movie/${props.movie.id}`}
      overflow="hidden"
      paddingX="4"
      marginBottom="6"
    >
      <Image
        borderRadius="md"
        src={
          process.env.REACT_APP_MOVIES_API_IMAGES_MD + props.movie.poster_path
        }
      />
      <Box
        mt="1"
        fontWeight="light"
        textAlign="center"
        lineHeight="tight"
        isTruncated
      >
        {props.movie.title}
      </Box>
    </Link>
  );
};

export default Movie;
