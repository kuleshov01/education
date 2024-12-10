// Определяем ширину экрана
const screenWidth = window.innerWidth;

document.getElementById('cardForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitButton = document.querySelector('#check-button'); // Найдите кнопку submit
    submitButton.disabled = true; // Отключаем кнопку

    const cardNumberInput = document.getElementById('cardNumberInput');
    let cardNumber = cardNumberInput.value.trim();

    // Убираем пробелы из номера карты
    cardNumber = cardNumber.replace(/\s+/g, '');

    if (!/^\d+$/.test(cardNumber)) {
        alert('Неверный формат. Допустимы только цифры.');
        return;
    } else if (cardNumber.length !== 16) {
        alert('Необходимо указать полный номер карты (16 цифр).');
        return;
    }

    const container = document.querySelector('.hidden-contanier');
    container.style.display = 'none'; // Скрываем старый блок, если он есть
    container.innerHTML = ''; // Очищаем содержимое

    container.innerHTML = `
        <div class="horizontal-divider"></div>
        <div class="hidden-contanier1">
            <div id="loading">
                <div class="spinner"></div>
            </div>
        </div>
    `;
    container.style.display = 'block';

    try {

        const response = await fetch('/api/checkcard', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ cardNumber })
        });

        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        // Формируем новый HTML-контейнер с динамическим содержимым
        // Убираем загрузку
        container.innerHTML = '';

        if (data.status === "error") {
            // Отображаем сообщение об ошибке
            container.innerHTML = `
                <div class="horizontal-divider"></div>
                <div>
                    <p class="card-status-text-style" style="color: red; font-size: 1.5em; text-align: center;">
                        Нет информации о владельце карты.
                    </p>
                </div>
            `;
        } else {

            if (screenWidth <= 980) {
                const statusHTML = `
                <div class="horizontal-divider"></div>
                <div class="hidden-contanier1">
                    <div class="hidden-text-container">
                            <p class="window-text-style">Пользовательский статус карты</p>
                            <div class="status-card-widget" id="status">
                                ${data.status === "1" ?
                        `<span class="status-card-active"></span> <p class="status-text-display-style">Карта подключена</p>` :
                        `<span class="status-card-deactive"></span> <p class="status-text-display-style">Карта неактивна</p>`}
                            </div>
                        </div><div class="hidden-text-container">
                            <p class="window-text-style">Сахалинское долголетие</p>
                            <div class="status-card-widget" id="dolg">
                                ${data.dolg === "1" ?
                        `<span class="status-card-active"></span> <p class="status-text-display-style">Активно</p>` :
                        (data.dolg === "error" ?
                            `<p class="status-text-display-style" style="color: red;">Не удается получить статус</p>` :
                            `<span class="status-card-deactive"></span> <p class="status-text-display-style">Неактивно</p>`)}
                            </div>
                        </div>
                    <div class="hidden-text-container">
                            <p class="window-text-style">Скидки и бонусы</p>
                            <div class="status-card-widget" id="loy">
                                ${data.loy === "1" ?
                        `<span class="status-card-active"></span> <p class="status-text-display-style">Активно</p>` :
                        (data.loy === "error" ?
                            `<p class="status-text-display-style" style="color: red;">Не удается получить статус</p>` :
                            `<span class="status-card-deactive"></span> <p class="status-text-display-style">Неактивно</p>`)}
                            </div>
                        </div><div class="hidden-text-container">
                            <p class="window-text-style">Бесплатный проезд в городском транспорте</p>
                            <div class="status-card-widget" id="rstk">
                                ${data.rstk === "1" ?
                        `<span class="status-card-active"></span> <p class="status-text-display-style">Активно</p>` :
                        (data.rstk === "error" ?
                            `<p class="status-text-display-style" style="color: red;">Не удается получить статус</p>` :
                            `<span class="status-card-deactive"></span> <p class="status-text-display-style">Неактивно</p>`)}
                            </div>
                        </div>
                </div>
            </div>
            `;

                // Вставляем новый HTML в контейнер
                container.innerHTML = statusHTML;
            } else {
                const statusHTML = `
                <div class="horizontal-divider"></div>
                <div class="hidden-contanier1">
                    <div class="hidden-contanier2">
                        <div class="vertical-card-container">
                            <p class="card-status-text-style">Пользовательский статус карты</p>
                            <div class="status-card-widget" id="status">
                                ${data.status === "1" ?
                        `<span class="status-card-active"></span> <p class="status-text-display-style">Карта подключена</p>` :
                        `<span class="status-card-deactive"></span> <p class="status-text-display-style">Карта неактивна</p>`}
                            </div>
                        </div>
                        <div class="longevity-status-container">
                            <p class="card-status-text-style">Сахалинское долголетие</p>
                            <div class="status-card-widget" id="dolg">
                                ${data.dolg === "1" ?
                        `<span class="status-card-active"></span> <p class="status-text-display-style">Активно</p>` :
                        (data.dolg === "error" ?
                            `<p class="status-text-display-style" style="color: red;">Не удается получить статус</p>` :
                            `<span class="status-card-deactive"></span> <p class="status-text-display-style">Неактивно</p>`)}
                            </div>
                        </div>
                    </div>
                    <div class="flex-row-with-gap">
                        <div class="vertical-card-container">
                            <p class="card-status-text-style">Скидки и бонусы</p>
                            <div class="status-card-widget" id="loy">
                                ${data.loy === "1" ?
                        `<span class="status-card-active"></span> <p class="status-text-display-style">Активно</p>` :
                        (data.loy === "error" ?
                            `<p class="status-text-display-style" style="color: red;">Не удается получить статус</p>` :
                            `<span class="status-card-deactive"></span> <p class="status-text-display-style">Неактивно</p>`)}
                            </div>
                        </div>
                        <div class="vertical-card-container">
                            <p class="card-status-text-style">Бесплатный проезд в городском транспорте</p>
                            <div class="status-card-widget" id="rstk">
                                ${data.rstk === "1" ?
                        `<span class="status-card-active"></span> <p class="status-text-display-style">Активно</p>` :
                        (data.rstk === "error" ?
                            `<p class="status-text-display-style" style="color: red;">Не удается получить статус</p>` :
                            `<span class="status-card-deactive"></span> <p class="status-text-display-style">Неактивно</p>`)}
                            </div>
                        </div>
                    </div>
                </div>
            `;

                // Вставляем новый HTML в контейнер
                container.innerHTML = statusHTML;
            }

        }
    } catch (error) {
        console.error('Ошибка:', error);
        alert('Произошла ошибка при отправке данных. Попробуйте позже.');
    }
    submitButton.disabled = false; // Включаем кнопку
});
