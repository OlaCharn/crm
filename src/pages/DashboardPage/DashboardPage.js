import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BoxWhiteBackground } from "../../shared/ui/BoxWhiteBackground/BoxWhiteBackground";
import apiService from "../../app/Services/apiService";
import { Stack } from "../../shared/ui/Stack/Stack";
import styles from "./Dashboard.module.scss"
import { RingLoaderComponent } from "../../shared/ui/Loader/RingLoaderComponent";
import { useAuth } from "../../features/auth/AuthProvider";
//import { ActionButton } from "../BrowsePage/ui/Buttons/ActionButton";

const DashboardPage = () => {
    const { user } = useAuth();
    const { register, handleSubmit, formState: { errors }, watch } = useForm(); // React Hook Form
    const [count, setCount] = useState(null); 
    const [inactiveCount, setInactiveCount] = useState(null); 
    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    // fetch data
    useEffect(() => {
        const fetchCount = async () => {
            setIsLoading(true);
            try {
                const response = await apiService.countPersons(); 
                setCount(response.count); 
                setError(null);
            } catch (err) {
                console.error("Loading error:", err.message);
                setError("No data available");
                setCount(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCount();
    }, []);

    // fetch inactive depends on month
    const fetchInactiveCount = async (data) => {
        const { months } = data; 
        if (!months) return;
        setIsLoading(true);
        try {
            const response = await apiService.countPersonsInactiveSinceMonths(months);
            setInactiveCount(response.count);
            setError(null);
        } catch (err) {
            console.error("Loading error:", err.message);
            setError("No data available");
            setInactiveCount(null);
        } finally {
            setIsLoading(false);
        }
    };

    if (!user) {
        return <div>Please login to access the Dashboard</div>;
    }
    if (isLoading) {
        return <div> <RingLoaderComponent /> </div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (count === null) {
        return <div>No data available</div>;
    }

    const monthsValue = watch("months"); // watch for months

    return (
        <BoxWhiteBackground>
            <div>
            <Stack direction="column" align="alignStart" gap={32}>
                <div>{count} persons in database.</div>
                <form onSubmit={handleSubmit(fetchInactiveCount)}>
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



