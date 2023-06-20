const cartId = document.getElementById("cartId").innerHTML;

const btnSalir = document.getElementById("btnSalir");
const btnLimpiar = document.getElementById("btnLimpiar");

btnSalir.addEventListener("click", (e) => {
  window.location.href = "/";
});

btnLimpiar.addEventListener("click", async (e) => {
  let response = await fetch(`/api/carts/${cartId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  window.location.href = `/cart/${cartId}`;
  let result = await response;
  console.log(result);
});
