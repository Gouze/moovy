import React, { useState } from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Input, Box, useColorModeValue, Flex } from "@chakra-ui/react";
import { useHistory } from "react-router-dom";
import SearchBarItem from "./SearchBarItem";

const SearchBar = () => {
  const [searchResult, setSearchResult] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const bg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.600");
  const history = useHistory();

  const searchLimit = 5;

  const formik = useFormik({
    initialValues: {
      searchQuery: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  const handleClick = () => {
    setSearchResult([]);
    formik.resetForm();
  };

  const resetSearchBar = () => {
    setSearchResult([]);
    setSelectedIndex(0);
  };

  const handleKeyPress = (e) => {
    if (e.keyCode === 38 || e.keyCode === 40) {
      e.preventDefault();
      if (e.keyCode === 38) {
        if (selectedIndex > 0) {
          setSelectedIndex(selectedIndex - 1);
        } else {
          setSelectedIndex(searchResult.slice(0, 5).length + 1);
        }
      }
      if (e.keyCode === 40) {
        if (selectedIndex < searchResult.slice(0, 5).length + 1) {
          setSelectedIndex(selectedIndex + 1);
        }
      }
    }
    if (e.keyCode === 13) {
      e.preventDefault();

      if (
        selectedIndex < searchResult.slice(0, 5).length + 1 &&
        selectedIndex > 0
      ) {
        history.push(
          `/${searchResult[selectedIndex - 1].media_type}/${
            searchResult[selectedIndex - 1].id
          }`
        );

        formik.resetForm();
        setSearchResult([]);
        setSelectedIndex(0);
      } else if (
        selectedIndex === searchResult.slice(0, 5).length + 1 ||
        selectedIndex === 0
      ) {
        formik.submitForm();
        setSearchResult([]);
        setSelectedIndex(0);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    formik.setFieldValue(name, value);
    setSelectedIndex(0);
    if (e.target.value.length > 2) {
      axios
        .get(process.env.REACT_APP_MOVIES_API_SEARCH + e.target.value)
        .then((res) => {
          setSearchResult(res.data.results);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setSearchResult([]);
  };
  return (
    <>
      {searchResult.length > 0 && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100vw"
          h="100vh"
          bg="transparent"
          onClick={() => resetSearchBar()}
        ></Box>
      )}
      <Box position="relative" w="full">
        <form onSubmit={formik.handleSubmit}>
          <Input
            placeholder="Search movie"
            onChange={handleChange}
            id="searchQuery"
            name="searchQuery"
            type="text"
            value={formik.values.searchQuery}
            onKeyDown={(e) => handleKeyPress(e)}
          />
        </form>

        <Box position="absolute" w="100%">
          {searchResult.length > 0 &&
            searchResult.slice(0, searchLimit).map((result, i) => {
              return <SearchBarItem item={result} onClick={handleClick} />;
            })}
          {searchResult.length > 0 && (
            <Flex
              borderRadius="md"
              p="4"
              my="2"
              bg={
                selectedIndex === searchResult.slice(0, searchLimit).length + 1
                  ? "green.400"
                  : bg
              }
              border="1px"
              borderColor={borderColor}
              _hover={{ bg: "green.400" }}
            >
              See all results
            </Flex>
          )}
        </Box>
      </Box>
    </>
  );
};

export default SearchBar;
