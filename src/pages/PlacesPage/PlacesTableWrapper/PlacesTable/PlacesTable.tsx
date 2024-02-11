import CustomTable from "../../../../components/CustomTable/CustomTable";
import {useCustomTable} from "../../../../hooks/other/useCustomTable";
import {Link, useNavigate} from "react-router-dom";
import PlacesFilters from "../../PlacesFilters/PlacesFilters";
import CustomButton from "../../../../components/CustomButton/CustomButton";
import {useAuth} from "../../../../hooks/users/useAuth";
import {variables} from "../../../../utils/consts";
import {usePlaces} from "../../../../hooks/places/usePlaces";

const PlacesTable = ({isLoading, data, isSuccess, refetch}) => {

    const {is_moderator} = useAuth()

    const {deletePlace} = usePlaces()

    const columns = [
        {
            Header: "№",
            accessor: "id"
        },
        {
            Header: "Название",
            accessor: "name",
            Cell: ({ value }) => { return value }
        }
    ]

    if (is_moderator) {
        columns.push({
            Header: "Действие",
            accessor: "accept_button",
            Cell: ({ cell }) => (
                <Link to={`/places/${cell.row.values.id}/edit`}>
                    <CustomButton bg={variables.primary}>Редактировать</CustomButton>
                </Link>
            )
        })

        columns.push({
            Header: "Действие",
            accessor: "dismiss_button",
            Cell: ({ cell }) => (
                <CustomButton bg={variables.red} onClick={(e) => handleDeletePlace(cell.row.values.id)}>
                    Удалить
                </CustomButton>
            )
        })
    }

    const navigate = useNavigate()

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

    const openEditCityPage = (place_id) => {
        navigate(`/places/${place_id}/`)
    }

    const handleDeletePlace = async (unit_id) => {
        await deletePlace(unit_id)
        refetch()
    }

    return (
        <div>

            <CustomTable
                getTableBodyProps={getTableBodyProps}
                headerGroups={headerGroups}
                page={page}
                prepareRow={prepareRow}
                isLoading={isLoading}
                onClick={openEditCityPage}
            >
                <PlacesFilters refetch={refetch} />
            </CustomTable>

        </div>

    )
}

export default PlacesTable