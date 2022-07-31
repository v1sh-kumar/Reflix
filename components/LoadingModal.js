import { Flex } from "@chakra-ui/react";
import GridLoader from "react-spinners/GridLoader";
import Fade from "react-reveal/Fade";
const LoadingModal = ({
    display = false,
    backgroundColor = "rgb(255,255,255,0.7)",
    loadingColor = "#1E212B",
    size = 70,
}) => {
    return (
        <Flex
            opacity={display ? "1" : "0"}
            visibility={display ? "visible" : "hidden"}
            width="100vw"
            backgroundColor={backgroundColor}
            justifyContent="center"
            alignItems="center"
            min-height="100vh"
            height="100vh"
            position="absolute"
            transition="visibility 0s, opacity 0.5s linear"
            zIndex={10}
        >
            <Fade bottom>
                <GridLoader size={size} color={loadingColor} />
            </Fade>
        </Flex>
    );
};

export default LoadingModal;
