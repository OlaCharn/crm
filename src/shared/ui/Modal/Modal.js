import styles from "./Modal.module.scss";

export const Modal = ({ title, children, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* header with close icon */}
                <div className={styles.modalHeader}>
                {title && <h3>{title}</h3>}  

                    <button
                        onClick={onClose}
                        className={styles.closeButton}
                        aria-label="Close modal"
                    >
                        &times;
                    </button>
                </div>
                {/* main content */}
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
};

