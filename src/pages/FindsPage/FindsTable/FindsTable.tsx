import React from "react";
import "./FindsTable.sass"
import {STATUSES, variables} from "/src/utils/consts";
import {ru} from "/src/utils/momentLocalization";
import moment from "moment";
import {useQuery} from "react-query";
import {useFinds} from "../../../hooks/finds/useFinds";
import {useCustomTable} from "../../../hooks/other/useCustomTable";
import CustomTable from "../../../components/CustomTable/CustomTable";
import {useNavigate} from "react-router-dom"
import FindsFilters from "../FindsFilters/FindsFilters";
import CustomButton from "../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../hooks/users/useAuth";
import {useToken} from "../../../hooks/users/useToken";
import {api} from "../../../utils/api";
import {format_expedition_date} from "../../../utils/utils";

const FindsTable = () => {

    const {access_token} = useToken()

    const {is_moderator} = useAuth()

    const navigate = useNavigate()

    const {searchFinds} = useFinds()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Статус",
            accessor: "status",
            Cell: ({ value }) => { return STATUSES.find(status => status.id == value).name }
        },
        {
            Header: "Дата формирования",
            accessor: "date_formation",
            Cell: ({ value }) => { return moment(value).locale(ru()).format("D MMMM HH:mm") }
        },
        {
            Header: "Дата завершения",
            accessor: "date_complete",
            Cell: ({ value }) => {
                if (!value) {
                    return "Нет"
                }
                
                return moment(value).locale(ru()).format("D MMMM HH:mm")
            }
        },
        {
            Header: "Дата экспедиции",
            accessor: "expedition_date",
            Cell: ({ value }) => format_expedition_date(value)
        }
    ]

    if (is_moderator) {
        columns.push(
            {
                Header: "Пользователь",
                accessor: "owner",
                Cell: ({ value }) => value
            },
                {
                Header: "Действие",
                accessor: "accept_button",
                Cell: ({ cell }) => (
                    is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.green} onClick={(e) => acceptFind(cell.row.values.id)}>Принять</CustomButton>
                )
            },
            {
                Header: "Действие",
                accessor: "dismiss_button",
                Cell: ({ cell }) => (
                    is_moderator && cell.row.values.status == 2 && <CustomButton bg={variables.red} onClick={(e) => dismissFind(cell.row.values.id)}>Отклонить</CustomButton>
                )
            }
            )
    }

    const acceptFind = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "3")

        const response = await api.put(`finds/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }

    const dismissFind = async (order_id) => {

        const formData = new FormData()

        formData.append("status", "4")

        const response = await api.put(`finds/${order_id}/update_status_admin/`, formData, {
            headers: {
                'authorization': access_token
            }
        });

        if (response.status == 200) {
            refetch()
        }
    }
    
    const { isLoading, data, isSuccess, refetch } = useQuery(
        ["finds"],
        () => searchFinds(),
        {
            refetchInterval: 2000,
            refetchOnWindowFocus: false,
            cacheTime: 0,
            keepPreviousData: false,
        }
    );

    const {
        getTableBodyProps,
        headerGroups,
        page,
        prepareRow
    } = useCustomTable(
        columns,
        isSuccess,
        data
    )

    const handleClick = (find_id) => {
        navigate(`/finds/${find_id}`)
    }

    return (
        <div className="finds-table-wrapper">

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={handleClick}
            >
                <FindsFilters refetch={refetch}/>
            </CustomTable>

        </div>
    )
}

export default FindsTable