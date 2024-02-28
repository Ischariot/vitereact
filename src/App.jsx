import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainContent from './components/MainContent.jsx';
import Footer from './components/Footer.jsx';
import Navigation from "./components/Navigation.jsx";
import Welcome from './components/Welcome.jsx'
import Field from './components/Field.jsx';
import List from './components/List.jsx';
import Task from './components/Task.jsx';

function App() {

    return (
        <>
            <Navigation/>

            <Welcome name={"Iuda"} lastname={"Ischariot"}/>
            <Field label={"Введіть текст"} placeholder={"..."}/>
            <List/>
            <Task/>
            <MainContent/>

            <Footer/>
        </>
    )
}

export default App;