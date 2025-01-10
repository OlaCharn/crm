import { useState } from "react";
import { useForm } from "react-hook-form";
import { Stack } from "../../../shared/ui/Stack/Stack";
import styles from "./Form.module.scss"
import { PiEye } from "react-icons/pi";
import { PiEyeClosed } from "react-icons/pi";

export const AddForm = ({ onSubmit , closeModal }) => {
    const [showPassword, setShowPassword] = useState(false); // Стейт для видимости пароля

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
    });

    const submitForm = (data) => {
        console.log("Submitted Data:", data);
        reset();
        onSubmit(data); // Call the onSubmit prop if needed
    };


    return (
        <form onSubmit={handleSubmit(submitForm)}>
            <Stack direction="column" gap={8} align="alignStart" >

                <Stack direction="row" gap={8} align="alignCenter" justify="justifyBetween" max>
                    <label className={styles.label}>Name:</label>
                    <div className={styles.inputWrapper}>
                        <input
                            className={styles.input}
                            {...register("name", { required: "Name is required" })}
                        />
                        {errors.name && (
                            <span className={styles.errorMessage}>{errors.name.message}</span>
                        )}
                    </div>
                </Stack>

                <Stack direction="row" gap={8} align="alignCenter" max justify="justifyBetween">
                    <label className={styles.label}>Email:</label>
                    <div className={styles.inputWrapper}>
                    <input
                        className={styles.input}
                        type="email" 
                        {...register("email", {
                            required: "Email is required", 
                            pattern: {
                                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                message: "Invalid email format", 
                            },
                        })}
                    />
                    {errors.email && (
                        <span className={styles.errorMessage}>{errors.email.message}</span>
                    )}
                    </div>
                </Stack>

                <Stack direction="row" max justify="justifyBetween" align="alignCenter">
                    <label className={styles.label}>New password:</label>
                    <div className={styles.inputWrapper}>
                        <input 
                            className={styles.input}
                            type={showPassword ? "text" : "password"} // Переключение типа поля
                            {...register("password", { required: true })} 
                        />
                        {errors.password && <span className={styles.errorMessage}>Password is required</span>}
                        
                        {/* Контейнер для кнопки для расположения её справа */}
                        <div className={styles.toggleButtonWrapper}>
                            <button
                                type="button"
                                onClick={() => setShowPassword(prev => !prev)} // Переключение видимости
                                className={styles.toggleButton}
                            >
                                {showPassword ? <PiEyeClosed /> : <PiEye />} 
                            </button>
                        </div>
                    </div>
                </Stack>

                <Stack gap={32} max justify="justifyStart">
                    <label className={styles.label}>Role:</label>
                    <Stack gap={16} >
                        <label className={`${styles.radioLabel} ${styles.birthMargin}`} >
                            <input type="radio" value="viewer" {...register("role", { required: true })} /> viewer
                        </label>
                        <label className={`${styles.radioLabel} ${styles.birthMargin}`}>
                            <input type="radio" value="editor" {...register("role", { required: true })} /> editor
                        </label>
                        <label className={`${styles.radioLabel} ${styles.birthMargin}`}>
                            <input type="radio" value="admin" {...register("role", { required: true })} /> admin
                        </label>
                </Stack>
                {errors.role && <span className={styles.errorMessage}>Please select a role.</span>}
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


