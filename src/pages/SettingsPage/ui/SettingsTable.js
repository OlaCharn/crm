import { useMemo, useState, useEffect } from "react";
//import { data } from "../../../shared/assets/data/data";
import { useReactTable,
        createColumnHelper,
        flexRender,
        getCoreRowModel,
        getFilteredRowModel,
        getSortedRowModel, 
        } 
        from "@tanstack/react-table";
import styles from "./SettingsTable.module.scss"
import { ActionButton } from "../../../shared/ui/Buttons/ActionButton.js";
import { Stack } from "../../../shared/ui/Stack/Stack";
import apiService from "../../../app/Services/apiService.js";
import { Modal } from "../../../shared/ui/Modal/Modal.js";
import { ArrowUp } from "../../../shared/assets/svg/ArrowUpAndDown/ArrowUp.js";
import { ArrowDown } from "../../../shared/assets/svg/ArrowUpAndDown/ArrowDown.js";
import { AddForm } from "../Forms/AddForm.js";
import { EditForm } from "../Forms/EditForm.js";
import { DeleteForm } from "../Forms/DeleteForm.js";
import { MessageForm } from "../Forms/MessageForm.js";


export const SettingsTable = () => {
    const [data, setData] = useState([]); // Хранилище данных из API

    const [globalFilter, setGlobalFilter] = useState(""); //состояние для фильтра
    const [sorting, setSorting] = useState([]);           //состояние для сортировки
    const [activeSortColumn, setActiveSortColumn] = useState(null); //состояние для отслеживания активной колонки
    const [selectedRow, setSelectedRow] = useState("");
    const columnHelper = createColumnHelper();


    const [isLoading, setIsLoading] = useState(true); // Флаг загрузки
    const [error, setError] = useState(null); // Ошибка загрузки

    //Модальное окно
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState(""); // Состояние для заголовка

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);                                          // Устанавливаем индикатор загрузки перед вызовом API
            try {
                const fetchedData = await apiService.getUsers();     // Ждем выполнения API-запроса
                setData(fetchedData);                                    // Устанавливаем данные
                setError(null);                                          // Сбрасываем ошибку, если загрузка прошла успешно
            } catch (err) {
                //console.error("Ошибка загрузки данных:", err.message);
                setError("Не удалось загрузить данные");                 // Устанавливаем текст ошибки
                setData([]);                                             // Очищаем данные, если произошла ошибка
            } finally {
                setIsLoading(false);                                     // Сбрасываем индикатор загрузки в любом случае
            }
        };
        fetchData();                                                     // Вызываем асинхронную функцию
    }, []);
    
    //функция для кнопки deletePerson
    const handleDeleteClick = async () => {
        if (!selectedRow) return; 
        //console.log("Attempting to delete user with ID:", selectedRow._id);
        try {
            await apiService.deleteUser(selectedRow._id); 
            const fetchedData = await apiService.getUsers();
            setData(fetchedData); 
            handleCloseModal(); 
        } catch (error) {
            console.error("Ошибка при удалении", error);
        }
    };

    //функция для кнопки Edit
    const handleEditSubmit = async (updatedData) => {
        try {
            await apiService.editPerson(selectedRow._id, updatedData);                      // Обновляем данные через API
            const fetchedData = await apiService.fetchPersons();                            // Получаем обновленные данные из API
            setData(fetchedData);                                                           // Обновление таблицы
            const updatedRow = fetchedData.find(person => person._id === selectedRow._id);  // Находим обновленный объект в данных
            if (updatedRow) {
                setSelectedRow(updatedRow);                                                 // Устанавливаем выбранную строку в обновленный объект
            }
            handleCloseModal();                                                             // Закрываем модальное окно
        } catch (err) {
            console.error("Ошибка при обновлении данных:", err.message);
        }
    };

    //функция для кнопки Add
    const handleRegisterUser = async (data) => {
        try {
            const jsonResponse = await apiService.registerUser(data);                         // Получаем данные от сервера
            setData((prevData) => [...prevData, jsonResponse]);                            // Обновляем локальный список, добавляя полученные с сервера данные
            handleCloseModal(); 
        } catch (error) {
            console.error("Failed to add person:", error);
        }  
    };

     // Открытие модального окна
    const handleOpenModal = (content, title) => {
        setModalTitle(title);
        setModalContent(content);
        setModalOpen(true);
    };

    // Закрытие модального окна
    const handleCloseModal = () => {
        setModalOpen(false);
        setModalContent(null);
        setModalTitle("");
    };
    
    // Обработчик клика по строке
    const handleRowClick = (row) => {
        setSelectedRow(row.original);  // Используем `row.original` для получения данных строки
    };





    const columns = useMemo(
        () => [
            columnHelper.accessor("name", {
                header: "Name",
                cell: info => info.getValue(),
            }),
            columnHelper.accessor("email", {
                header: "Email",
                cell: info => info.getValue(),
            }),
            columnHelper.accessor("role", {
                header: "Role",
                cell: info => info.getValue(),
            }),

            ],
        [columnHelper]
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
            sorting,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getRowId: row => row._id?.toString() || "", // Проверка, если id существует
    });


    if (!data || data.length === 0) {
        return <div>No data available</div>; // Если данных нет
    }

    // Проверяем, есть ли отфильтрованные строки
    const filteredRows = table.getRowModel()?.rows;               // Получаем отфильтрованные строки
    const noMatches = filteredRows && filteredRows.length === 0;  // Если строк нет, устанавливаем флаг noMatches

    //
    const handleSort = (columnId, desc) => {
        setSorting([{ id: columnId, desc }]);
        setActiveSortColumn(columnId); // Устанавливаем активную колонку при сортировке
    };

    // Если данные загружаются, показываем "Loading..."
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Если произошла ошибка, показываем сообщение об ошибке
    if (error) {
        return <div>Error: {error}</div>;
    }
    
    return (
        <> 
            <Stack
                direction="column"
                justify="justifyStart"
                max
                align="alignStart"
            >
                <Stack 
                    direction="row" 
                    justify = "justifyStart"
                    gap={16}
                >
                    <ActionButton
                        variant="green"
                        onClick={() => handleOpenModal(
                            <AddForm 
                                onSubmit={handleRegisterUser} 
                                closeModal={handleCloseModal}
                            />,
                            "Register User" // Функция handleOpenModal ожидает два параметра . Без второго аргумента title остаётся undefined.
                        )}
                    >
                        Register
                    </ActionButton>
                    <ActionButton
                        variant="green"
                        onClick={()=> 
                            selectedRow ? handleOpenModal(
                                        <EditForm 
                                            title="Edit Person" 
                                            selectedRow={selectedRow} 
                                            onSubmit={handleEditSubmit} 
                                            closeModal={handleCloseModal}
                                        />,
                                        "Edit User"
                                    )     
                                        : handleOpenModal(
                                        <MessageForm  
                                            onclose={handleCloseModal} 
                                        />)}
                    >
                        Edit
                    </ActionButton>
                    <ActionButton
                        variant="green"
                        onClick={() => 
                            selectedRow ? handleOpenModal(
                                        <DeleteForm 
                                            title="Delete Person" 
                                            selectedRow={selectedRow} 
                                            onDelete={handleDeleteClick} 
                                            onCancel={handleCloseModal} 
                                        />,
                                        "Delete User"
                                    ) 
                                        : handleOpenModal(
                                        <MessageForm 
                                            onclose={handleCloseModal} 
                                        />)}
                    >
                        Delete
                    </ActionButton>
                </Stack>
                
        <div className={styles.wrapper}>
            <div className={styles.tableContainer}>
            <table >
                <thead>
                    {table.getHeaderGroups()?.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            
                            <th key={header.id}>
                                <Stack direction="row" justify="justifyBetween" gap={8}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
                                    <Stack direction="column">
                                        <ArrowUp 
                                            onClick={() => handleSort(header.column.id, false)}
                                            isActive={activeSortColumn === header.column.id && sorting[0]?.desc === false}
                                            
                                        />
                                        <ArrowDown 
                                            onClick={() => handleSort(header.column.id, true)}
                                            isActive={activeSortColumn === header.column.id && sorting[0]?.desc === true}
                                        />
                                    </Stack>
                                </Stack>
                            </th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {noMatches ? (  // Если нет отфильтрованных строк, показываем сообщение
                        <tr>
                            <td colSpan={columns.length} >
                                <p className={styles.noMatches}>No matches found</p>
                            </td>
                        </tr>
                    ) : (  // Если строки есть, рендерим их
                        filteredRows?.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => handleRowClick(row)} // Обновляем текущую строку при клике
                                className={
                                    selectedRow?._id === row.original._id ? styles.selectedRow : ""
                                } 
                                
                            >
                                {row.getVisibleCells().map((cell) => (
                                    <td key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
        </div>
        </Stack>

        
        {/* Модальное окно */}
        {isModalOpen && (
        <Modal title={modalTitle} onClose={handleCloseModal}>
            {modalContent}
        </Modal>
        )}

        </>
    )
}
