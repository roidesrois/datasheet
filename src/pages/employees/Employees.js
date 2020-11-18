import React, { useEffect, useState } from "react";
import { Datasheet } from "../../components/Datasheet";
import { Button } from "../../components/SexyButton";
import { Row, Container } from "../../components/Grid";
import { Pagination } from "../../components/Pagination";
import { EditableCell } from "../../components/EditableCell";
import { MOCK_EMPLOYEES } from "./mocks";
import { Search } from "../../components/Search";
import { useSearch } from "./useSearch";
import styles from "./employees.module.scss";

const fetchEmployees = async () => {
    return Promise.resolve(MOCK_EMPLOYEES).then(delay(500));
};

const Employees = () => {
    const [page, setPageNumber] = useState(0);
    const [count, setPageCount] = useState(10);
    const [from, setFrom] = useState(0);
    const [until, setUntil] = useState(10);
    const [searchVal, setSearchVal] = useState(null);
    const [updated, setUpdated] = useState([]);
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState([]);
    const [employees, setEmployees] = useState({
        data: JSON.parse(JSON.stringify(MOCK_EMPLOYEES.data)),
        pagination: MOCK_EMPLOYEES.pagination,
    });

    const { filteredData, loading } = useSearch({
        searchVal,
        retrieve: MOCK_EMPLOYEES.data,
    });

    useEffect(() => {
        setEmployees({
            pagination: {
                total: filteredData.length,
                pages: Number(filteredData.length / employees.pagination.limit),
                page: 1,
                limit: 10,
            },
            data: filteredData,
        });

        // setEmployees(prevState => ({
        //     ...prevState,
        //     data: filteredData,
        // }));
    }, [filteredData]);

    useEffect(() => {
        setEmployees({
            pagination: {
                total: filteredData.length,
                pages: Number(filteredData.length / employees.pagination.limit),
                page: 1,
                limit: 10,
            },
            data: filteredData,
        });

        // setEmployees(prevState => ({
        //     ...prevState,
        //     data: filteredData,
        // }));
    }, [filteredData]);

    useEffect(() => {
        setEmployees({
            pagination: {
                total: filteredData.length,
                pages: Number(filteredData.length / employees.pagination.limit),
                page: 1,
                limit: 10,
            },
            data: filteredData,
        });

        // setEmployees(prevState => ({
        //     ...prevState,
        //     data: filteredData,
        // }));
    }, [filteredData]);

    const handleEmployeesTable = evt => {
        let item = {
            id: evt.target.id,
            name: evt.target.name,
            value: evt.target.value,
        };

        let updatedEmployees = employees.data.map(function(employee, index) {
            for (let key in employee) {
                if (key == item.name && employee.id == item.id) {
                    employee[key] = item.value;

                    if (!updated.includes(employee.id)) {
                        setUpdated(updated => [...updated, employee.id]);
                    } else {
                        if (item.value == MOCK_EMPLOYEES.data[index][key]) {
                            setUpdated(updated.filter(x => x !== employee.id));
                        }
                    }
                }
            }
            return employee;
        });

        setEmployees(prevState => ({
            ...prevState,
            data: updatedEmployees,
        }));
    };

    const handleSelect = id => {
        const checkExist = selected.filter(empId => {
            return empId === id;
        });

        if (checkExist.length === 0) {
            setSelected(selected => [...selected, id]);
        } else {
            setSelected(selected.filter(x => x !== id));
        }
    };

    const handleDelete = () => {
        const existSelectedIds = updated.filter(id => selected.includes(id));
        setUpdated(updated.filter(id => !existSelectedIds.includes(id)));
        setDeleted(selected);
    };

    const handleUndo = () => {
        setDeleted([]);
    };

    const viewJsonData = () => {
        const updatedData = employees.data.filter(emp => updated.includes(emp.id));
        const deletedData = employees.data.filter(emp => deleted.includes(emp.id));
        console.log("updated: ", updatedData);
        console.log("deleted: ", deletedData);
    };

    const handleSearch = async e => {
        setSearchVal(e.target.value);
    };

    const handleResetData = () => {
        setEmployees(MOCK_EMPLOYEES);
        setUpdated([]);
        setSelected([]);
        setDeleted([]);
    };

    function renderTable() {
        return (
            <>
                <Datasheet
                    columns={[
                        {
                            name: "mark",
                            renderFn: row => {
                                return (
                                    <input
                                        type="checkbox"
                                        onClick={() => {
                                            handleSelect(row.id);
                                        }}
                                    />
                                );
                            },
                        },
                        {
                            name: "id",
                            header: "ID",
                            style: { width: "50px" },
                        },
                        {
                            name: "name",
                            header: "Name",
                            renderFn: row => {
                                return (
                                    <EditableCell
                                        onEmployeesTableUpdate={handleEmployeesTable}
                                        cellData={{
                                            fieldName: "name",
                                            value: row.name,
                                            id: row.id,
                                        }}
                                    />
                                );
                            },
                        },
                        {
                            name: "surname",
                            header: "Surname",
                            renderFn: row => {
                                return (
                                    <EditableCell
                                        onEmployeesTableUpdate={handleEmployeesTable}
                                        cellData={{
                                            fieldName: "surname",
                                            value: row.surname,
                                            id: row.id,
                                        }}
                                    />
                                );
                            },
                        },
                        {
                            name: "dateOfBirth",
                            header: "Date of birth",
                            renderFn: row => {
                                return (
                                    <EditableCell
                                        onEmployeesTableUpdate={handleEmployeesTable}
                                        cellData={{
                                            fieldType: "date",
                                            fieldName: "dateOfBirth",
                                            value: row.dateOfBirth,
                                            id: row.id,
                                        }}
                                    />
                                );
                            },
                        },
                        {
                            name: "position",
                            header: "Position",
                            renderFn: row => {
                                return (
                                    <EditableCell
                                        onEmployeesTableUpdate={handleEmployeesTable}
                                        cellData={{
                                            fieldName: "position",
                                            value: row.position,
                                            id: row.id,
                                        }}
                                    />
                                );
                            },
                        },
                        {
                            name: "phoneNumber",
                            header: "Phone number",
                            renderFn: row => {
                                return (
                                    <EditableCell
                                        onEmployeesTableUpdate={handleEmployeesTable}
                                        cellData={{
                                            fieldType: "tel",
                                            fieldName: "phoneNumber",
                                            value: row.phoneNumber,
                                            id: row.id,
                                        }}
                                    />
                                );
                            },
                        },
                    ]}
                    data={employees.data.filter(emp => !deleted.includes(emp.id)).slice(from, until)}
                    showHeader={true}
                    isLoading={loading}
                />
            </>
        );
    }

    return (
        <Container>
            <div className={styles.paddedTitle}>
                <div className={styles.title}>
                    <h1>Employees</h1>
                </div>
            </div>
            <Row>
                <Search onChange={handleSearch} />
                <div className={styles.buttons}>
                    <Button outline feel="primary" onClick={handleResetData}>
                        Reset Data
                    </Button>
                    <Button feel="primary" onClick={viewJsonData}>
                        Submit
                    </Button>
                </div>
            </Row>
            {employees && renderTable()}
            <div className={styles.buttons}>
                <Button condensed feel="primary" onClick={handleDelete}>
                    Delete
                </Button>
                <Button condensed feel="normal" onClick={handleUndo}>
                    Undo
                </Button>
            </div>
            <Pagination
                defaultItemsCountPerPage={count}
                totalItemsCount={employees && employees.pagination.total}
                itemsCountPerPageLabel="Show on page: "
                itemsCountPerPageOptions={[10, 30, 50, 100]}
                onPageChange={(offset, limit) => {
                    const page = offset / count;
                    const from = 0 + count * page;
                    const until = count + count * page;
                    const c = Number(limit);
                    setPageNumber(page);
                    setPageCount(c);
                    setFrom(from);
                    setUntil(until);
                }}
                currentPage={page + 1}
            />
        </Container>
    );
};

export default Employees;
