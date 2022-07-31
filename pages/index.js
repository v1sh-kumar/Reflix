import {
    Tabs,
    Flex,
    TabList,
    Tab,
    Heading,
    TabPanels,
    TabPanel,
    useToast,
    ModalHeader,
    ModalBody,
    useDisclosure,
    Divider,
    Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TitleCard from "../components/TitleCard";
import LoadingModal from "../components/LoadingModal";
import ModalUtil from "../components/ModalUtil";
import fetchFunc from "../components/apiFunctions";
import ReactPlayer from "react-player";
export default function Home() {
    const {
        isOpen: movieModalIsOpen,
        onOpen: movieModalOnOpen,
        onClose: movieModalOnClose,
    } = useDisclosure();
    const [loading, setloading] = useState(false);

    const [content, setcontent] = useState(<></>);

    const [genres, setgenres] = useState([]);

    const [titles, settitles] = useState([]);

    const [tabIndex, settabIndex] = useState(0);

    const toast = useToast();
    useEffect(() => {
        async function fetchGenreData() {
            setloading(true);
            const res = await fetchFunc("getGenres");
            // Check Response Status
            if (res.status == 500) {
                toast({
                    title: "Server Error.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else if (res.status == 200) {
                if (res.json.data.length > 0) {
                    setgenres(res.json.data);
                }
            }

            setloading(false);
        }

        async function fetchTitleData() {
            setloading(true);
            const res = await fetchFunc("getTitles", {
                genre: genres[tabIndex],
            });
            // Check Response Status
            if (res.status == 500) {
                toast({
                    title: "Server Error.",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                });
            } else if (res.status == 200) {
                if (res.json.data.length > 0) {
                    console.log(res.json.data);
                    settitles(res.json.data);
                }
            }

            setloading(false);
        }
        if (genres.length == 0) {
            fetchGenreData();
        } else if (titles.length == 0) {
            fetchTitleData();
        }
    }, [toast, tabIndex, genres]);

    return (
        <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="flex-start"
            width="100%"
            height="max-content"
            bg="primary"
            color="white"
        >
            <Heading
                fontSize={{
                    base: "2.8em",
                    sm: "3em",
                    md: "3.5em",
                    lg: "4.5em",
                }}
                marginY={{ base: "0.5em" }}
                textShadow="2px 2px 3px white"
            >
                REFLIX
            </Heading>
            <Tabs
                width="100%"
                variant="enclosed"
                isFitted
                onChange={(index) => {
                    settitles([]);
                    settabIndex(index);
                }}
                flexWrap="wrap"
            >
                <TabList>
                    {genres.map((item) => {
                        return (
                            <Tab
                                key={item}
                                fontSize={{ base: "1.2em" }}
                                _focus={{ borderBottomColor: "primary" }}
                                _active={{ borderBottomColor: "primary" }}
                            >
                                {item.name}
                            </Tab>
                        );
                    })}
                </TabList>
                <Flex
                    justifyContent="space-evenly"
                    alignItems="center"
                    flexWrap="wrap"
                    width="100%"
                    marginTop={{ base: "1.5em" }}
                    marginBottom={{ base: "1.5em" }}
                >
                    {titles.map((item) => {
                        return (
                            <TitleCard
                                title={item.name}
                                key={item}
                                image={item.image}
                                onClick={() => {
                                    setcontent(
                                        <>
                                            <ModalHeader>
                                                {item.name}
                                            </ModalHeader>
                                            <ModalBody
                                                display="flex"
                                                justifyContent="center"
                                                alignItems="center"
                                            >
                                                <ReactPlayer url={item.video} />
                                            </ModalBody>
                                        </>
                                    );
                                    movieModalOnOpen();
                                }}
                            />
                        );
                    })}
                </Flex>
            </Tabs>
            <Divider width="95%" />
            <Text width="100%" textAlign="center" marginY={{ base: "2em" }}>
                (C) 2022, Reflix. <br />
                All rights reserved. Reflix trademark registered under
                Vishruthh.
            </Text>
            <LoadingModal display={loading} />
            <ModalUtil
                isOpen={movieModalIsOpen}
                onClose={movieModalOnClose}
                size="2xl"
                content={content}
            />
        </Flex>
    );
}
