import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { BoxWhiteBackground } from "../../shared/ui/BoxWhiteBackground/BoxWhiteBackground";
import apiService from "../../app/Services/apiService";
import { Stack } from "../../shared/ui/Stack/Stack";
import styles from "./Dashboard.module.scss"
//import { ActionButton } from "../BrowsePage/ui/Buttons/ActionButton";

const DashboardPage = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm(); // React Hook Form
    const [count, setCount] = useState(null); // Хранение общего количества
    const [inactiveCount, setInactiveCount] = useState(null); // Хранение количества неактивных
    const [isLoading, setIsLoading] = useState(true); // Флаг загрузки
    const [error, setError] = useState(null); // Ошибка загрузки

    // Загрузка общего количества людей
    useEffect(() => {
        const fetchCount = async () => {
            setIsLoading(true);
            try {
                const response = await apiService.countPersons(); // Получаем ответ API
                setCount(response.count); // Извлекаем значение count из объекта
                setError(null);
            } catch (err) {
                console.error("Ошибка загрузки данных:", err.message);
                setError("Не удалось загрузить данные");
                setCount(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCount();
    }, []);

    // Загрузка неактивного количества людей в зависимости от месяцев
    const fetchInactiveCount = async (data) => {
        const { months } = data; // Извлекаем значение из формы
        if (!months) return;
        setIsLoading(true);
        try {
            const response = await apiService.countPersonsInactiveSinceMonths(months);
            setInactiveCount(response.count);
            setError(null);
        } catch (err) {
            console.error("Ошибка загрузки данных:", err.message);
            setError("Не удалось загрузить данные");
            setInactiveCount(null);
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (count === null) {
        return <div>No data available</div>;
    }

    const monthsValue = watch("months"); // Слежение за значением из поля months

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



/*
const DashboardPage = () => {
    const [count, setCount] = useState(null); // Хранение общего количества
    const [inactiveCount, setInactiveCount] = useState(null); // Хранение количества неактивных
    const [months, setMonths] = useState(""); // Хранение введенного значения месяцев
    const [isLoading, setIsLoading] = useState(true); // Флаг загрузки
    const [error, setError] = useState(null); // Ошибка загрузки

    // Загрузка общего количества людей
    useEffect(() => {
        const fetchCount = async () => {
            setIsLoading(true);
            try {
                const response = await apiService.countPersons(); // Получаем ответ API
                setCount(response.count); // Извлекаем значение count из объекта
                setError(null);
            } catch (err) {
                console.error("Ошибка загрузки данных:", err.message);
                setError("Не удалось загрузить данные");
                setCount(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchCount();
    }, []);

    // Загрузка неактивного количества людей в зависимости от месяцев
    const fetchInactiveCount = async () => {
        if (!months) return;
        setIsLoading(true);
        try {
            const response = await apiService.countPersonsInactiveSinceMonths(months);
            console.log(response); // Выведите сам ответ
            setInactiveCount(response.count);
            setError(null);
        } catch (err) {
            console.error("Ошибка загрузки данных:", err.message);
            setError("Не удалось загрузить данные");
            setInactiveCount(null);
        } finally {
            setIsLoading(false);
        }
    };

    // Обработка изменения месяца
    const handleMonthsChange = (event) => {
        setMonths(event.target.value);
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (count === null) {
        return <div>No data available</div>;
    }

    return (
        <>
            <BoxWhiteBackground>
                <div>
                    <div>{count} persons should be anonymized</div>
                    <Stack direction="row" gap={16} justify="justify">
                        <input
                            type="number"
                            value={months}
                            onChange={handleMonthsChange}
                            placeholder="Enter months"
                            className={styles.inputDate}
                        />

                        <ActionButton variant="green" onClick={fetchInactiveCount}>Count</ActionButton>
                        </Stack>

                    {inactiveCount !== null && (
                        <p>{inactiveCount} people have been inactive for the last {months} months</p>
                    )}
                </div>

            </BoxWhiteBackground>
        </>
    );
};

export default DashboardPage;


Временно скрытая кнопка + открой импорты при вставке

<Button variant="green" > Anonimize <ArrowsIcon/> </Button>
*/