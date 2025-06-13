import { retrieveLaunchParams } from '@telegram-apps/sdk';

const { initDataRaw, initData } = retrieveLaunchParams();

// Показываем initDataRaw на странице
document.getElementById('output').textContent = initDataRaw;

// Отправляем боту
document.getElementById('send').onclick = () => {
    console.log('gagagagag')
    console.log(initDataRaw)
  Telegram.WebApp.sendData(initDataRaw); // можно также отправить initData как JSON
};