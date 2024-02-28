import React, { useState } from 'react';
import Students from '../list.json';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import '../main.css'; // Підключаємо файл CSS

function List() {
    // Додано стани для фільтрації за містом, за іменем та для сортування
    const [filterCity, setFilterCity] = useState('0'); // Додано стан для фільтрації за містом
    const [filterName, setFilterName] = useState(''); // Додано стан для фільтрації за іменем
    const [sortByAbsences, setSortByAbsences] = useState('ASC'); // Додано стан для сортування

    // Отримання унікальних міст зі списку студентів
    const cities = [...new Set(Students.map(student => student.city))];

    // Функція для фільтрації міст
    const filterByCity = (student) => {
        if (filterCity === '0') return true; // Якщо обрано "All", то повертаємо true
        return student.city === filterCity; // Перевіряємо, чи місто студента співпадає з обраним містом для фільтрації
    };

    // Функція для фільтрації за іменем
    const filterByName = (student) => {
        if (filterName === '') return true; // Якщо поле фільтрації за іменем порожнє, то повертаємо true
        // Перевіряємо, чи ім'я студента містить введену фразу (без врахування регістру)
        return student.name.toLowerCase().includes(filterName.toLowerCase());
    };

    // Функція для сортування за кількістю пропусків
    const sortByAbsencesFunc = (a, b) => {
        if (sortByAbsences === 'ASC') {
            return a.absences - b.absences; // Сортування за зростанням кількості пропусків
        } else {
            return b.absences - a.absences; // Сортування за спаданням кількості пропусків
        }
    };

    // Функція для зміни напряму сортування
    const handleSort = () => {
        // Якщо поточний напрям сортування - ASC, змінюємо на DESC, і навпаки
        setSortByAbsences(sortByAbsences === 'ASC' ? 'DESC' : 'ASC');
    };

    // Функція для очищення сортування
    const handleClearSorting = () => {
        setSortByAbsences('ASC'); // Встановлюємо початковий напрям сортування
        setFilterName(''); // Очищуємо фільтр по імені
        setFilterCity('0'); // Очищуємо фільтр по місту
    };

    return (
        <>
            {/* Фільтри */}
            <div className={'filters'}>
                <label>Filter by name
                    <input className="filter-input" type="text" value={filterName} onChange={(e) => setFilterName(e.target.value)} />
                </label>
                <label>Filter by city
                    <select className="filter-select" onChange={(e) => setFilterCity(e.target.value)}>
                        <option value="0">Всі міста та села</option>
                        {cities.map((city, index) => (
                            <option key={index} value={city}>{city}</option>
                        ))}
                    </select>
                </label>
                {/* Кнопки для сортування */}
                <button className="filter-button" onClick={() => setSortByAbsences('ASC')}>
                    Absences <ArrowDownwardIcon/>
                </button>
                <button className="filter-button" onClick={() => setSortByAbsences('DESC')}>
                    Absences <ArrowUpwardIcon/>
                </button>
                {/* Кнопка для очищення сортування */}
                <button className={'filterButton'} onClick={handleClearSorting}>
                    Clear sorting <HighlightOffIcon />
                </button>
            </div>

            {/* Відображення списку студентів */}
            <h1>Students</h1>
            <div className={"users"}>
                {Students.filter(filterByCity).filter(filterByName).sort(sortByAbsencesFunc).map((student) => (
                    <div className={"user"} key={student.id}>
                        <p>
                            {student.name}
                        </p>
                        <p>
                            {student.absences}
                        </p>
                        <p>
                            {student.city}
                        </p>
                    </div>
                ))}
            </div>
        </>
    );
}

export default List;
