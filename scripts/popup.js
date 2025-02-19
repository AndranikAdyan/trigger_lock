const API_URI = 'https://echo.free.beeceptor.com';

const $field = document.querySelector('#field');
const $checkButton = document.querySelector('#check');

$checkButton.onclick = () => {
    delete document.body.dataset.status;

    $checkButton.classList.add('loading');

    fetch(API_URI, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          pageUrl: null,
          text: $field.value ?? '',
        })
      })
      .then(res => res.json())
      .then(() => {
        setTimeout(() => {
            const isStatus = Math.random() < 0.5;

            $checkButton.classList.remove('loading');
            document.body.dataset.status = isStatus ? 'success' : 'warning';
        }, 2000)
      })
}