import { useMemo, useState } from "react";
import { data } from "../../../shared/assets/data/data";
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
import { Modal } from "../../../shared/ui/Modal/Modal.js";
import { ArrowUp } from "../../../shared/assets/svg/ArrowUpAndDown/ArrowUp.js";
import { ArrowDown } from "../../../shared/assets/svg/ArrowUpAndDown/ArrowDown.js";
import { AddForm } from "../Forms/AddForm.js";
import { EditForm } from "../Forms/EditForm.js";
import { DeleteForm } from "../Forms/DeleteForm.js";
import { MessageForm } from "../Forms/MessageForm.js";


export const SettingsTable = () => {

    const [globalFilter, setGlobalFilter] = useState(""); 
    const [sorting, setSorting] = useState([]);           
    const [activeSortColumn, setActiveSortColumn] = useState(null); 
    const [selectedRow, setSelectedRow] = useState("");
    const [columnResizing, setColumnResizing] = useState({}); 
    const columnHelper = createColumnHelper();



    //Модальное окно
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [modalTitle, setModalTitle] = useState(""); 


     // modal open
    const handleOpenModal = (content, title) => {
        setModalTitle(title);
        setModalContent(content);
        setModalOpen(true);
    };

    // modal close
    const handleCloseModal = () => {
        setModalOpen(false);
        setModalContent(null);
        setModalTitle("");
    };
    
    // clck selected row
    const handleRowClick = (row) => {
        setSelectedRow(row.original);  // use `row.original` for rows data
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
            columnResizing,
        },
        onSortingChange: setSorting,
        onGlobalFilterChange: setGlobalFilter,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getRowId: row => row._id?.toString() || "", // if id exists
        onColumnResizingChange: setColumnResizing,
        columnResizeMode: "onChange",
    });


    // filtered rows exists? 
    const filteredRows = table.getRowModel()?.rows;               
    const noMatches = filteredRows && filteredRows.length === 0;  

    //
    const handleSort = (columnId, desc) => {
        setSorting([{ id: columnId, desc }]);
        setActiveSortColumn(columnId); 
    };


    
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
                                closeModal={handleCloseModal}
                            />,
                            "Register User" 
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
                            
                            <th key={header.id} 
                                style={{width: header.getSize() }}>
                                <Stack direction="row" justify="justifyBetween" gap={8}>
                                {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
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
                    {noMatches ? (  
                        <tr>
                            <td colSpan={columns.length} >
                                <p className={styles.noMatches}>No matches found</p>
                            </td>
                        </tr>
                    ) : (  
                        filteredRows?.map((row) => (
                            <tr
                                key={row.id}
                                onClick={() => handleRowClick(row)} 
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

        
        {/* Modal */}
        {isModalOpen && (
        <Modal title={modalTitle} onClose={handleCloseModal}>
            {modalContent}
        </Modal>
        )}

        </>
    )
}