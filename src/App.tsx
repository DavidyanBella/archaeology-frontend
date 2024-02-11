import "./styles/Main.sass"
import "./styles/Reset.sass"
import Header from "./components/Header/Header";
import Breadcrumbs from "./components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import PlacePage from "./pages/PlacePage/PlacePage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import {QueryClient, QueryClientProvider } from "react-query";
import {Provider} from "react-redux"
import store from "./store/store"
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import {useAuth} from "./hooks/users/useAuth";
import FindConstructor from "./components/FindConstructor/FindConstructor";
import FindPage from "./pages/FindPage/FindPage";
import FindsPage from "./pages/FindsPage/FindsPage";
import PlaceEditPage from "./pages/PlaceEditPage/PlaceEditPage";
import PlaceAddPage from "./pages/PlaceAddPage/PlaceAddPage";
import PlacesTableWrapper from "./pages/PlacesPage/PlacesTableWrapper/PlacesTableWrapper";
import PlacesList from "./pages/PlacesPage/PlacesList/PlacesList";


const TopPanelWrapper = () => {

    const {is_authenticated, is_moderator} = useAuth()

    const location = useLocation()

    return (
        <div className="top-panel-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("places") && <FindConstructor /> }
        </div>
    )
}


function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

                <BrowserRouter basename="/archaeology">

                    <div className="App">

                        <div className="wrapper">

                            <Header />

                            <div className={"content-wrapper"}>

                                <TopPanelWrapper />

                                <Routes>

                                    <Route path="/" element={<Navigate to="/places" replace />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/places" element={<PlacesList />} />

                                    <Route path="/places-table" element={<PlacesTableWrapper />} />

                                    <Route path="/places/add" element={<PlaceAddPage />} />

                                    <Route path="/places/:id" element={<PlacePage />} />

                                    <Route path="/places/:id/edit" element={<PlaceEditPage />} />

                                    <Route path="/profile" element={<ProfilePage />} />

                                    <Route path="/finds/:id" element={<FindPage />} />

                                    <Route path="/finds" element={<FindsPage />} />

                                    <Route path="/login" element={<LoginPage />} />

                                    <Route path="/register" element={<RegisterPage />} />

                                </Routes>

                            </div>

                        </div>

                    </div>

                </BrowserRouter>

            </Provider>

        </QueryClientProvider>
    )
}

export default App
