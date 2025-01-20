import { useForm, useFieldArray } from "react-hook-form";
import { BsTrash, BsPlusLg } from "react-icons/bs";
import { Stack } from "../../../shared/ui/Stack/Stack";
import styles from "./Form.module.scss"

export const EditForm = ({ selectedRow, onSubmit, closeModal,  title }) => {
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: selectedRow?.first_name || "",
            last_name: selectedRow?.last_name || "",
            address: selectedRow?.address || "",
            birth_date: selectedRow?.birth_date || "",
            gender: selectedRow?.gender || "",
            preferred_contact_by: selectedRow?.preferred_contact_by || "",
            intern_extern: selectedRow?.intern_extern || "",
            notes: selectedRow?.notes || "",
            phones: selectedRow?.phones || [{ phone: "", notes: "" }],
            emails: selectedRow?.emails || [{ email: "", notes: "" }],
            contacts: selectedRow?.contacts || [{ contact_date: "", contact_by: "", contact_notes: "" }],
            participations: selectedRow?.participations || [{ participation_date: "", participation_place: "", participation_notes: "" }],
            participation_place: selectedRow?.participation_place || "",
        },
    });

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

    const submitForm = (data) => {
        console.log("Updated Data:", data);
        reset();
        onSubmit(data); // Call the onSubmit prop to update data
    };

    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Stack direction="column" gap={8} align="alignStart">   

                {/* First Name */}
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

                {/* Last Name */}
                <Stack direction="row" gap={8} align="alignCenter" max justify="justifyBetween">
                    <label className={styles.label}>Last Name:</label>
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            {...register("last_name", { required: "Last Name is required" })}
                        />
                        {errors.last_name && (
                            <span className={styles.errorMessage}>{errors.last_name.message}</span>
                        )}
                    </div>
                </Stack>

                {/* Address */}
                <Stack max justify="justifyBetween">
                    <label className={styles.label}>Address:</label>
                    <input className={styles.input} {...register("address", { required: false })} />
                </Stack>

                {/* Birth Date */}
                <Stack direction="row" gap={8} align="alignCenter" max justify="justifyStart">
                    <label className={`${styles.label} ${styles.birthMargin}`}>Birth Date:</label>
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.inputDate}
                            type="date"
                            {...register("birth_date", { required: "Birth Date is required" })}
                        />
                        {errors.birth_date && (
                            <span className={styles.errorMessage}>{errors.birth_date.message}</span>
                        )}
                    </div>
                </Stack>

                {/*gender*/}

                <Stack gap={32} max justify="justifyStart">
                    <label className={styles.label}>Gender:</label>
                    <Stack gap={16} >
                        <label className={`${styles.radioLabel} ${styles.birthMargin}`} >
                            <input type="radio" value="male" {...register("gender", { required: false })} /> male
                        </label>
                        <label className={`${styles.radioLabel} ${styles.birthMargin}`}>
                            <input type="radio" value="female" {...register("gender", { required: false })} /> female
                        </label>
                        <label className={`${styles.radioLabel} ${styles.birthMargin}`}>
                            <input type="radio" value="diverce" {...register("gender", { required: false })} /> diverce
                        </label>
    
                    </Stack>
                    {errors.intern_extern && <span>This field is required</span>}
                </Stack>
                

                {/* Phones */}
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
                                    <BsTrash />
                                </button>
                            </Stack>
                        ))}
                    </Stack>
                    <button type="button" className={styles.addButton} onClick={() => appendPhone({ phone: "", notes: "" })}>
                        <BsPlusLg />
                    </button>
                </Stack>

                {/* Emails */}
                <Stack direction="column" gap={8} align="alignStart" max>
                    <label className={styles.label}>Emails:</label>
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

                {/* Preferred Contact */}
                <Stack gap={16} max justify="justifyStart">
                    <label className={styles.label}>Preferred Contact By:</label>
                    <Stack gap={8}>
                        <label className={`${styles.radioLabel} ${styles.birthMargin}`}>
                            <input type="radio" value="email" {...register("preferred_contact_by", { required: false })} />
                            Email
                        </label>
                        <label className={`${styles.radioLabel} ${styles.birthMargin}`}>
                            <input type="radio" value="phone" {...register("preferred_contact_by", { required: false })} />
                            Phone
                        </label>
                    </Stack>
                </Stack>

                {/* int/ext */}
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
                                    defaultValue={field.contact_date}
                                    {...register(`contacts.${index}.contact_date`, { required: false })}
                                    placeholder="Contact Date"
                                    className={styles.inputSmall}
                                />
                                <input
                                    defaultValue={field.contact_by}
                                    {...register(`contacts.${index}.contact_by`)}
                                    placeholder="Contact By"
                                    className={styles.inputSmall}
                                />
                                <input
                                    defaultValue={field.contact_notes}
                                    {...register(`contacts.${index}.contact_notes`)}
                                    placeholder="Notes"
                                    className={styles.inputSmall}
                                />
                                <button
                                    type="button"
                                    className={styles.removeButton}
                                    onClick={() => removeContact(index)}
                                >
                                    <BsTrash />
                                </button>
                            </Stack>
                        ))}
                    </Stack>
                    <button
                        type="button"
                        className={styles.addButton}
                        onClick={() =>
                            appendContact({ contact_date: "", contact_by: "", contact_notes: "" })
                        }
                    >
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
                

                <Stack gap={16} justify="justifyEnd" align="alignCenter">
                    <button type="submit" className={styles.button}>
                        Save Changes
                    </button>
                    <button type="button" className={styles.cancelButton} onClick={closeModal}>
                        Cancel
                    </button>
                </Stack>
            </Stack>
        </form>
    );
};

