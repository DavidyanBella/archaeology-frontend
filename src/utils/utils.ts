import {ru} from "./momentLocalization";
import moment from "moment";

export const format_expedition_date = (value) => {
    if (!value) {
        return "Не рассчитано"
    }

    if (value == "1970-01-01") {
        return "Не удалось рассчитать"
    }

    return moment(value).locale(ru()).format("D MMMM YYYYг")
}

export const formatDateTime = (value) => {
    return moment(value).locale(ru()).format("D MMMM HH:mm")
}