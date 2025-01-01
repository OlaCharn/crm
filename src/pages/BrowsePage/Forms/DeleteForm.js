import { Stack } from "../../../shared/ui/Stack/Stack";
import styles from "./Form.module.scss"

export const DeleteForm = ({ selectedRow, onDelete, onCancel ,  title}) => {
    /*
    if (!selectedRow) {
        return <p>No record selected for deletion.</p>;
    }
    */

    return (
        <Stack direction="column" gap={16} >
            <h3>{title}</h3> 
                <p>
            Are you sure you want to delete the record for{" "}
            <strong>{selectedRow.first_name} {selectedRow.last_name}, date of birth : {selectedRow.birth_date} </strong>?
            </p>
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