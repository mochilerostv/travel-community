// JavaScript del plugin
const jQuery = window.jQuery // Declare the jQuery variable

jQuery(document).ready(($) => {
  // Manejar clics en botones de signup
  $(".signup-button").on("click", (e) => {
    e.preventDefault()
    alert("¡Funcionalidad de pago en desarrollo! Pronto podrás unirte.")
  })

  // Animaciones simples
  $(".mochileros-deals-signup").hover(
    function () {
      $(this).css("transform", "scale(1.02)")
    },
    function () {
      $(this).css("transform", "scale(1)")
    },
  )

  console.log("Mochileros Travel Deals Pro cargado correctamente")
})
