const btnLogout = document.getElementById("btnLogout");

btnLogout.addEventListener("click", async (e) => {
  e.preventDefault();
  await fetch("/api/sessions/logout", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  window.location.href = "/";
});
