import { useState } from 'react';

function TaskList() {
    // Стан для управління списком задач
    const [tasks, setTasks] = useState([]);
    // Стан для управління введенням нових задач
    const [newTask, setNewTask] = useState('');

    // Функція для додавання нової задачі до списку
    const addTask = () => {
        if (newTask.trim() !== '') {
            // Додаємо нову задачу до списку з використанням поточного часу як ідентифікатора
            setTasks([...tasks, { id: Date.now(), text: newTask, done: false }]);
            // Очищаємо поле введення після додавання задачі
            setNewTask('');
        }
    };

    // Функція для перемикання стану виконання задачі
    const toggleTask = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, done: !task.done } : task
            )
        );
    };

    // Функція для видалення задачі зі списку
    const deleteTask = (taskId) => {
        setTasks(tasks.filter((task) => task.id !== taskId));
    };

    return (
        <>
            <div className={'task-form'}>
                {/* Поле введення для нової задачі */}
                <input
                    type="text"
                    placeholder="Введіть нову задачу"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                />
                {/* Кнопка для додавання задачі */}
                <button onClick={addTask}>Додати задачу</button>
            </div>

            <h1 className="title_task">Список задач</h1>
            <div className={"tasks"}>
                {/* Відображення кожної задачі зі списку */}
                {tasks.map((task) => (
                    <div className={"task"} key={task.id}>
                        {/* Текст задачі з можливістю відзначення, якщо вона виконана */}
                        <p className={task.done ? 'done' : ''}>{task.text}</p>
                        <div>
                            {/* Кнопка для перемикання стану виконання задачі */}
                            <button onClick={() => toggleTask(task.id)}>Виконано</button>
                            {/* Кнопка для видалення задачі */}
                            <button onClick={() => deleteTask(task.id)}>Видалити</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default TaskList;
