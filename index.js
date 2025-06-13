import { retrieveLaunchParams } from '@telegram-apps/sdk';

const { initDataRaw, initData } = retrieveLaunchParams();

// Показываем initDataRaw на странице
document.getElementById('output').textContent = initDataRaw;

// Отправляем боту
document.getElementById('send').onclick = () => {
  Telegram.WebApp.sendData(initDataRaw); // можно также отправить initData как JSON
};