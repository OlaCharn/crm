import { useState } from "react";
import { useForm } from "react-hook-form";
import { BoxWhiteBackground } from "../../shared/ui/BoxWhiteBackground/BoxWhiteBackground";
import { Stack } from "../../shared/ui/Stack/Stack";
import styles from "./Dashboard.module.scss"
//import { ActionButton } from "../BrowsePage/ui/Buttons/ActionButton";

const DashboardPage = () => {
    const { register,  formState: { errors }, watch } = useForm(); // React Hook Form
    const count = 19;
    const inactiveCount = 5;



    const monthsValue = watch("months"); // watch for months

    return (
        <BoxWhiteBackground>
            <div>
            <Stack direction="column" align="alignStart" gap={32}>
                <div>{count} persons in database.</div>
                <form >
                    <Stack direction="row" gap={16} justify="justifyStart">
                        <input
                            type="number"
                            {...register("months", { required: "Please enter the number of months" })}
                            placeholder="Enter months"
                            className={styles.inputDate}
                        />
                        <button className={styles.button} type="submit">Count</button>
                    </Stack>
                </form>
                </Stack>

                {errors.months && <p className={styles.errorMessage}>{errors.months.message}</p>}

                {inactiveCount !== null && !errors.months && (
                    <p className={styles.resultMessage} >{inactiveCount} people have been inactive for the last {monthsValue} months</p>
                )}
                </div>
        </BoxWhiteBackground>
    );
};

export default DashboardPage;



