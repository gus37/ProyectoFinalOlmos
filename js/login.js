/* profe: en  la entrega anterior los mensajes de bienvenida y los de error se mostraban en in div del DOM, donde se creaba un h1 mostrando los errores. ahora implemento alert de sweet alert.
 */

//creo función asincronica que me ofrece una promoción.

function promo() {
  Swal.fire({
    position: "bottom-end",
    title: "Suscribite y aprovecha hasta 30% de descuento ",
    imageUrl:
      "https://www.neuronup.com/wp-content/uploads/2023/05/30descuento.png",
    imageWidth: 250,
    imageHeight: 250,
    imageAlt: "Custom image",
    timer: 30000,
    timerProgressBar: true,
    padding: "1em",
    color: "#fff",
    confirmButtonText: "X",
    confirmButtonColor: "#4dd0e1",
    customClass: {
      popup: "alert_blur",
    },
  });
}

setTimeout(promo, 20000);

document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    //creo constantes para captar los datos ingresados por el usuario y que voy a utilizar en mi funcion.
    const username = loginForm.username.value;
    const password = loginForm.password.value;

    // creo condicional que va a validar los datos y si son correctos imprime un mensaje de bienvenida y si no uno de error. los mensajes se cierran solos ya que utilice timer.
    if (username === "Gusta37" && password === "1234") {
      Swal.fire({
        icon: "success",
        title: "Bienvenido Gustavo 🙋‍♂️",
        width: 500,
        padding: "1em",
        timer: 3000,
        timerProgressBar: true,
        color: "#fff",
        iconColor: "#fff",
        showConfirmButton: false,
        customClass: {
          popup: "alert_blur",
        },
      });
    } else {
      Swal.fire({
        icon: "error",
        title: " 🤨 Datos incorrectos 😒 ",
        width: 500,
        padding: "1em",
        timer: 3000,
        timerProgressBar: true,
        color: "#fff",
        iconColor: "#fff",
        showConfirmButton: false,
        customClass: {
          popup: "alert_blur",
        },
      });
    }
  });
});
