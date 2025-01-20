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
import GlobalFilter from "./ClobalFilter";
import styles from "./BrowseTable.module.scss"
import { ActionButton } from "../../../shared/ui/Buttons/ActionButton.js";
import { Stack } from "../../../shared/ui/Stack/Stack";
import apiService from "../../../app/Services/apiService.js";
import { Modal } from "../../../shared/ui/Modal/Modal.js";
import { EditForm } from "../Forms/EditForm.js";
import { DeleteForm } from "../Forms/DeleteForm.js";
import { MessageForm } from "../Forms/MessageForm.js";
import { AddForm } from "../Forms/AddForm.js";
import { ArrowUp } from "../../../shared/assets/svg/ArrowUpAndDown/ArrowUp.js";
import { ArrowDown } from "../../../shared/assets/svg/ArrowUpAndDown/ArrowDown.js";
import { RingLoaderComponent } from "../../../shared/ui/Loader/RingLoaderComponent.js";
import { useAuth } from "../../../features/auth/AuthProvider.js";

// fuzzy search
const fuzzyFilter = (row, columnId, value) => {
    const match = row.getValue(columnId)?.toString().toLowerCase().includes(value.toLowerCase());
    return match;
};


export const BrowseTable = () => {
    const [data, setData] = useState([]); // API data state 

    const { role } = useAuth(); // role 
    const isViewer = role === 'viewer';

    const [globalFilter, setGlobalFilter] = useState(""); //filter state
    const [sorting, setSorting] = useState([]);           //sorting state
    const [activeSortColumn, setActiveSortColumn] = useState(null); //active column sort
    const [selectedRow, setSelectedRow] = useState(""); 
    const [columnResizing, setColumnResizing] = useState({}); // resiting column state

    const columnHelper = createColumnHelper();

    const [selectedPhoneRow, setSelectedPhoneRow] = useState(null); 
    const [selectedEmailRow, setSelectedEmailRow] = useState(null); 
    const [selectedContactRow, setSelectedContactRow] = useState(null);
    const [selectedParticipationRow, setSelectedParticipationRow] = useState(null);

    const [isLoading, setIsLoading] = useState(true); 
    const [error, setError] = useState(null); 

    // Modal
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState(""); 

    // data loading by component mounting
    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);                                          
            try {
                const fetchedData = await apiService.fetchPersons();     
                setData(fetchedData);                                    // set data
                setError(null);                                          
            } catch (err) {
                console.error("Error:", err.message);
                setError("No data available");                           // set error message
                setData([]);                                             // clear data if error
            } finally {
                setIsLoading(false);                                     // clear loading
            }
        };
        fetchData();                                                     // call async function
    }, []);
    
    //button deletePerson
    const handleDeleteClick = async () => {
        if (!selectedRow) return;                                     
        try {
            await apiService.deletePerson(selectedRow._id);          
            const fetchedData = await apiService.fetchPersons();    // return new data after deleting
            setData(fetchedData);                                   // set new data
            handleCloseModal();                                     
        } catch (error) {
            console.error("Delete error", error);
        }
    };

    //button  Edit
    const handleEditSubmit = async (updatedData) => {
        try {
            await apiService.editPerson(selectedRow._id, updatedData);                      
            const fetchedData = await apiService.fetchPersons();                            
            setData(fetchedData);                                                           
            const updatedRow = fetchedData.find(person => person._id === selectedRow._id);  //search data row
            if (updatedRow) {
                setSelectedRow(updatedRow);                                                 //update row
            }
            handleOpenModal(null, 'Person`s data was updated');
            //handleCloseModal();                                                             
        } catch (err) {
            console.error("Update Error :", err.message);
        }
    };

    //button Add
    const handleAddPerson = async (data) => {
        try {
            const jsonResponse = await apiService.addPerson(data);                         
            setData((prevData) => [...prevData, jsonResponse]);                            
            handleOpenModal(null, 'Person`s data was added');
            //handleCloseModal(); 
        } catch (error) {
            console.error("Failed to add person:", error);
        }  
    };

     // Modal open
    const handleOpenModal = (content, title) => {
        setModalTitle(title);
        setModalContent(content);
        setModalOpen(true);
    };

    // Modal close
    const handleCloseModal = () => {
        setModalOpen(false);
        setModalContent(null);
        setModalTitle("");
    };
    
    // selected row click
    const handleRowClick = (row) => {
        setSelectedRow(row.original);  // use `row.original` for data row
    };

    const handlePhoneRowClick = (index) => {
        setSelectedPhoneRow(index); 
    };
    
    const handleEmailRowClick = (index) => {
        setSelectedEmailRow(index); 
    };

    const handleContactRowClick = (index) => {
        setSelectedContactRow(index); 
    };

    const handleParticipationRowClick = (index) => {
        setSelectedParticipationRow(index); 
    };
    
    // 
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

    // by changing in search
    useEffect(() => {
        setSelectedRow(null); // Reset the selected row when the filter changes.
    }, [globalFilter]);

    //reset selectedPhoneRow, selectedEmailRow, selectedContactRow, selectedParticipatiomRow  when selectedRow changes
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
                enableSorting: true,
            }),
            columnHelper.accessor("first_name", {
                header: "First Name",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
                enableSorting: true,
            }),
            columnHelper.accessor("birth_date", {
                header: "Date of birth",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
                enableSorting: true,
                sortingFn:  (a, b) => new Date(a.original.birth_date) - new Date(b.original.birth_date), // sorting logic,
            }),
            columnHelper.accessor("intern_extern", {
                header: "Int/Ext",
                cell: info => info.getValue(),
                enableSorting: true,
            }),
            columnHelper.accessor("address", {
                header: "Address",
                cell: info => info.getValue(),
                filterFn: fuzzyFilter,
            }),
            columnHelper.accessor("last_contact_date", {
                header: "Contacted",
                cell: info => info.getValue(),
                enableSorting: true,
            }),
            columnHelper.accessor("last_participation_date", {
                header: "Participated",
                cell: info => info.getValue(),
                enableSorting: true,
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
            sorting,
            columnResizing,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        globalFilterFn: fuzzyFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getRowId: row => row._id?.toString() || "", // if id exist
        onColumnResizingChange: setColumnResizing,
        columnResizeMode: "onChange",
    });


    

    // Check if there are any filtered rows
    const filteredRows = table.getRowModel()?.rows;               // get filtered rows
    const noMatches = filteredRows && filteredRows.length === 0;  // no filtered rows -> noMatches

    //
    const handleSort = (columnId, desc) => {
        setSorting([{ id: columnId, desc }]);
        setActiveSortColumn(columnId); // set active column by sorting
    };

    // if data is loading see loader
    if (isLoading) {
        return <div><RingLoaderComponent /></div>;
    }

    // if error -> see error
    if (error) {
        return <div>Error: {error}</div>;
    }
    if (!data || data.length === 0) {
        return <div>No data available</div>; // if no data
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
                        onClick={() => handleOpenModal(
                            <AddForm 
                                onSubmit={handleAddPerson} 
                                closeModal={handleCloseModal}
                            />,
                            "Add Person" // handleOpenModal needs 2 params 
                        )}
                        disabled={isViewer} 
                    >
                        Add
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
                                        "Edit Person"
                                    )     
                                        : handleOpenModal(
                                        <MessageForm  
                                            onclose={handleCloseModal} 
                                        />)}
                                        disabled={isViewer} 
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
                                        "Delete Person"
                                    ) 
                                        : handleOpenModal(
                                        <MessageForm 
                                            onclose={handleCloseModal} 
                                        />)}
                                        disabled={isViewer} 
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
                            
                            <th key={header.id} style={{
                                width: `${header.getSize()}px`, 
                                position: "sticky",            
                                top: 0,                        
                                zIndex: 2,                     
                            }}>
                                <Stack direction="row" justify="justifyBetween" gap={8}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header, header.getContext()
                                    )}
                                    <div
                                    {...{
                                        onMouseDown: header.getResizeHandler(),
                                        onTouchStart: header.getResizeHandler(),
                                        className: `${styles.resizer} ${
                                            header.column.getIsResizing() ? styles.isResizing : ""
                                        }`,
                                    }}
                                    />
                                    {header.column.id !== "address" && header.column.id !== "notes" && (
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
                                )}
                                </Stack>
                            </th>
                        ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {noMatches ? (  // if no filtered rows, see this:
                        <tr>
                            <td colSpan={columns.length} >
                                <p className={styles.noMatches}>No matches found</p>
                            </td>
                        </tr>
                    ) : (  // if filtered row , see this: 
                        filteredRows?.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => handleRowClick(row)} // update by click
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
                            onClick={() => handlePhoneRowClick(idx)} // selected row by click
                            className={selectedPhoneRow === idx ? styles.selectedRow : ""} // selected row style
                        >
                            <td>{phone.phone}</td>
                            <td>{phone.notes}</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <td colSpan={3}>
                                <p className={styles.noMatches}></p>
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
                            onClick={() => handleEmailRowClick(idx)} 
                            className={selectedEmailRow === idx ? styles.selectedRow : ""} 
                        >
                            <td>{email.email}</td>
                            <td>{email.notes}</td>
                        </tr>
                    ))
                    : (
                        <tr>
                            <td colSpan={3}>
                                <p className={styles.noMatches}></p>
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
                                        onClick={() => handleContactRowClick(idx)} 
                                        className={selectedContactRow === idx ? styles.selectedRow : ""} 
                                    >
                                        <td>{contact.contact_date}</td>
                                        <td>{contact.contact_by}</td>
                                        <td>{contact.contact_notes}</td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan={3}>
                                            <p className={styles.noMatches}></p>
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
                                        onClick={() => handleParticipationRowClick(idx)} 
                                        className={selectedParticipationRow === idx ? styles.selectedRow : ""} 
                                    >
                                        <td>{participation.participation_date}</td>
                                        <td>{participation.participation_place}</td>
                                        <td>{participation.participation_notes}</td>
                                    </tr>
                                ))
                                : (
                                    <tr>
                                        <td colSpan={3}>
                                            <p className={styles.noMatches}></p>
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
        {/* Modal */}
        {isModalOpen && (
            <Modal title={modalTitle} onClose={handleCloseModal}>
                {modalContent}
            </Modal>
        )}
        </>
    );
};

