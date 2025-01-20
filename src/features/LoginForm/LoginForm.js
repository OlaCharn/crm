import { useForm } from 'react-hook-form';
import styles from './LoginForm.module.scss';
import { Stack } from '../../shared/ui/Stack/Stack';
import { useState } from 'react';
import { PiEye } from "react-icons/pi";
import { PiEyeClosed } from "react-icons/pi";


export const LoginForm = ({ onSubmit }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const handleFormSubmit = (data) => {
        if (onSubmit) {
            onSubmit(data);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleFormSubmit)} >
            <Stack direction="column" gap={16} align="alignStart">

                <Stack direction="row" gap={8} align="alignCenter" justify="justifyBetween" max >
                    <label htmlFor="username" className={styles.label}>Username</label>
                    <div className={styles.inputWrapper}>
                    <input
                        id="username"
                        type="text"
                        className={styles.input}
                        {...register('username', { required: 'Username is required' })}
                    />
                    {errors.username && (
                        <p className={styles.errorMessage}>{errors.username.message}</p>
                    )}
                    </div>
                </Stack>

            {/* password field */}
            <Stack direction="row" gap={8} align="alignCenter" justify="justifyBetween" max >
                <label htmlFor="password" className={styles.label}>Password</label>
                <div className={styles.inputWrapper}>
                    <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className={styles.input}
                        {...register('password', { required: 'Password is required' })}
                    />
                    {errors.password && (
                        <p className={styles.errorMessage}>{errors.password.message}</p>
                    )}
                    <div className={styles.toggleButtonWrapper}>
                        <button
                            type="button"
                            className={styles.toggleButton} 
                            onClick={() => setShowPassword(prev => !prev)} 
                        >
                            {showPassword ? <PiEyeClosed /> : <PiEye />}
                        </button>
                    </div>
                </div>
            </Stack>

            <Stack gap={16} justify="justifyEnd" align="alignCenter">
                <button type="submit" className={styles.button}>Login</button>
                <button type="button" className={styles.cancelButton}>
                    Cancel
                </button>
            </Stack>
            </Stack>
        </form>
    );
};

