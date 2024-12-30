export const EditForm = ({ selectedRow, onSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const updatedData = {
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
        };
        onSubmit(updatedData); // Обработчик обновления данных
    };

    return (
        <>
            <h4>Edit Person</h4>
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        name="first_name"
                        type="text"
                        defaultValue={selectedRow?.first_name || ""}
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        name="last_name"
                        type="text"
                        defaultValue={selectedRow?.last_name || ""}
                    />
                </label>
                <button type="submit">Save Changes</button>
            </form>
        </>
    );
};