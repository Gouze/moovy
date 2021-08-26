import React, { useState, useEffect } from "react";
import {
  Box,
  Heading,
  Text,
  Skeleton,
  Flex,
  Image,
  useColorMode,
  CircularProgress,
  CircularProgressLabel,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css";
import WatchedButton from "../components/forms/WatchedButton";
import { useKonamiCode } from "../hooks/useKonamiCode";
import firebase from "firebase/app";
import AddRiverLinkForm from "../components/forms/AddRiverLinkForm";
import _ from "lodash";

import { DefaultUi, Player, Video } from "@vime/react";
import "@vime/core/themes/default.css";

const MoviePage = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [riversLinks, setRiversLinks] = useState([]);
  const [videoUrl, setVideoUrl] = useState();

  const db = firebase.firestore();

  const { colorMode } = useColorMode();

  useEffect(() => {
    const fetchLinks = db
      .collection("rivers")
      .doc(id)
      .onSnapshot((snap) => {
        if (_.isUndefined(snap.data())) {
          setRiversLinks([]);
        } else {
          setRiversLinks(snap.data().links);
        }
      });
    axios
      .get(
        process.env.REACT_APP_MOVIES_API_GET_MOVIE_BY_ID +
          "/" +
          id +
          process.env.REACT_APP_MOVIES_API_PARAMS
      )
      .then((res) => {
        setIsLoading(false);
        setMovie(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        process.env.REACT_APP_MOVIES_API_GET_MOVIE_BY_ID +
          "/" +
          id +
          process.env.REACT_APP_MOVIES_API_CREDITS_PARAMS
      )
      .then((res) => {
        setCredits(res.data);
      })

      .catch((err) => {
        console.log(err);
      });
    axios
      .get(
        process.env.REACT_APP_MOVIES_API_GET_MOVIE_BY_ID +
          "/" +
          id +
          process.env.REACT_APP_MOVIES_API_VIDEOS_PARAMS
      )
      .then((res) => {
        setVideos(res.data.results);
      })

      .catch((err) => {
        console.log(err);
      });

    return () => fetchLinks();
  }, [id, db]);

  const konami = useKonamiCode();

  const selectRiver = (url) => {
    setVideoUrl(url);
  };

  return (
    <>
      {!!movie && (
        <Box
          minH="80vh"
          // backgroundImage={
          //   movie &&
          //   `url('${
          //     process.env.REACT_APP_MOVIES_API_IMAGES_XL + movie.backdrop_path
          //   }')`
          // }
          // backgroundPosition="center"
          // backgroundRepeat="no-repeat"
          // backgroundSize="cover"
          background={
            colorMode === "light"
              ? `linear-gradient(to left, rgba(255,255,255,0) 0%,
      rgba(255,255,255,1)), linear-gradient(to bottom, rgba(255,255,255,0) 0%,
            rgba(255,255,255,1)), url(${
              process.env.REACT_APP_MOVIES_API_IMAGES_XL + movie.backdrop_path
            }) `
              : `linear-gradient(to left, rgba(13, 13, 25, 0) 0%,
      rgba(13, 13, 25, 1)), linear-gradient(to bottom, rgba(13, 13, 25, 0) 0%,
            rgba(13, 13, 25, 1)), url(${
              process.env.REACT_APP_MOVIES_API_IMAGES_XL + movie.backdrop_path
            }) `
          }
          backgroundSize="cover"
          backgroundPosition="center"
        >
          <Box maxWidth="container.xl" mx="auto" pt="40vh" zIndex="10">
            <Heading as="h2" fontSize="6xl" fontWeight="black" mb="4">
              {isLoading && <Skeleton>Title</Skeleton>}
              {!isLoading && movie && movie.title}{" "}
              <WatchedButton movieId={id} />
            </Heading>
            <Heading as="h3" fontSize="2xl" fontWeight="semibold" mb="2">
              {isLoading && <Skeleton>Title</Skeleton>}

              {movie && movie.original_title}
            </Heading>

            <Text lineHeight="short">
              {movie && new Date(movie.release_date).getFullYear()} |{" "}
              {credits &&
                credits.crew
                  .filter((v, i) => {
                    return v.department === "Directing" && v.job === "Director";
                  })
                  .map((p) => {
                    return <span key={p.id}>{p.name}</span>;
                  })}
            </Text>
            <CircularProgress value={movie.vote_average * 10}>
              <CircularProgressLabel>
                {movie.vote_average}
              </CircularProgressLabel>
            </CircularProgress>
            {konami && (
              <>
                <Heading>GG Morray</Heading>
                <Box>
                  {!!riversLinks &&
                    riversLinks.map((link, index) => {
                      return (
                        <Button onClick={() => selectRiver(link.url)} mr="2">
                          {index + 1} - {link.type}
                        </Button>
                      );
                    })}
                  <Popover>
                    <PopoverTrigger>
                      <Button>Add link</Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Add new media link</PopoverHeader>
                      <PopoverBody>
                        <AddRiverLinkForm movieId={id} />
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>

                  {!!videoUrl && (
                    <Player>
                      <Video>
                        <source data-src={videoUrl} />
                      </Video>
                      <DefaultUi></DefaultUi>
                    </Player>
                  )}
                </Box>
              </>
            )}
          </Box>
        </Box>
      )}

      <Box maxW="container.xl" mx="auto">
        <Heading as="h3">Cast</Heading>
        {credits && (
          <Swiper
            spaceBetween={50}
            slidesPerView={6}
            onSlideChange={() => console.log("slide change")}
            onSwiper={(swiper) => console.log(swiper)}
          >
            {credits &&
              credits.cast.map((p) => {
                return (
                  <SwiperSlide key={p.id}>
                    <Flex flexDirection="column">
                      <Box>
                        <Image
                          borderRadius="md"
                          src={`${
                            process.env.REACT_APP_MOVIES_API_IMAGES_MD +
                            p.profile_path
                          }`}
                        />
                      </Box>
                      <Box textAlign="center">{p.name}</Box>
                    </Flex>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </Box>
    </>
  );
};

export default MoviePage;
