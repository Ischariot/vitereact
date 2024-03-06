import React from "react";
import Welcome from "../Welcome.jsx";
import Field from "../Field.jsx";
import List from "../List.jsx";
import Task from "../Task.jsx";
import "../../main.css"



const Home = () => {
    return (
        <div className="container"> {/* Додайте контейнер */}
            <Welcome name={"Iuda"} lastname={"Ischariot"}/>
            <Field label={"Введіть текст"} placeholder={"..."}/>
            <a href="/pokeapi" className="pokeapi-button">FOOOOX</a>
            <List/>
            <Task/>
            {/*<MainContent/>*/}

        </div>
    )
}

export default Home;