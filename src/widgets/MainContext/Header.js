import { Stack } from "../../shared/ui/Stack/Stack"
import styles from "./Header.module.scss"
import { useState, useEffect } from "react";
import { Modal } from "../../shared/ui/Modal/Modal"; 
import { LoginForm } from "../../features/LoginForm/LoginForm"; 
import { useAuth } from "../../features/auth/AuthProvider";
import { FiLogOut } from "react-icons/fi";
import { FaRegUser } from "react-icons/fa";


export const Header = ({ title }) => {
    const { user, logout, login } = useAuth();
    const [isModalOpen, setModalOpen] = useState(false);

    // Обработчики для модального окна
    const openModal = () => setModalOpen(true);
    const closeModal = () => setModalOpen(false);

    const handleLoginSubmit = async (data) => {
        console.log("FORM !!! Login successful:", data);
        await login(data.username, data.password);
        closeModal(); // Закрываем модальное окно после успешного логина
    };
    useEffect(() => {
        console.log('User state in Header:', user); // Логируем состояние user
    }, [user]); // Будет вызываться всякий раз, когда user меняется

    return (
        <>
            <Stack 
                direction="row"
                justify="justifyBetween"
                align="alignCenter"
                max
            >
                <p className={styles.p}>{title}</p>

                {/* Кнопка для авторизации или выхода */}
                <button
                    className={styles.iconButton}
                    onClick={user ? logout : openModal} // Если пользователь авторизован, вызываем logout, иначе открываем модальное окно
                    aria-label={user ? "Logout" : "Open login modal"}
                >
                    {user ? <FiLogOut size={30} className={styles.iconUser} /> : <FaRegUser size={30} className={styles.iconUser} />}  {/* Если пользователь авторизован, показываем иконку Logout, иначе UserIcon */}
                </button>
            </Stack>

            {/* Модальное окно с LoginForm */}
            {isModalOpen && (
                <Modal title="Login" onClose={closeModal}>
                    <LoginForm onSubmit={handleLoginSubmit} />
                </Modal>
            )}
        </>
    );
};
/*
export const Header = ( {title} ) => {
    return (
        <Stack 
            direction = "row"
            justify = "justifyBetween"
            align = "alignCenter"
            max
        >
            <p className={styles.p} > {title} </p>
            <UserIcon />
        </Stack>
    )
}
*/