const toggles = document.querySelectorAll(".faq-toggle")

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    let faq = toggle.parentElement
    faq.classList.toggle("active")
  })
})
