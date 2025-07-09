const theme = document.querySelector("#theme");
const themeButton = document.querySelector("#themechange");
let a = 0

themeButton.addEventListener("click", () => {
    if (a === 0) {
    theme.href = "light.css"
    a = 1
  } else if (a === 1) {
    theme.href = "dark.css"
    a = 0
  }
}); 