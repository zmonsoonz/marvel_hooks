import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { lazy, Suspense } from "react";
import Char from "../pages/SinglePageLayouts/CharacterLayout";
import Comic from "../pages/SinglePageLayouts/ComicLayout";

const Page404 = lazy(() => import("../pages/404"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const MainPage = lazy(() => import("../pages/MainPage"));
const SinglePage = lazy(() => import("../pages/SinglePage"));

const App = () => {
    return (
        <Router>
            <div className="app">
                <AppHeader/>
                <main>
                    <Suspense fallback={<img src={process.env.PUBLIC_URL + '/Rolling-1s-200px.gif'} alt="loading"></img>}>
                        <Routes>
                            <Route path="/" element={<MainPage/>}/>
                            <Route path="/comics" element={<ComicsPage/>}/>
                            <Route path="/comics/:id" element={<SinglePage Component={Comic} dataType='comic'/>}/>
                            <Route path="/characters/:id" element={<SinglePage Component={Char} dataType='character'/>}/>
                            <Route path="*" element={<Page404/>}/>
                        </Routes>
                    </Suspense>
                </main>
            </div>
        </Router>
    ) 
}

export default App;