document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contact-form');

  // Generar dos números aleatorios para captcha (ejemplo 1 a 10)
  const num1 = Math.floor(Math.random() * 10) + 1;
  const num2 = Math.floor(Math.random() * 10) + 1;
  let captchaSum = num1 + num2; // <-- Cambiado a let para actualizar

  // Mostrar los números en el label
  document.getElementById('captcha-num1').textContent = num1;
  document.getElementById('captcha-num2').textContent = num2;

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Validar captcha
    const userAnswer = parseInt(form.elements['captcha'].value, 10);
    if (userAnswer !== captchaSum) {
      alert('Respuesta incorrecta en el captcha. Por favor, intenta de nuevo.');
      return;
    }

    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }

    const templateParams = {
      name: form.elements['name'].value,
      email: form.elements['email'].value,
      message: form.elements['message'].value,
    };

    emailjs.send('service_il2ai1h', 'template_7oeffjf', templateParams)
      .then(function(response) {
        alert('¡Mensaje enviado con éxito!');
        form.reset();

        // Regenerar captcha al enviar con éxito
        const newNum1 = Math.floor(Math.random() * 10) + 1;
        const newNum2 = Math.floor(Math.random() * 10) + 1;
        document.getElementById('captcha-num1').textContent = newNum1;
        document.getElementById('captcha-num2').textContent = newNum2;
        captchaSum = newNum1 + newNum2;
      })
      .catch(function(error) {
        alert('Error al enviar el mensaje, intenta más tarde.');
        console.error('EmailJS error:', error);
      });
  });
});
