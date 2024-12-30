import { ActionButton } from "../ui/Buttons/ActionButton";

export const DeleteForm = ({ selectedRow, onDelete, onCancel }) => {
    /*
    if (!selectedRow) {
        return <p>No record selected for deletion.</p>;
    }
    */

    return (
        <div >
            <h3>Confirm Deletion</h3>
            <p>
            Are you sure you want to delete the record for{" "}
            <strong>{selectedRow.first_name} {selectedRow.last_name}</strong>?
            </p>
            <div >
            <ActionButton  onClick={onDelete}>
                Delete
            </ActionButton>
            <ActionButton  onClick={onCancel}>
                Cancel
            </ActionButton>
            </div>
        </div>
    );
};