import { useNavigate } from 'react-router-dom';

function NavHistory() {
    let history = useNavigate();

    function handleGoBack() {
        history(-1); // повертає користувача на попередню сторінку
    }

    function handleGoForward() {
        history(1); // переводить користувача на наступну сторінку в історії
    }

    function handleGoToHome() {
        history('/'); // перенаправляє користувача на головну сторінку
    }

    return (
        <div>
            <button onClick={handleGoBack}>Go Back</button>
            <button onClick={handleGoForward}>Go Forward</button>
            <button onClick={handleGoToHome}>Go to Home</button>
        </div>
    );
}

export default NavHistory;
