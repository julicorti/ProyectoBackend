document.addEventListener("DOMContentLoaded", function() {
    // Crea una instancia de Stripe
    var stripe = Stripe('TU_PUBLIC_KEY_AQUI'); // Reemplaza 'TU_PUBLIC_KEY_AQUI' con tu clave pública de Stripe

    // Crea una instancia de elementos de Stripe
    var elements = stripe.elements();

    // Personaliza los elementos
    var style = {
        base: {
            color: '#32325d',
            lineHeight: '18px',
            fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
            fontSmoothing: 'antialiased',
            fontSize: '16px',
            '::placeholder': {
                color: '#aab7c4'
            }
        },
        invalid: {
            color: '#fa755a',
            iconColor: '#fa755a'
        }
    };

    // Crea una instancia del elemento de tarjeta
    var card = elements.create('card', { style: style });

    // Añade el elemento de tarjeta al DOM
    card.mount('#card-element');

    // Maneja la validación de errores en tiempo real
    card.on('change', function(event) {
        var displayError = document.getElementById('card-errors');
        if (event.error) {
            displayError.textContent = event.error.message;
        } else {
            displayError.textContent = '';
        }
    });

    // Maneja la presentación del formulario
    var form = document.getElementById('payment-form');
    form.addEventListener('submit', function(event) {
        event.preventDefault();

        stripe.createToken(card).then(function(result) {
            if (result.error) {
                // Informar al usuario de los errores
                var errorElement = document.getElementById('card-errors');
                errorElement.textContent = result.error.message;
            } else {
                // Enviar el token al servidor
                stripeTokenHandler(result.token);
            }
        });
    });

    // Envía el token al servidor
    function stripeTokenHandler(token) {
        fetch('/charge', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ stripeToken: token.id }),
        })
        .then(response => response.text())
        .then(result => {
            alert(result);
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Hubo un problema con el pago. Inténtalo de nuevo.');
        });
    }
});