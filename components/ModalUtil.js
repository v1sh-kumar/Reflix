import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@chakra-ui/react";
const ModalUtil = ({
    isOpen,
    onOpen,
    onClose,
    content = <></>,
    motionPreset = "scale",
    scrollBehavior = "",
    size = "md",
    trapFocus = true,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            motionPreset={motionPreset}
            scrollBehavior={scrollBehavior}
            size={size}
            trapFocus={trapFocus}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                {content}
                {/* <ModalHeader>
                </ModalHeader>

                <ModalBody>
                </ModalBody>

                <ModalFooter>
                </ModalFooter> */}
            </ModalContent>
        </Modal>
    );
};

export default ModalUtil;
