const container = document.querySelector(".container")
const PS = document.querySelector(".split.left")
const XBox = document.querySelector(".split.right")

PS.addEventListener("mouseenter", () => container.classList.add("hover-left"))
PS.addEventListener("mouseleave", () =>
  container.classList.remove("hover-left")
)

XBox.addEventListener("mouseenter", () =>
  container.classList.add("hover-right")
)
XBox.addEventListener("mouseleave", () =>
  container.classList.remove("hover-right")
)
