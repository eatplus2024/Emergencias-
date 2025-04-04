const llamarBtns = document.querySelectorAll('.llamar-btn');

llamarBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const numero = btn.dataset.numero;
        window.location.href = `tel:${numero}`;
    });
});
