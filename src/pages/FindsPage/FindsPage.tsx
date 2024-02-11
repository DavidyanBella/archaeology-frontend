import FindsTable from "./FindsTable/FindsTable";
import {useAuth} from "../../hooks/users/useAuth";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom"

const FindsPage = () => {    

    const {is_authenticated} = useAuth()

    const navigate = useNavigate()

    useEffect(() => {
        if (!is_authenticated) {
            navigate("/places")
        }
    }, [])

    return (
        <div>
            <FindsTable />
        </div>
    )
}

export default FindsPage;

