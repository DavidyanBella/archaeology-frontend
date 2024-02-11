import "./FindConstructor.sass"
import {useFind} from "../../hooks/finds/useFind";
import {Link} from "react-router-dom";

const FindConstructor = () => {

    const {find_id} = useFind()

    if (find_id == undefined) {
        return (
            <div className="constructor-container disabled">
                <span className="title">Новая находка</span>
            </div>
        )
    }

    return (
        <Link to={`/finds/${find_id}`} className="constructor-container">
            <span className="title">Новая находка</span>
        </Link>
    )
}

export default FindConstructor