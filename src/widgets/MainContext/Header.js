import { Stack } from "../../shared/ui/Stack/Stack"
import styles from "./Header.module.scss"
import { useState } from "react";
import { Modal } from "../../shared/ui/Modal/Modal"; 
import { LoginForm } from "../../features/LoginForm/LoginForm"; 
import { FaRegUser } from "react-icons/fa";


export const Header = ({ title }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);


    return (
        <>
            <Stack 
                direction="row"
                justify="justifyBetween"
                align="alignCenter"
                max
            >
                <p className={styles.p}>{title}</p>

                <button
                    className={styles.iconButton}
                    onClick={openModal} 
                >
                    <FaRegUser size={30} className={styles.iconUser} /> 
                </button>
            </Stack>

            {isModalOpen && (
                <Modal title="Login" onClose={closeModal}>
                    <LoginForm  />
                </Modal>
            )}
        </>
    );
};
