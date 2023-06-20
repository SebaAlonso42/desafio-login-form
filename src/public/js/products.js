const btnAddToCart = document.querySelectorAll(".addToCart");
const cartId = document.getElementById("cartId").innerHTML;

btnAddToCart.forEach((element) => {
  element.onclick = (e) => {
    e.preventDefault();
    prodId = element.getAttribute("id");
    console.log(prodId);

    fetch(`/api/carts/${cartId}/products/${prodId}-1`, { method: "PUT" })
      .then(() => {
        console.log("Success");
      })
      .catch((error) => console.log(error));
  };
});
