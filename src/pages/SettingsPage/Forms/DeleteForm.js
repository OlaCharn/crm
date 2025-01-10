import { Stack } from "../../../shared/ui/Stack/Stack";
import styles from "./Form.module.scss"

export const DeleteForm = ({ selectedRow, onDelete, onCancel }) => {

    return (
        <Stack direction="column" gap={54} >
            <Stack direction="column" gap={8} >
                <p>Are you sure you want to delete the record?</p>
                <strong>{selectedRow.name} {selectedRow.email} </strong> 
            </Stack>
            <Stack gap={16}>
                <button className={styles.cancelButton}  onClick={onCancel}>
                    Cancel
                </button>
                <button className={styles.button} onClick={onDelete}>
                    Delete
                </button>
            </Stack>
        </Stack>
    );
};