const llamarBtns = document.querySelectorAll('.llamar-btn');
const compartirBtns = document.querySelectorAll('.compartir-btn');

llamarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const numero = btn.dataset.numero;
        window.location.href = `tel:${numero}`;
    });
});

compartirBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const numero = btn.dataset.numero;
        const mensaje = `Llama a este número de emergencia: ${numero}`;
        const url = `whatsapp://send?text=${encodeURIComponent(mensaje)}`;
        window.location.href = url;
    });
});
