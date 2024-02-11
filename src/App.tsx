import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import {useState} from "react";
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import PlaceList from "./Components/PlaceList/PlaceList";
import PlacePage from "./Components/PlacePage/PlacePage";
import {Place} from "./Types";

function App() {

    const [selectedPlace, setSelectedPlace] = useState<Place | undefined>(undefined)

    return (
        <div className="App">

            <div className="wrapper">

                <Header />

                <div className={"content-wrapper"}>

                    <BrowserRouter basename="/archaeology-frontend">

                        <Breadcrumbs selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace}/>

                        <Routes>

                            <Route path="/" element={<Navigate to="/places" replace />} />

                            <Route path="/places" element={<PlaceList />} />

                            <Route path="/places/:id" element={<PlacePage selectedPlace={selectedPlace} setSelectedPlace={setSelectedPlace} />} />

                        </Routes>

                    </BrowserRouter>

                </div>

            </div>

        </div>
    )
}

export default App
