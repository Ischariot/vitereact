import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from './components/Footer.jsx';
import Navigation from "./components/Navigation.jsx";
import Home from "./components/pages/Home.jsx";
import Contacts from "./components/pages/Contacts.jsx";
import NotFound from "./components/pages/NotFound.jsx";
import Gallery from "./components/pages/Gallery.jsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import About from "./components/pages/About.jsx";
import Services from "./components/pages/Services.jsx";
import TestAPI from "./components/TestAPI.jsx";
import PokeAPI from "./components/PokeAPI.jsx";

function App() {
    return (
        <>
            <BrowserRouter>
                <Navigation />
                {/*<TestAPI />*/}
                <Routes>
                    <Route path="/" element={<Home />} /> {/*Головна сторінка*/}
                    <Route path="/contacts" element={<Contacts />} />
                    <Route path={"gallery"} element={<Gallery/>} />
                    <Route path="/about" element={<About/>} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/pokeapi" element={<PokeAPI />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
            <Footer />
        </>
    );
}

export default App;
