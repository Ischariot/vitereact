import React, { useState, useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import Checkbox from '@mui/material/Checkbox';
import Students from '../list.json'; // Імпорт даних студентів

const CityFilter = ({ onChange }) => {
    const options = useMemo(() => {
        const uniqueCities = [...new Set(Students.map(item => item.city))];
        return uniqueCities.map(city => (
            <option key={city} value={city}>{city}</option>
        ));
    }, []);

    return (
        <select onChange={onChange}>
            <option value="">All Cities</option>
            {options}
        </select>
    );
};

CityFilter.propTypes = {
    onChange: PropTypes.func.isRequired
};

const StudentComponent = ({ student, dragState, onDragStart, onDragOver, onDrop }) => {
    const [isDragging, setIsDragging] = useState(false); // Стан для відстеження перетягування

    const handleDragStart = (e) => {
        setIsDragging(true);
        onDragStart(student.id); // Виклик функції початку перетягування
        e.dataTransfer.effectAllowed = 'move';
    };

    const handleDragEnd = () => {
        setIsDragging(false); // Завершення перетягування
    };

    let className = isDragging ? 'user dragging' : 'user'; // Додавання класу для перетягування

    return (
        <div
            className={className}
            draggable={dragState}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragOver={onDragOver}
            onDrop={onDrop}
            id={student.id} // Присвоєння ID елементу
        >
            <p>{student.id}</p>
            <p>{student.name}</p>
            <p>{student.absences}</p>
            <p>{student.city}</p>
        </div>
    );
};

StudentComponent.propTypes = {
    student: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        absences: PropTypes.number.isRequired,
        city: PropTypes.string.isRequired
    }).isRequired,
    dragState: PropTypes.bool.isRequired,
    onDragStart: PropTypes.func.isRequired,
    onDragOver: PropTypes.func.isRequired,
    onDrop: PropTypes.func.isRequired
};

const Student = React.memo(StudentComponent);

const List = () => {
    const [selectedCity, setSelectedCity] = useState(''); // Стан для обраного міста
    const [sortDirection, setSortDirection] = useState(null); // Стан для напрямку сортування
    const [dragState, setDragState] = useState(false); // Стан для визначення перетягування
    const [draggedId, setDraggedId] = useState(null); // Стан для ID перетягуваного елемента
    const [overId, setOverId] = useState(null); // Стан для ID над яким проводиться перетягування
    const [students, setStudents] = useState(Students); // Стан для даних студентів

    const handleDragStart = (id) => {
        setDraggedId(id); // Встановлення ID перетягуваного елемента
    };

    const handleDragEnd = () => {
        setDraggedId(null);
        setOverId(null); // Скидання ID перетягування та над яким елементом перетягують
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setOverId(parseInt(e.currentTarget.id, 10)); // Встановлення ID елементу над яким проводиться перетягування
    };

    const handleDrop = () => {
        if (draggedId && overId && draggedId !== overId) {
            setStudents(prevStudents => replaceDraggedAndOverItems(prevStudents, draggedId, parseInt(overId, 10))); // Перестановка елементів
        }
    };

    const replaceDraggedAndOverItems = (students, draggedId, overId) => {
        const indexDragged = students.findIndex(student => student.id === draggedId);
        const indexOver = students.findIndex(student => student.id === overId);
        if (indexDragged < 0 || indexOver < 0) return students; // Перевірка наявності валідних індексів

        const newStudents = [...students];
        [newStudents[indexDragged], newStudents[indexOver]] = [newStudents[indexOver], newStudents[indexDragged]]; // Перестановка елементів у масиві
        return newStudents;
    };

    const handleDragStateChange = useCallback(() => {
        setDragState(prev => !prev); // Зміна стану перетягування
    }, []);

    const handleCityChange = useCallback((event) => {
        setSelectedCity(event.target.value); // Зміна обраного міста
    }, []);

    const handleSort = useCallback((direction) => {
        setSortDirection(direction); // Зміна напрямку сортування
    }, []);

    const handleClear = useCallback(() => {
        setSelectedCity(''); // Очищення обраного міста
        setSortDirection(null); // Скидання напрямку сортування
    }, []);

    const sortedFilteredStudents = useMemo(() => {
        let filteredStudents = students; // Використання стану для фільтрації студентів

        if (selectedCity) {
            filteredStudents = filteredStudents.filter(student => student.city === selectedCity); // Фільтрація за містом
        }

        if (sortDirection) {
            filteredStudents = [...filteredStudents].sort((a, b) =>
                sortDirection === 'up' ? a.absences - b.absences : b.absences - a.absences
            ); // Сортування за кількістю пропущених занять
        }

        return filteredStudents;
    }, [selectedCity, sortDirection, students]); // Додавання студентів до залежностей

    if (!sortedFilteredStudents.length) {
        return <p>Немає студентів для відображення.</p>;
    }

    return (
        <>
            <div className="filters">
                <label>
                    Фільтрувати за містом
                    <CityFilter onChange={handleCityChange} />
                </label>
                <button className="filterButton" onClick={() => handleSort('down')}>
                    Absences <ArrowDownwardIcon />
                </button>
                <button className="filterButton" onClick={() => handleSort('up')}>
                    Absences <ArrowUpwardIcon />
                </button>
                <button className="filterButton" onClick={handleClear}>
                    Clear sorting <HighlightOffIcon />
                </button>
                <Checkbox icon={<ToggleOffIcon />} checkedIcon={<ToggleOnIcon />} onClick={handleDragStateChange} />
            </div>
            <div className="users">
                {sortedFilteredStudents.map(student => (
                    <Student
                        key={student.id}
                        student={student}
                        dragState={dragState}
                        onDragStart={handleDragStart}
                        onDragOver={handleDragOver}
                        onDragEnd={handleDragEnd}
                        onDrop={handleDrop}
                    />
                ))}
            </div>
        </>
    );
};

export default List;

