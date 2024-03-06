import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
    const navigate = useNavigate();
    const [seconds, setSeconds] = useState(5); // Початкове значення лічильника - 5 секунд

    useEffect(() => {
        const timer = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds - 1); // Зменшуємо значення лічильника кожну секунду
        }, 1000);

        // Після 5 секунд автоматично перенаправляємо користувача на головну сторінку
        const redirectTimer = setTimeout(() => {
            navigate('/');
        }, 5000);

        // При знищенні компонента очищаємо таймери
        return () => {
            clearInterval(timer);
            clearTimeout(redirectTimer);
        };
    }, [navigate]);

    return (
        <div>
            <h1>404 - Сторінку не знайдено</h1>
            <p>Ви будете перенаправлені на головну сторінку через {seconds} {seconds === 1 ? 'секунду' : 'секунд'}</p>
        </div>
    );
}

export default NotFound;
