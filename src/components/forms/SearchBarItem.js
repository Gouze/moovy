import React from "react";
import {
  Link,
  Box,
  Image,
  Badge,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";

import { Link as RouterLink } from "react-router-dom";

const SearchBarItem = (props) => {
  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");

  if (props.item.media_type === "movie") {
    return (
      <Link
        as={RouterLink}
        to={`/${props.item.media_type}/${props.item.id}`}
        zIndex="200"
        display="flex"
        onClick={props.onClick}
        borderRadius="md"
        p="4"
        my="2"
        bg={bg}
        border="1px"
        borderColor={borderColor}
        _hover={{ bg: "green.400" }}
      >
        <Box maxW="60px" mr="4">
          <Image
            w="52px"
            borderRadius="sm"
            mx="auto"
            src={
              process.env.REACT_APP_MOVIES_API_IMAGES_XS +
              props.item.poster_path
            }
          />
        </Box>
        <Flex w="100%" flexDirection="column" justifyContent="center">
          <Text>
            {props.item.title} (
            {new Date(props.item.release_date).getFullYear()})
          </Text>
          <Text>{props.item.original_title}</Text>
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Badge fontSize="xs" mx="auto" w="full" textAlign="center">
            {props.item.media_type}
          </Badge>
        </Flex>
      </Link>
    );
  } else if (props.item.media_type === "tv") {
    return (
      <Link
        as={RouterLink}
        to={`/${props.item.media_type}/${props.item.id}`}
        zIndex="200"
        display="flex"
        onClick={props.onClick}
        borderRadius="md"
        p="4"
        my="2"
        bg={bg}
        border="1px"
        borderColor={borderColor}
        _hover={{ bg: "green.400" }}
      >
        <Box maxW="60px" mr="4">
          <Image
            w="52px"
            borderRadius="sm"
            mx="auto"
            src={
              process.env.REACT_APP_MOVIES_API_IMAGES_XS +
              props.item.poster_path
            }
          />
        </Box>
        <Flex w="100%" flexDirection="column" justifyContent="center">
          <Text>
            {props.item.name} (
            {new Date(props.item.first_air_date).getFullYear()})
          </Text>
          <Text>{props.item.original_name}</Text>
        </Flex>
        <Flex flexDirection="column" justifyContent="center">
          <Badge fontSize="xs" mx="auto" w="full" textAlign="center">
            {props.item.media_type}
          </Badge>
        </Flex>
      </Link>
    );
  } else if (props.item.media_type === "person") {
    return (
      <Link
        as={RouterLink}
        to={`/${props.item.media_type}/${props.item.id}`}
        zIndex="200"
        display="flex"
        onClick={props.onClick}
      >
        {props.item.name}
      </Link>
    );
  }

  // <Flex
  //   borderRadius="md"
  //   p="4"
  //   my="2"
  //   bg={selectedIndex === i + 1 ? "green.400" : bg}
  //   border="1px"
  //   borderColor={borderColor}
  //   _hover={{ bg: "green.400" }}
  //   onClick={(e) => handleClick(e, result.media_type, result.id)}
  //   key={result.id}
  // >
  //   <Box maxW="60px" mr="4">
  //     <Image
  //       w="52px"
  //       borderRadius="sm"
  //       mx="auto"
  //       src={process.env.REACT_APP_MOVIES_API_IMAGES_XS + result.poster_path}
  //     />

  //     <Badge fontSize="xx-small" mx="auto" w="full" textAlign="center">
  //       {result.media_type}
  //     </Badge>
  //   </Box>
  //   <Box>
  //     <Box fontSize="xl" fontWeight="extrabold">
  //       {result.media_type === "movie" && (
  //         <Text display="inline-block">{result.title}</Text>
  //       )}{" "}
  //       {result.media_type === "movie" && (
  //         <Text display="inline-block" color="gray.400">
  //           ({new Date(result.release_date).getFullYear()})
  //         </Text>
  //       )}
  //       {result.media_type === "tv" && (
  //         <Text display="inline-block">{result.name}</Text>
  //       )}{" "}
  //       {result.media_type === "tv" && (
  //         <Text display="inline-block" color="gray.400">
  //           ({new Date(result.first_air_date).getFullYear()})
  //         </Text>
  //       )}
  //     </Box>
  //     {result.media_type === "movie" && (
  //       <Box fontSize="md" fontWeight="normal">
  //         {result.original_title}
  //       </Box>
  //     )}
  //     {result.media_type === "tv" && (
  //       <Box fontSize="md" fontWeight="normal">
  //         {result.original_name}
  //       </Box>
  //     )}
  //   </Box>
  // </Flex>
};

export default SearchBarItem;
