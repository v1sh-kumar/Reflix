import { Flex, Heading, Image } from "@chakra-ui/react";
import React from "react";

const TitleCard = ({
    title = "Movie Name",
    image = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F72%2F24%2Ff6%2F7224f6d53614cedbf8cef516b705a555.jpg&f=1&nofb=1",
    width = 200,
    height = 285.25,
    onClick = () => {},
}) => {
    return (
        <Flex
            marginY={{ base: "1em" }}
            marginInline={{ base: "1em" }}
            padding={{ base: "0.5em" }}
            justifyContent="space-evenly"
            alignItems={{ base: "center" }}
            flexDirection={{ base: "column" }}
            width={{ base: "20em" }}
            height={{ base: "30em" }}
            borderRadius={{ base: 6 }}
            boxShadow=" rgba(255, 255, 255, 0.1) 0px 1px 1px 0px inset, rgba(255, 255, 255, 0.1) 0px 50px 70px -20px, rgba(255, 255, 255, 0.1) 0px 30px 60px -30px"
            cursor="pointer"
            onClick={onClick}
        >
            <Image
                src={image}
                alt="Poster"
                width={width}
                height={height}
                transition="0.3s all ease"
                _hover={{
                    transform: "scale(1.1)",
                    transition: "0.5s all ease",
                }}
            />
            <Heading
                padding={{ base: "0.3em" }}
                fontSize={{
                    base: "1.3em",
                    sm: "1.5em",
                    md: "1.5em",
                    lg: "2em",
                }}
                textAlign="center"
                width="100%"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
            >
                {title}
            </Heading>
        </Flex>
    );
};

export default TitleCard;
