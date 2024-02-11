import {useEffect} from "react";
import {useFind} from "../../hooks/finds/useFind";
import {useNavigate, useParams} from "react-router-dom"
import PlaceCard from "../../components/PlaceCard/PlaceCard";
import "./FindPage.sass"
import {useAuth} from "../../hooks/users/useAuth";
import {STATUSES, variables} from "../../utils/consts";
import {ru} from "../../utils/momentLocalization";
import moment from "moment";
import CustomButton from "../../components/CustomButton/CustomButton";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";

const FindPage = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const navigate = useNavigate()

    const { id } = useParams<{id: string}>();

    const {find, name, description, expedition, setDescription, setName, setExpedition, fetchFind, saveFind, sendFind, deleteFind, setFind, setFindId} = useFind()

    useEffect(() => {

        if (!id || !is_authenticated) {
            navigate("/")
        }

        setFindId(id)
        fetchFind(id)

        return () => {
            setFind(undefined)
            setExpedition(undefined)
            setName(undefined)
            setDescription(undefined)
        };
    }, [])

    if (find == undefined)
    {
        return (
            <div className="find-page-wrapper">
                <h1>Пусто</h1>
            </div>
        )
    }

    const onSendFind = async() => {
        await saveFind()
        await sendFind()
        navigate("/finds")
    }

    const onDeleteFind = async () => {
        await deleteFind()
        navigate("/places")
    }

    const cards = find.places.map(place  => (
        <PlaceCard place={place} key={place.id} />
    ))


    const ButtonsContainer = () => {
        return (
            <div className="buttons-wrapper">

                <CustomButton onClick={saveFind} bg={variables.green}>Сохранить</CustomButton>

                <CustomButton onClick={onSendFind} bg={variables.primary}>Отправить</CustomButton>

                <CustomButton onClick={onDeleteFind} bg={variables.red}>Удалить</CustomButton>

            </div>
        )
    }

    const is_draft = find.status == 1

    const completed = [3, 4].includes(find.status)

    return (
        <div className="find-page-wrapper">

            <div className="find-places-wrapper">
                <div className="top">
                    <h3>{is_draft ? "Новая находка" :  "Находка №" + find.id}</h3>
                </div>

                <div className="find-info-container">
                    <span>Статус: {STATUSES.find(status => status.id == find.status).name}</span>
                    <span>Дата создания: {moment(find.date_created).locale(ru()).format("D MMMM HH:mm")}</span>
                    {[2, 3, 4].includes(find.status) && <span>Дата формирования: {moment(find.date_formation).locale(ru()).format("D MMMM HH:mm")}</span>}
                    {completed && <span>Дата завершения: {moment(find.date_complete).locale(ru()).format("D MMMM HH:mm")}</span> }
                </div>

                <div className="inputs-container">

                    <CustomInput placeholder="Название" value={name} setValue={setName} disabled={!is_draft}  />
                    <CustomTextarea placeholder="Описание" value={description} setValue={setDescription} disabled={!is_draft}  />
                    <CustomInput placeholder="Название экспедиции" value={expedition} setValue={setExpedition} disabled={!is_draft}  />

                </div>

                <div className="title">
                    <h3>Места</h3>
                </div>

                <div className="bottom">

                    {cards}

                </div>
            </div>

            {!is_moderator && is_draft && <ButtonsContainer />}

        </div>
    )
}

export default FindPage