import styles from "./Modal.module.scss";

// Modal.js
import React from 'react';

export const Modal = ({ isOpen, closeModal, contentType, data }) => {
    if (!isOpen) return null;

    const getContent = () => {
        switch (contentType) {
            case 'add':
                return (
                    <div>
                        <h2>Add New Person</h2>
                        {/* Здесь можно разместить форму для добавления */}
                    </div>
                );
            case 'edit':
                return (
                    <div>
                        <h2>Edit Person</h2>
                        {/* Здесь можно разместить форму для редактирования */}
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


/*
const Modal = ({ title, children, onConfirm, onCancel }) => {
    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
                <h3>{title}</h3>
                <div className={styles.modalBody}>{children}</div>
                <div className={styles.modalActions}>
                    <button onClick={onCancel} className={styles.cancelButton}>
                        Cancel
                    </button>
                    <button onClick={onConfirm} className={styles.confirmButton}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};
*/
