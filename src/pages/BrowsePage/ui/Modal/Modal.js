import styles from "./Modal.module.scss";

export const Modal = ({ title, children, onClose }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {/* Заголовок с кнопкой закрытия */}
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
                {/* Основной контент */}
                <div className={styles.modalBody}>{children}</div>
            </div>
        </div>
    );
};

/* Modal.js
import React from 'react';

export const Modal = ({ isOpen, closeModal, contentType, data }) => {
    if (!isOpen) return null;

    const getContent = () => {
        switch (contentType) {
            case 'add':
                return (
                    <div>
                        <h2>Add New Person</h2>
                    </div>
                );
            case 'edit':
                return (
                    <div>
                        <h2>Edit Person</h2>
                    </div>
                );
            case 'delete':
                return (
                    <div>
                        <h2>Are you sure you want to delete this person?</h2>
                        <button onClick={() => closeModal()}>Yes</button>
                        <button onClick={() => closeModal()}>No</button>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                {getContent()}
            </div>
        </div>
    );
};


*/
