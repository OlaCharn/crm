import styles from "./Modal.module.scss";

export const Modal = ({ title, children, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Заголовок с кнопкой закрытия */}
                <div className={styles.modalHeader}>
                {title && <h3>{title}</h3>}  {/* Отображаем title, если он передан */}

                    <button
                        onClick={onClose}
                        className={styles.closeButton}
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                {/* Основной контент */}
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
};

