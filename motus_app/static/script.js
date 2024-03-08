document.getElementById('wordForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const formData = new FormData(this);
    const word = formData.get('wordInput');

    const response = await fetch('/checkword', {
        method: 'POST',
        body: JSON.stringify({ word }),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    document.getElementById('result').innerHTML = data.message;
});

function redirigerVersAutrePage() {
    window.location.href = 'http://localhost:3001/getscore';
}
