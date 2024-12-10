document.getElementById('reset-button').addEventListener('click', () => {
    // Очистить значение input с id="cardNumberInput"
    document.getElementById('cardNumberInput').value = '';

    // Опционально скрыть контейнер статуса карты, если он видим
    const statusContainer = document.querySelector('.hidden-contanier');
    if (statusContainer) {
        statusContainer.style.display = 'none';
    }

    // Если нужно сбросить спиннер или сообщения об ошибке
    const loadingSpinner = document.getElementById('loading-spinner');
    const errorMessage = document.getElementById('error-message');
    if (loadingSpinner) loadingSpinner.style.display = 'none';
    if (errorMessage) errorMessage.style.display = 'none';
});
document.querySelector('.exit-btn-style').addEventListener('click', () => {
    window.location.href = '/'; // Переход на главную страницу
});

document.getElementById('cardNumberInput').addEventListener('input', function (e) {
    let value = e.target.value.replace(/\D/g, ''); // Убираем все нецифровые символы

    // Форматируем строку, добавляя пробелы через каждые 4 цифры
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');

    e.target.value = value;
});
