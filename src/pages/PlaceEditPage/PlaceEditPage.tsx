import "./PlaceEditPage.sass"
import {useParams, useNavigate} from "react-router-dom";
import {usePlace} from "../../hooks/places/usePlace";
import React, {useEffect, useState} from "react";
import CustomInput from "../../components/CustomInput/CustomInput";
import CustomTextarea from "../../components/CustomTextarea/CustomTextarea";
import CustomButton from "../../components/CustomButton/CustomButton";
import {api} from "../../utils/api";
import {useToken} from "../../hooks/users/useToken";
import UploadButton from "../../components/UploadButton/UploadButton";
import {variables} from "../../utils/consts";

const PlaceEditPage = () => {

    const navigate = useNavigate()

    const {access_token} = useToken()

    const { id } = useParams<{id: string}>();

    const {
        place,
        fetchPlace,
        setName,
        setDescription,
        setImage
    } = usePlace()

    useEffect(() => {
        id && fetchPlace(id)
    }, [])

    const [img, setImg] = useState<File | undefined>(undefined)

    const handleFileChange = (e) => {
        if (e.target.files) {
            const img = e.target?.files[0]
            setImg(img)
            setImage(URL.createObjectURL(img))
        }
    }

    const savePlace = async() => {
        let form_data = new FormData()

        form_data.append('name', place.name)
        form_data.append('description', place.description)

        if (img != undefined) {
            form_data.append('image', img, img.name)
        }

        const response = await api.put(`places/${place.id}/update/`, form_data, {
            headers: {
                'content-type': 'multipart/form-data',
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/places/")
        }
    }

    const deletePlace = async () => {

        const response = await api.delete(`places/${place.id}/delete/`, {
            headers: {
                'authorization': access_token
            }
        })

        if (response.status == 200) {
            setImg(undefined)
            navigate("/places/")
        }

    }

    if (id == undefined) {
        return (
            <div>

            </div>
        )
    }

    if (place == undefined) {
        return (
            <div>

            </div>
        )
    }

    return (
        <div className="edit-page-wrapper">

            <div className="left">

                <img src={place.image} alt=""/>

                <UploadButton handleFileChange={handleFileChange}>
                    Выбрать файл
                </UploadButton>

            </div>

            <div className="right">

                <div className="info-container">

                    <CustomInput placeholder="Название" value={place.name} setValue={setName} />

                    <CustomTextarea placeholder="Адрес" value={place.description} setValue={setDescription} />

                    <div className="buttons-container">

                        <CustomButton bg={variables.green} onClick={savePlace}>
                            Сохранить
                        </CustomButton>

                        <CustomButton bg={variables.red} onClick={deletePlace}>
                            Удалить
                        </CustomButton>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default PlaceEditPage