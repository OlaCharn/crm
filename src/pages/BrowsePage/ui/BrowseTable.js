import { useMemo, useState, useEffect } from "react";
//import { data } from "../../../shared/assets/data/data";
import { useReactTable,
        createColumnHelper,
        flexRender,
        getCoreRowModel,
        getFilteredRowModel,
        } 
        from "@tanstack/react-table";
import GlobalFilter from "./ClobalFilter";
import styles from "./BrowseTable.module.scss"
import { ActionButton } from "./Buttons/ActionButton";
import { Stack } from "../../../shared/ui/Stack/Stack";
import apiService from "../Services/apiService.js";
import { Modal } from "./Modal/Modal.js";
import { EditForm } from "../Forms/EditForm.js";
import { DeleteForm } from "../Forms/DeleteForm.js";
import { MessageForm } from "../Forms/MessageForm.js";
import AddForm from "../Forms/AddForm.js";

// Кастомный фильтр для fuzzy поиска
const fuzzyFilter = (row, columnId, value) => {
    const match = row.getValue(columnId)?.toString().toLowerCase().includes(value.toLowerCase());
    return match;
};


export const BrowseTable = () => {
    const [data, setData] = useState([]); // Хранилище данных из API

    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRow, setSelectedRow] = useState("");
    const columnHelper = createColumnHelper();

    const [selectedPhoneRow, setSelectedPhoneRow] = useState(null); // Выбранная строка для телефонов
    const [selectedEmailRow, setSelectedEmailRow] = useState(null); // Выбранная строка для емейлов
    const [selectedContactRow, setSelectedContactRow] = useState(null);
    const [selectedParticipationRow, setSelectedParticipationRow] = useState(null);

    const [isLoading, setIsLoading] = useState(true); // Флаг загрузки
    const [error, setError] = useState(null); // Ошибка загрузки

    //Модальное окно
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState(""); // Состояние для заголовка

    // Загрузка данных при монтировании компонента
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true); // Устанавливаем индикатор загрузки перед вызовом API
            try {
                const fetchedData = await apiService.fetchPersons(); // Ждем выполнения API-запроса
                setData(fetchedData); // Устанавливаем данные
                setError(null); // Сбрасываем ошибку, если загрузка прошла успешно
            } catch (err) {
                console.error("Ошибка загрузки данных:", err.message);
                setError("Не удалось загрузить данные"); // Устанавливаем текст ошибки
                setData([]); // Очищаем данные, если произошла ошибка
            } finally {
                setIsLoading(false); // Сбрасываем индикатор загрузки в любом случае
            }
        };
    
        fetchData(); // Вызываем асинхронную функцию
    }, []);
    
    //функция для кнопки deletePerson
    const handleDeleteClick = async () => {
        // Проверка, есть ли выбранная строка
        if (!selectedRow) return;
        try {
            await apiService.deletePerson(selectedRow.id);          // Запрос на удаление записи по selectedRow.id
            const fetchedData = await apiService.fetchPersons();    // Если запрос прошел успешно, перезагружаем данные с сервера
            setData(fetchedData);                                   // Обновляем состояние с новыми данными
            handleCloseModal();                                     // Закрытие модального окна
        } catch (error) {
            console.error("Ошибка при удалении", error);
        }
    };

    //функция для кнопки Edit
    const handleEditSubmit = async (updatedData) => {
        try {
            await apiService.editPerson(selectedRow.id, updatedData); // API-запрос
            const fetchedData = await apiService.fetchPersons();       // Перезагрузка данных
            setData(fetchedData);                                      // Обновление таблицы
            handleCloseModal();                                        // Закрытие модального окна
        } catch (err) {
            console.error("Ошибка при обновлении данных:", err.message);
        }
    };

    //функция для кнопки Add
    const handleAddPerson = async (data) => {
        try {
            //await apiService.addPerson(data);
            // Вместо повторного запроса данных можно просто обновить локальный список
            const jsonResponse = await apiService.addPerson(data);  // Получаем данные от сервера
            // Обновляем локальный список, добавляя полученные с сервера данные
            setData((prevData) => [...prevData, jsonResponse]);  
            //const fetchedData = await apiService.fetchPersons();       // Перезагрузка данных
            //setData(fetchedData);                                      // Обновление таблицы
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
    };
    
    // Обработчик клика по строке
    const handleRowClick = (row) => {
        setSelectedRow(row.original);  // Используем `row.original` для получения данных строки
    };

    const handlePhoneRowClick = (index) => {
        setSelectedPhoneRow(index); // Устанавливаем индекс выбранной строки
    };
    
    const handleEmailRowClick = (index) => {
        setSelectedEmailRow(index); // Устанавливаем индекс выбранной строки
    };

    const handleContactRowClick = (index) => {
        setSelectedContactRow(index); // Устанавливаем индекс выбранной строки
    };

    const handleParticipationRowClick = (index) => {
        setSelectedParticipationRow(index); // Устанавливаем индекс выбранной строки
    };
    
    // Обработчик для перемещения курсора клавишами
    const handlePhoneKeyDown = (e) => {
        if (!selectedRow?.phones || selectedRow.phones.length === 0) return;
    
        if (e.key === "ArrowUp") {
            setSelectedPhoneRow((prev) => Math.max(0, (prev ?? 0) - 1));
        } else if (e.key === "ArrowDown") {
            setSelectedPhoneRow((prev) => Math.min(selectedRow.phones.length - 1, (prev ?? 0) + 1));
        }
    };
    
    const handleEmailKeyDown = (e) => {
        if (!selectedRow?.emails || selectedRow.emails.length === 0) return;
    
        if (e.key === "ArrowUp") {
            setSelectedEmailRow((prev) => Math.max(0, (prev ?? 0) - 1));
        } else if (e.key === "ArrowDown") {
            setSelectedEmailRow((prev) => Math.min(selectedRow.emails.length - 1, (prev ?? 0) + 1));
        }
    };

    // Сброс selectedRow при изменении фильтра
    useEffect(() => {
        setSelectedRow(null); // Сбрасываем выбранную строку, когда изменяется фильтр
    }, [globalFilter]);

    //Сброс selectedPhoneRow, selectedEmailRow, selectedContactRow, selectedParticipatiomRow  при изменении selectedRow
    useEffect(() => {
        setSelectedPhoneRow(null);
        setSelectedEmailRow(null);
        setSelectedContactRow(null);
        setSelectedParticipationRow(null);
    }, [selectedRow]);


    const columns = useMemo(
        () => [
            columnHelper.accessor("last_name", {
                header: "Last Name",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),
            columnHelper.accessor("first_name", {
                header: "First Name",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),
            columnHelper.accessor("birth_date", {
                header: "Date of birth",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),
            columnHelper.accessor("intern_extern", {
                header: "int/Ext",
                cell: info => info.getValue(),
            }),
            columnHelper.accessor("address", {
                header: "Address",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),
            columnHelper.accessor("contacts", {
                header: "Contacted",
                cell: info => {
                    // Берём первую дату из массива "contact" (если она есть)
                    const contact = info.getValue();
                    return contact && contact.length > 0 ? contact[0].contact_date : "";
                },
            }),
            columnHelper.accessor("participations", {
                header: "Participated",
                cell: info => {
                    // Берём первую дату из массива "participations" (если она есть)
                    const participations = info.getValue();
                    return participations && participations.length > 0 ? participations[0].participation_date : "";
                },
            }),
            columnHelper.accessor("notes", {
                header: "Notes",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),

            ],
        [columnHelper]
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getRowId: row => row.id?.toString() || "", // Проверка, если id существует
    });


    if (!data || data.length === 0) {
        return <div>No data available</div>; // Если данных нет
    }

    // Проверяем, есть ли отфильтрованные строки
    const filteredRows = table.getRowModel()?.rows;               // Получаем отфильтрованные строки
    const noMatches = filteredRows && filteredRows.length === 0;  // Если строк нет, устанавливаем флаг noMatches

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
            <GlobalFilter 
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
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
                        onClick={() => handleOpenModal(<AddForm title="Add Person" onSubmit={handleAddPerson} closeModal={handleCloseModal} />  )}
                        >
                        Add
                    </ActionButton>
                    <ActionButton
                        variant="green"
                        onClick={()=> selectedRow? handleOpenModal(<EditForm title="Edit Person" selectedRow={selectedRow} onSubmit={handleEditSubmit} closeModal={handleCloseModal}/> )     
                                                    : handleOpenModal(<MessageForm  onclose={handleCloseModal} />)}
                        >
                        Edit
                    </ActionButton>
                    <ActionButton
                        variant="green"
                        onClick={ () => selectedRow? handleOpenModal(<DeleteForm title="Delete Person" selectedRow={selectedRow} onDelete={handleDeleteClick} onCancel={handleCloseModal} /> ) 
                                                    : handleOpenModal(<MessageForm onclose={handleCloseModal} />) }
                    >
                        Delete
                    </ActionButton>
                </Stack>
                

            <div className={styles.tableContainer}>
            <table >
                <thead>
                    {table.getHeaderGroups()?.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            
                            <th key={header.id }>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
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
                                    selectedRow?.id === row.original.id ? styles.selectedRow : ""
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
        </Stack>


        <div className={styles.smallTables} >
            <div className={styles.blockTable}>
            <div>
                <h3>Phones</h3>

                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Phone</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                    <tbody 
                        onKeyDown={handlePhoneKeyDown}  
                        tabIndex={0}
                    > 
                    {selectedRow?.phones && selectedRow.phones.length > 0
                    ? selectedRow.phones.map((phone, idx) => (
                        <tr
                            key={idx}
                            onClick={() => handlePhoneRowClick(idx)} // Выделение строки по клику
                            className={selectedPhoneRow === idx ? styles.selectedRow : ""} // Применяем стиль
                        >
                            <td>{phone.phone}</td>
                            <td>{phone.notes}</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <td colSpan={3}>
                                <p className={styles.noMatches}>No matches found</p>
                            </td>
                        </tr>
                    )}
                    </tbody>  
                </table>
                </div>
                </div>

                <div>
                <h3>Emails</h3>

                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody 
                        onKeyDown={handleEmailKeyDown}  
                        tabIndex={0}
                    > 
                    {selectedRow?.emails && selectedRow.emails.length > 0
                    ? selectedRow.emails.map((email, idx) => (
                        <tr
                            key={idx}
                            onClick={() => handleEmailRowClick(idx)} // Выделение строки по клику
                            className={selectedEmailRow === idx ? styles.selectedRow : ""} // Применяем стиль
                        >
                            <td>{email.email}</td>
                            <td>{email.notes}</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <td colSpan={3}>
                                <p className={styles.noMatches}>No matches found</p>
                            </td>
                        </tr>
                    )}
                    </tbody>  
                    </table>
                </div>
                </div>
                </div>

                <div className={styles.blockTable}>
                <div>
                <h3>Contacted</h3>
                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>By</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody
                            tabIndex={0}
                        >
                            {selectedRow?.contacts && selectedRow.contacts.length > 0
                                ? selectedRow.contacts.map((contact, idx) => (
                                    <tr
                                        key={idx}
                                        onClick={() => handleContactRowClick(idx)} // Выделение строки по клику
                                        className={selectedContactRow === idx ? styles.selectedRow : ""} // Применяем стиль
                                    >
                                        <td>{contact.contact_date}</td>
                                        <td>{contact.contact_by}</td>
                                        <td>{contact.contact_notes}</td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan={3}>
                                            <p className={styles.noMatches}>No matches found</p>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                </div>

                <div>
                <h3>Participated</h3>
                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Place</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody
                            tabIndex={0}
                        >
                            {selectedRow?.participations && selectedRow.participations.length > 0
                                ? selectedRow.participations.map((participation, idx) => (
                                    <tr
                                        key={idx}
                                        onClick={() => handleParticipationRowClick(idx)} // Выделение строки по клику
                                        className={selectedParticipationRow === idx ? styles.selectedRow : ""} // Применяем стиль
                                    >
                                        <td>{participation.participation_date}</td>
                                        <td>{participation.participation_place}</td>
                                        <td>{participation.participation_notes}</td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan={3}>
                                            <p className={styles.noMatches}>No matches found</p>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className={styles.blockTable}>
                <div>
                <h3>Notes</h3>
                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                        {noMatches ? ( 
                                <tr>
                                <td colSpan={3}>
                                    <p className={styles.noMatches}>No matches found</p>
                                </td>
                            </tr>
                            ) : (
                        
                            <tr>
                                <td>
                                    {selectedRow?.notes && selectedRow.notes.length > 0 ? (
                                    <div>{selectedRow.notes}</div>
                                    ) : (
                                        null
                                    )}
                                </td>
                            </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                </div>
        </div>
        </div>
        {/* Модальное окно */}
        {isModalOpen && (
            <Modal title={modalTitle} onClose={handleCloseModal}>
                {modalContent}
            </Modal>
        )}
        </>
    );
};

/**
 * 
 * 

     // Функция для загрузки данных из API
     /*
    const fetchPersonsData = async () => {
        const BACKEND_HOST = process.env.REACT_APP_BACKEND_HOST;
        const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;
    
        try {
            const apiUrl = `http://${BACKEND_HOST}:${BACKEND_PORT}/api/persons/getPersons`; 
            const response = await fetch(apiUrl);
            //const response = await fetch("http://localhost:3011/api/persons/getPersons");
            //console.log("Response status:", response.status); // Для отладки
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const personsData = await response.json();
            //console.log("Data fetched:", personsData); // Для проверки содержимого данных
            setData(personsData);
            setError(null);
        } catch (err) {
            //console.error("Fetch error:", err.message);
            //setError(err.message);
            setData([]);
        } finally {
            setIsLoading(false);
        }
    };

    // Загружаем данные при монтировании компонента
    useEffect(() => {
        fetchPersonsData();
    }, []);






import { useMemo, useState, useEffect } from "react";
import { data } from "../../../shared/assets/data/data";
import { useReactTable,
        createColumnHelper,
        flexRender,
        getCoreRowModel,
        getFilteredRowModel,
        } 
        from "@tanstack/react-table";
import GlobalFilter from "./ClobalFilter";
import styles from "./BrowseTable.module.scss"
import { ActionButton } from "./Buttons/ActionButton";
import { ButtonsBlock } from "./Buttons/ButtonsBlock";
import { Stack } from "../../../shared/ui/Stack/Stack";


// Кастомный фильтр для fuzzy поиска
const fuzzyFilter = (row, columnId, value) => {
    const match = row.getValue(columnId)?.toString().toLowerCase().includes(value.toLowerCase());
    return match;
};


export const BrowseTable = () => {
    const [globalFilter, setGlobalFilter] = useState("");
    const [selectedRow, setSelectedRow] = useState(data[0] || null);
    const columnHelper = createColumnHelper();

    const [selectedPhoneRow, setSelectedPhoneRow] = useState(null); // Выбранная строка для телефонов
    const [selectedEmailRow, setSelectedEmailRow] = useState(null); // Выбранная строка для емейлов
    const [selectedContactRow, setSelectedContactRow] = useState(null);
    const [selectedParticipationRow, setSelectedParticipationRow] = useState(null);

    const handlePhoneRowClick = (index) => {
        setSelectedPhoneRow(index); // Устанавливаем индекс выбранной строки
    };
    
    const handleEmailRowClick = (index) => {
        setSelectedEmailRow(index); // Устанавливаем индекс выбранной строки
    };

    const handleContactRowClick = (index) => {
        setSelectedContactRow(index); // Устанавливаем индекс выбранной строки
    };

    const handleParticipationRowClick = (index) => {
        setSelectedParticipationRow(index); // Устанавливаем индекс выбранной строки
    };
    
    // Обработчик для перемещения курсора клавишами
    const handlePhoneKeyDown = (e) => {
        if (!selectedRow?.phones || selectedRow.phones.length === 0) return;
    
        if (e.key === "ArrowUp") {
            setSelectedPhoneRow((prev) => Math.max(0, (prev ?? 0) - 1));
        } else if (e.key === "ArrowDown") {
            setSelectedPhoneRow((prev) => Math.min(selectedRow.phones.length - 1, (prev ?? 0) + 1));
        }
    };
    
    const handleEmailKeyDown = (e) => {
        if (!selectedRow?.emails || selectedRow.emails.length === 0) return;
    
        if (e.key === "ArrowUp") {
            setSelectedEmailRow((prev) => Math.max(0, (prev ?? 0) - 1));
        } else if (e.key === "ArrowDown") {
            setSelectedEmailRow((prev) => Math.min(selectedRow.emails.length - 1, (prev ?? 0) + 1));
        }
    };

// Сброс selectedRow при изменении фильтра
useEffect(() => {
    setSelectedRow(null); // Сбрасываем выбранную строку, когда изменяется фильтр
}, [globalFilter]);

//Сброс selectedPhoneRow, selectedEmailRow, selectedContactRow, selectedParticipatiomRow  при изменении selectedRow
useEffect(() => {
    setSelectedPhoneRow(null);
    setSelectedEmailRow(null);
    setSelectedContactRow(null);
    setSelectedParticipationRow(null);
}, [selectedRow]);


    const columns = useMemo(
        () => [
            columnHelper.accessor("last_name", {
                header: "Last Name",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),
            columnHelper.accessor("first_name", {
                header: "First Name",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),
            columnHelper.accessor("birth_date", {
                header: "Date of birth",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),
            columnHelper.accessor("intern_extern", {
                header: "int/Ext",
                cell: info => info.getValue(),
            }),
            columnHelper.accessor("address", {
                header: "Address",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),
            columnHelper.accessor("contacts", {
                header: "Contacted",
                cell: info => {
                    // Берём первую дату из массива "contact" (если она есть)
                    const contact = info.getValue();
                    return contact && contact.length > 0 ? contact[0].contact_date : "";
                },
            }),
            columnHelper.accessor("participations", {
                header: "Participated",
                cell: info => {
                    // Берём первую дату из массива "participations" (если она есть)
                    const participations = info.getValue();
                    return participations && participations.length > 0 ? participations[0].participation_date : "";
                },
            }),
            columnHelper.accessor("notes", {
                header: "Notes",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),

            ],
        [columnHelper]
    );

    const table = useReactTable({
        data,
        columns,
        state: {
            globalFilter,
        },
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getRowId: row => row.id?.toString() || "", // Проверка, если id существует
    });

    
    if (!data || data.length === 0) {
        return <div>No data available</div>; // Если данных нет
    }

    // Проверяем, есть ли отфильтрованные строки
    const filteredRows = table.getRowModel()?.rows;  // Получаем отфильтрованные строки
    const noMatches = filteredRows && filteredRows.length === 0;  // Если строк нет, устанавливаем флаг noMatches


    return (
        <> 
            <GlobalFilter 
                globalFilter={globalFilter}
                setGlobalFilter={setGlobalFilter}
            />
            <Stack
                direction="column"
                justify="justifyStart"
                max
                align="alignStart"
            >
            <ButtonsBlock/>
            <div className={styles.tableContainer}>
            <table >
                <thead>
                    {table.getHeaderGroups()?.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                            
                            <th key={header.id }>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                    )}
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
                                onClick={() => setSelectedRow(row.original)} // Обновляем текущую строку при клике
                                className={
                                    selectedRow?.id === row.original.id ? styles.selectedRow : ""
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
        </Stack>


        <div className={styles.smallTables} >
            <div className={styles.blockTable}>
            <div>
                <h3>Phones</h3>
                <ButtonsBlock/>
                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Phone</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                    <tbody 
                        onKeyDown={handlePhoneKeyDown}  
                        tabIndex={0}
                    > 
                    {selectedRow?.phones && selectedRow.phones.length > 0
                    ? selectedRow.phones.map((phone, idx) => (
                        <tr
                            key={idx}
                            onClick={() => handlePhoneRowClick(idx)} // Выделение строки по клику
                            className={selectedPhoneRow === idx ? styles.selectedRow : ""} // Применяем стиль
                        >
                            <td>{phone.phone}</td>
                            <td>{phone.notes}</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <td colSpan={3}>
                                <p className={styles.noMatches}>No matches found</p>
                            </td>
                        </tr>
                    )}
                    </tbody>  
                </table>
                </div>
                </div>

                <div>
                <h3>Emails</h3>
                <ButtonsBlock/>
                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody 
                        onKeyDown={handleEmailKeyDown}  
                        tabIndex={0}
                    > 
                    {selectedRow?.emails && selectedRow.emails.length > 0
                    ? selectedRow.emails.map((email, idx) => (
                        <tr
                            key={idx}
                            onClick={() => handleEmailRowClick(idx)} // Выделение строки по клику
                            className={selectedEmailRow === idx ? styles.selectedRow : ""} // Применяем стиль
                        >
                            <td>{email.email}</td>
                            <td>{email.notes}</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <td colSpan={3}>
                                <p className={styles.noMatches}>No matches found</p>
                            </td>
                        </tr>
                    )}
                    </tbody>  
                    </table>
                </div>
                </div>
                </div>

                <div className={styles.blockTable}>
                <div>
                <h3>Contacted</h3>
                <ButtonsBlock />
                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>By</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody
                            tabIndex={0}
                        >
                            {selectedRow?.contacts && selectedRow.contacts.length > 0
                                ? selectedRow.contacts.map((contact, idx) => (
                                    <tr
                                        key={idx}
                                        onClick={() => handleContactRowClick(idx)} // Выделение строки по клику
                                        className={selectedContactRow === idx ? styles.selectedRow : ""} // Применяем стиль
                                    >
                                        <td>{contact.contact_date}</td>
                                        <td>{contact.contact_by}</td>
                                        <td>{contact.contact_notes}</td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan={3}>
                                            <p className={styles.noMatches}>No matches found</p>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                </div>

                <div>
                <h3>Participated</h3>
                <ButtonsBlock />
                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Place</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody
                            tabIndex={0}
                        >
                            {selectedRow?.participations && selectedRow.participations.length > 0
                                ? selectedRow.participations.map((participation, idx) => (
                                    <tr
                                        key={idx}
                                        onClick={() => handleParticipationRowClick(idx)} // Выделение строки по клику
                                        className={selectedParticipationRow === idx ? styles.selectedRow : ""} // Применяем стиль
                                    >
                                        <td>{participation.participation_date}</td>
                                        <td>{participation.participation_place}</td>
                                        <td>{participation.participation_notes}</td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan={3}>
                                            <p className={styles.noMatches}>No matches found</p>
                                        </td>
                                    </tr>
                                )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div className={styles.blockTable}>
                <div>
                <h3>Notes</h3>
                <ActionButton variant="green" >Edit</ActionButton>
                <div className={styles.detailsTable}>
                    <table>
                        <thead>
                        </thead>
                        <tbody>
                        {noMatches ? ( 
                                <tr>
                                <td colSpan={3}>
                                    <p className={styles.noMatches}>No matches found</p>
                                </td>
                            </tr>
                            ) : (
                        
                            <tr>
                                <td>
                                    {selectedRow?.notes && selectedRow.notes.length > 0 ? (
                                    <div>{selectedRow.notes}</div>
                                    ) : (
                                        null
                                    )}
                                </td>
                            </tr>
                                )}
                        </tbody>
                    </table>
                </div>
                </div>
        </div>
        </div>
        </>
    );
};
 */