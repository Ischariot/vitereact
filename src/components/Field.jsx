import { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, TextField } from '@mui/material';

function Field({ label, placeholder }) {
    // Створюємо стан для значення поля вводу, відображення тексту, індексу редагування та тексту редагування
    const [inputValue, setInputValue] = useState('');
    const [displayedText, setDisplayedText] = useState([]);
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState('');

    // Кількість елементів на сторінці
    const elementsOnPage = 5;

    // Обробник зміни значення поля вводу
    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    // Обробник натискання клавіші Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            addItemToTheEndOfArray(inputValue);
            setInputValue('');
        }
    };

    // Функція для видалення елемента з масиву за індексом
    const deleteItemFromArray = (index) => {
        setDisplayedText([...displayedText].filter((_, i) => i !== index));
    };

    // Функція для додавання елемента до кінця масиву
    const addItemToTheEndOfArray = (text) => {
        setDisplayedText([...displayedText, text]);
    };

    // Функція для видалення коментаря за індексом
    const deleteComment = (index) => {
        deleteItemFromArray(index);
    };

    // Функція для редагування коментаря
    const editComment = (index, text) => {
        setEditIndex(index);
        setEditText(text);
    };

    // Функція для відображення коментарів
    const showComments = (comments) => {
        if (comments.length > 0) {
            if (comments.length > elementsOnPage) {
                deleteComment(0);
            }

            return comments.map((comment, index) => {
                return (
                    <p key={index}>
                        {index === editIndex ? (
                            <>
                                {/* Поле вводу для редагування тексту коментаря */}
                                <TextField
                                    value={editText}
                                    onChange={(e) => setEditText(e.target.value)}
                                />
                                {/* Кнопка для збереження редагованого коментаря */}
                                <Button
                                    onClick={() => {
                                        const updatedComments = [...displayedText];
                                        updatedComments[index] = editText;
                                        setDisplayedText(updatedComments);
                                        setEditIndex(-1);
                                        setEditText('');
                                    }}
                                >
                                    Save
                                </Button>
                                {/* Кнопка для скасування редагування коментаря */}
                                <Button
                                    onClick={() => {
                                        setEditIndex(-1);
                                        setEditText('');
                                    }}
                                >
                                    Cancel
                                </Button>
                            </>
                        ) : (
                            <>
                                {/* Відображення тексту коментаря */}
                                {comment}
                                {/* Кнопка для видалення коментаря */}
                                <Button onClick={() => deleteComment(index)}>Delete</Button>
                                {/* Кнопка для редагування коментаря */}
                                <Button onClick={() => editComment(index, comment)}>Edit</Button>
                            </>
                        )}
                    </p>
                );
            });
        }
    };

    return (
        <div>
            {/* Мітка для поля вводу */}
            <label>{label}</label>
            {/* Поле вводу для нового коментаря */}
            <TextField
                placeholder={placeholder}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
            />
            {/* Відображення коментарів */}
            {showComments(displayedText)}
        </div>
    );
}

// Перевірка типів пропсів
Field.propTypes = {
    label: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
};

// Експорт компоненту Field
export default Field;
