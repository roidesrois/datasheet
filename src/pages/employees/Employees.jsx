import React, { useEffect, useState } from "react";
import { Transition } from "react-transition-group";
import { Link } from "react-router-dom";
import { Datasheet } from "../../components/Datasheet";
import { Button } from "../../components/SexyButton";
import { Row, Col, Container } from "../../components/Grid";
import { Form, TextInput, SelectBox, SubmitButton } from "../../components/Form";
import { ErrorsModal } from "../../modals/ErrorsModal";
import { Modal, ModalTrigger } from "../../components/Modal";
import { Pagination } from "../../components/Pagination";
import { Loading } from "../../components/Loading";
// import { useFetcher } from "../../components/Fetcher";
import { VisiblyHidden } from "../../components/VisiblyHidden";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { SexyButton } from "../../components/SexyButton";
import { DeleteConfirm } from "../../modals/DeleteConfirm";
import { AddEditUser } from "../../modals/AddEditUser";
import { GET_MOCK_EMPLOYEES_INFO } from "./mocks";

import { fetchUsers, deleteUser, addNewUser, editUser } from "./api";

import styles from "./employees.module.scss";

const Employees = () => {
    const [page, setPageNumber] = useState(0);
    const [count, setPageCount] = useState(10);
    const [searchParams, setSearchParams] = useState({
        page: "",
        id: "",
        name: "",
        status: "",
    });
    const [needsLoading, setNeedsLoading] = useState(false);
    // const [data, error, loading] = useFetcher(fetchUsers(searchParams), 0, searchParams, needsLoading);
    const [data, setData] = useState(GET_MOCK_EMPLOYEES_INFO);
    const [errors, handleErrors] = useState(null);

    useEffect(() => {
        if (needsLoading) {
            setNeedsLoading(false);
        }
    }, [needsLoading]);

    const handleErrorReloadClick = e => {
        e.preventDefault();
        setNeedsLoading(true);
    };

    const handleDeleteUser = async id => {
        try {
            await deleteUser(id);
            setNeedsLoading(true);
        } catch (error) {
            handleErrors(error.data.errors);
        }
    };

    const handleEditUser = async (data, id) => {
        try {
            await editUser(id, data);
            setNeedsLoading(true);
        } catch (error) {
            handleErrors(error.data.errors);
        }
    };

    const closeModal = () => {
        handleErrors(null);
    };

    const handleSearch = async dt => {
        setSearchParams({
            page: page,
            id: dt.id ? dt.id : "",
            name: dt.name ? dt.name : "",
            status: dt.status ? dt.status : "",
        });
    };

    const handleClearFilterClick = async () => {
        setSearchParams({
            page: 0,
            id: "",
            name: "",
            status: "",
        });
    };

    function renderTable() {
        // if (error) {
        //     return (
        //         <div className={styles.sessionsError}>
        //             <div className={styles.errorMessage}>Failed to load users data</div>
        //             <Button feel="link" onClick={handleErrorReloadClick}>
        //                 Reload
        //             </Button>
        //         </div>
        //     );
        // }

        return (
            <>
                <Row>
                    <Col grow={9}>
                        <Form onSubmit={handleSearch}>
                            <Row wrap>
                                <div className={styles.formCol}>
                                    <TextInput label="User Id" name="id" placeholder="User Id" hideLabel={true} />
                                </div>
                                <div className={styles.formCol}>
                                    <TextInput
                                        label="User Name"
                                        name="name"
                                        placeholder="First Name"
                                        hideLabel={true}
                                    />
                                </div>
                                <div className={styles.formCol}>
                                    <SelectBox
                                        label="Status"
                                        name="status"
                                        placeholder="Choose Status"
                                        hideLabel={true}
                                        options={[
                                            {
                                                label: "Active",
                                                value: "active",
                                            },
                                            {
                                                label: "Inactive",
                                                value: "inactive",
                                            },
                                        ]}
                                    />
                                </div>
                                <div className={styles.buttons}>
                                    <SubmitButton>Search</SubmitButton>
                                    <Button feel="normal" onClick={handleClearFilterClick}>
                                        Clear
                                    </Button>
                                </div>
                            </Row>
                        </Form>
                    </Col>
                    <Col grow={3} className="d-flex justify-content-end">
                        <div>
                            <Button inverse feel="primary" onClick={null}>
                                Reset Data
                            </Button>
                        </div>
                    </Col>
                </Row>
                <Loading
                // visible={loading}
                >
                    <Datasheet
                        columns={[
                            {
                                name: "id",
                                header: "ID",
                                style: { width: "100px" },
                            },
                            {
                                name: "name",
                                header: "Name",
                            },
                            {
                                name: "surname",
                                header: "Surname",
                            },
                            {
                                name: "dateOfBirth",
                                header: "Date of birth",
                            },
                            {
                                name: "position",
                                header: "Position",
                            },
                            {
                                name: "phoneNumber",
                                header: "Phone number",
                            },
                            // {
                            //     name: 'status',
                            //     header: 'Status',
                            //     renderFn: row => {
                            //         return (
                            //             <div
                            //                 className={classnames(styles.userStatus, {
                            //                     [styles.active]: row.status === 'active',
                            //                     [styles.inactive]: row.status === 'inactive'
                            //                 })}
                            //             >
                            //                 <div className={styles.status}>{row.status}</div>
                            //             </div>
                            //         );
                            //     }
                            // },
                            {
                                name: "actions",
                                header: "Actions",
                                style: { width: "180px" },
                                renderFn: row => {
                                    return (
                                        <>
                                            <Button
                                                as={Link}
                                                to={`/user-details/${row.id}`}
                                                condensed
                                                outline
                                                feel="link"
                                            >
                                                <FontAwesomeIcon className={styles.viewIcon} icon="undo" size="lg" />
                                                <VisiblyHidden>View</VisiblyHidden>
                                            </Button>
                                            <ModalTrigger
                                                trigger={openModal => (
                                                    <SexyButton feel="link" onClick={openModal()}>
                                                        <FontAwesomeIcon
                                                            className={styles.editIcon}
                                                            icon="pencil-alt"
                                                            size="lg"
                                                        />
                                                        <VisiblyHidden>Edit</VisiblyHidden>
                                                    </SexyButton>
                                                )}
                                            >
                                                {(closeModal, isOpen) => (
                                                    <AddEditUser
                                                        isOpen={isOpen}
                                                        closeModal={closeModal}
                                                        edit={true}
                                                        user={row}
                                                        action={data => {
                                                            handleEditUser(data, row.id);
                                                            closeModal();
                                                        }}
                                                    />
                                                )}
                                            </ModalTrigger>

                                            <ModalTrigger
                                                trigger={openModal => (
                                                    <SexyButton feel="link" onClick={openModal()}>
                                                        <FontAwesomeIcon
                                                            className={styles.trashIcon}
                                                            icon="trash-alt"
                                                            size="lg"
                                                        />
                                                        <VisiblyHidden>Delete</VisiblyHidden>
                                                    </SexyButton>
                                                )}
                                            >
                                                {(closeModal, isOpen) => (
                                                    <DeleteConfirm
                                                        isOpen={isOpen}
                                                        closeModal={closeModal}
                                                        confirmText={"Are you sure you want to delete this user?"}
                                                        deleteConfirm={() => {
                                                            handleDeleteUser(row.id);
                                                            closeModal();
                                                        }}
                                                    />
                                                )}
                                            </ModalTrigger>
                                        </>
                                    );
                                },
                            },
                        ]}
                        data={data && data.data}
                        showHeader={true}
                    />
                </Loading>

                {errors && (
                    <Transition in={true} timeout={{ enter: 0, exit: 500 }} mountOnEnter unmountOnExit>
                        <Modal closeModal={closeModal} isOpen={true}>
                            <ErrorsModal closeModal={closeModal} errors={errors} />
                        </Modal>
                    </Transition>
                )}
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

            {renderTable()}
            <Pagination
                defaultItemsCountPerPage={count}
                totalItemsCount={data && data.meta.pagination.total}
                itemsCountPerPageLabel="Show on page: "
                itemsCountPerPageOptions={[10, 30, 50, 100]}
                onPageChange={(offset, limit) => {
                    const page = offset / count;
                    const c = Number(limit);
                    setSearchParams({
                        ...searchParams,
                        page,
                    });
                    setPageNumber(page);
                    setPageCount(c);
                }}
                currentPage={page + 1}
            />
        </Container>
    );
};

export default Employees;
