import { useForm, useFieldArray } from "react-hook-form";
import { Stack } from "../../../shared/ui/Stack/Stack";
import styles from "./Form.module.scss"
import { BsTrash } from "react-icons/bs";
import { BsPlusLg } from "react-icons/bs";

export const AddForm = ({ onSubmit , closeModal }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            phones: [{ phone: "", notes: "" }],
            emails: [{ email: "", notes: "" }],
            contacts: [{ contact_date: "", contact_by: "", contact_notes: "" }],
            participations: [{ participation_date: "", participation_place: "", participation_notes: "" }],
        },
    });

    const submitForm = (data) => {
        console.log("Submitted Data:", data);
        reset();
        onSubmit(data); // Call the onSubmit prop if needed
    };

    const { fields: phoneFields, append: appendPhone, remove: removePhone } = useFieldArray({
        control,
        name: "phones",
    });

    const { fields: emailFields, append: appendEmail, remove: removeEmail } = useFieldArray({
        control,
        name: "emails",
    });

    const { fields: contactFields, append: appendContact, remove: removeContact } = useFieldArray({
        control,
        name: "contacts",
    });

    const {
        fields: participationFields,
        append: appendParticipation,
        remove: removeParticipation,
    } = useFieldArray({
        control,
        name: "participations",
    });

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Stack direction="column" gap={8} align="alignStart" >
                <Stack direction="row" gap={8} align="alignCenter" justify="justifyBetween" max>
                    <label className={styles.label}>First Name:</label>
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            {...register("first_name", { required: "First Name is required" })}
                        />
                        {errors.first_name && (
                            <span className={styles.errorMessage}>{errors.first_name.message}</span>
                        )}
                    </div>
                </Stack>

                <Stack direction="row" gap={8}align="alignCenter" max justify="justifyBetween">
                    <label className={styles.label} >Last Name:</label>
                    <div className={styles.inputWrapper}>
                        <input className={styles.input} {...register("last_name", { required: "Last Name is required" })} />
                        {errors.last_name && (
                        <span className={styles.errorMessage}>{errors.last_name.message}</span>
                        )}
                    </div>
                </Stack>

                <Stack  max justify="justifyBetween">
                    <label className={styles.label}>Address:</label>
                    <input className={styles.input} {...register("address", { required: false })} />
                    {errors.address && <span>This field is required</span>}
                </Stack>

                <Stack direction="row" gap={8}align="alignCenter" max justify="justifyStart" >
                    <label className={`${styles.label} ${styles.birthMargin}`} >Birth Date:</label>
                    <div className={styles.inputWrapper}>
                        <input className={styles.inputDate} type="date" {...register("birth_date", { required: "Birth Date is required" })} />
                        {errors.birth_date && (
                            <span className={styles.errorMessage}>{errors.birth_date.message}</span>
                    )}
                    </div>
                </Stack>

                <Stack direction="column" gap={8} align="alignStart" max>
                    <label className={styles.label}>Phones:</label>
                    <Stack direction="column" gap={8} max>
                        {phoneFields.map((field, index) => (
                            <Stack key={field.id} gap={8} direction="row" align="alignCenter" max>
                                <input
                                    {...register(`phones.${index}.phone`, { required: false })}
                                    placeholder="Phone Number"
                                    className={styles.inputSmall}
                                />
                                <input
                                    {...register(`phones.${index}.notes`)}
                                    placeholder="Notes"
                                    className={styles.inputSmall}
                                />
                                <button type="button" className={styles.removeButton} onClick={() => removePhone(index)}>
                                <BsTrash  />
                                </button>
                            </Stack>
                        ))}
                    </Stack>
                    <button type="button" className={styles.addButton} onClick={() => appendPhone({ phone: "", notes: "" })}>
                    <BsPlusLg />
                    </button>
                </Stack>


            <Stack direction="column" gap={8} align="alignStart" max>
                <label className={styles.label} >Emails:</label>
                <Stack direction="column" gap={8} max>
                {emailFields.map((field, index) => (
                    <Stack key={field.id} gap={8} direction="row" align="alignCenter" max>
                        <input
                            {...register(`emails.${index}.email`, { required: false })}
                            placeholder="Email Address"
                            className={styles.inputSmall}
                        />
                        <input
                            {...register(`emails.${index}.notes`)}
                            placeholder="Notes"
                            className={styles.inputSmall}
                        />
                        <button type="button" className={styles.removeButton} onClick={() => removeEmail(index)}>
                            <BsTrash />
                        </button>
                    </Stack>
                ))}
                </Stack>
                <button type="button" className={styles.addButton} onClick={() => appendEmail({ email: "", notes: "" })}>
                <BsPlusLg />
                </button>
            </Stack>

            <Stack gap={16} max justify="justifyStart">
                <label className={styles.label}>Preferred Contact By:</label>
                <Stack gap={8}>
                    <label className={`${styles.radioLabel} ${styles.birthMargin}`}  >
                        <input
                            type="radio"
                            value="email"
                            {...register("preferred_contact_by", { required: false })}
                        />
                        Email
                    </label>
                    <label className={`${styles.radioLabel} ${styles.birthMargin}`} >
                        <input
                            type="radio"
                            value="phone"
                            {...register("preferred_contact_by", { required: false })}
                        />
                        Phone
                    </label>
                </Stack>
                {errors.preferred_contact_by && <span>This field is required</span>}
            </Stack>


            <Stack gap={32} max justify="justifyStart">
                <label className={styles.label}>Internal/External:</label>
                <Stack gap={16} >
                    <label className={`${styles.radioLabel} ${styles.birthMargin}`} >
                        <input type="radio" value="int" {...register("intern_extern", { required: false })} /> Intern
                    </label>
                    <label className={`${styles.radioLabel} ${styles.birthMargin}`}>
                        <input type="radio" value="ext" {...register("intern_extern", { required: false })} /> Extern
                    </label>
                    <label className={`${styles.radioLabel} ${styles.birthMargin}`}>
                        <input type="radio" value="ex-int" {...register("intern_extern", { required: false })} /> Ex-Intern
                    </label>

                </Stack>
                {errors.intern_extern && <span>This field is required</span>}
            </Stack>

            <Stack gap={4} max justify="justifyBetween">
                <label className={styles.label} >Notes:</label>
                <textarea className={styles.textarea} {...register("notes")} placeholder="Notes" />
            </Stack>

            <Stack gap={4} max justify="justifyBetween">
                <label className={styles.label}>Participation Place:</label>
                <input className={styles.input} {...register("participation_place", { required: false })} />
            </Stack>


            <Stack direction="column" gap={8} align="alignStart" max>
                <label className={styles.label}>Contacts:</label>
                <Stack direction="column" gap={8} max>
                {contactFields.map((field, index) => (
                    <Stack key={field.id} gap={8} direction="row" align="alignCenter" max>
                        <input
                            type="date"
                            {...register(`contacts.${index}.contact_date`, { required: false })}
                            placeholder="Contact Date"
                            className={styles.inputSmall}
                        />
                        <input
                            {...register(`contacts.${index}.contact_by`)}
                            placeholder="Contact By"
                            className={styles.inputSmall}
                        />
                        <input
                            {...register(`contacts.${index}.contact_notes`)}
                            placeholder="Notes"
                            className={styles.inputSmall}
                        />
                        <button type="button" className={styles.removeButton} onClick={() => removeContact(index)}>
                            <BsTrash />
                        </button>
                    </Stack>
                ))}
                </Stack>
                <button type="button" className={styles.addButton} onClick={() => appendContact({ contact_date: "", contact_by: "", contact_notes: "" })}>
                <BsPlusLg />
                </button>
            </Stack>

            <Stack direction="column" gap={8} align="alignStart" max>
                <label className={styles.label}>Participations:</label>
                <Stack direction="column" gap={8} max>
                {participationFields.map((field, index) => (
                    <Stack key={field.id} gap={8} direction="row" align="alignCenter" max>
                        <input
                            type="date"
                            {...register(`participations.${index}.participation_date`, { required: false })}
                            placeholder="Participation Date"
                            className={styles.inputSmall}
                        />
                        <input
                            {...register(`participations.${index}.participation_place`)}
                            placeholder="Participation Place"
                            className={styles.inputSmall}
                        />
                        <input
                            {...register(`participations.${index}.participation_notes`)}
                            placeholder="Notes"
                            className={styles.inputSmall}
                        />
                        <button className={styles.removeButton} type="button" onClick={() => removeParticipation(index)}>
                            <BsTrash />
                        </button>
                    </Stack>
                ))}
                </Stack>
                <button type="button"  className={styles.addButton} onClick={() => appendParticipation({ participation_date: "", participation_place: "", participation_notes: "" })}>
                <BsPlusLg />
                </button>
            </Stack>
            <Stack gap={16} justify="justifyEnd" align="alignCenter" >
                <button type="submit" className={styles.button}>
                    Add
                </button>
                <button type="button" className={styles.cancelButton} onClick={closeModal}>
                    Cancel
                </button>

            </Stack>
            </Stack>
        </form>
    );
};


