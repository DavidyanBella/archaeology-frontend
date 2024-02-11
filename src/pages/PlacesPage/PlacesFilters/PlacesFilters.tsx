import "./PlacesFilters.sass"
import SearchBar from "../../../components/SearchBar/SearchBar";
import {usePlaces} from "../../../hooks/places/usePlaces";
import {useAuth} from "../../../hooks/users/useAuth";
import LinkButton from "../../../components/LinkButton/LinkButton";
import {variables} from "../../../utils/consts";
import CustomButton from "../../../components/CustomButton/CustomButton";

const PlacesFilters = ({refetch}) => {

    const {is_moderator} = useAuth()

    const {query, setQuery} = usePlaces()

    const handleSubmit = (e) => {
        e.preventDefault()
        refetch()
    }

    return (
        <div className="places-filters">

            <h2>Поиск находок</h2>

            <div className="right-container" >

                {is_moderator &&
                    <LinkButton to="/places/add" bg={variables.primary}>
                        Добавить реактор
                    </LinkButton>
                }

                <form className="search-form" onSubmit={handleSubmit}>

                    <SearchBar query={query} setQuery={setQuery} placeholder={"Поиск..."} />

                    <CustomButton bg={variables.primary} >
                        Применить
                    </CustomButton>

                </form>

            </div>
        </div>
    )
}

export default PlacesFilters