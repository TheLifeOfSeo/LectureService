const navigationBar = document.querySelector("#navigation-bar")
const nav_btn1 = document.getElementById("nav_btn1")
const nav_btn2 = document.getElementById("nav_btn2")
const nav_btn3 = document.getElementById("nav_btn3")
const nav_btn4 = document.getElementById("nav_btn4")



const menuBtns = [
    nav_btn1,
    nav_btn2,
    nav_btn3,
    nav_btn4
]

menuBtns.forEach((button) => {
    button.on("click", () => {
        menuBtns.forEach((_btn) => {
            if (_btn == button) {
                _btn.addClass("selected")
            } else {
                _btn.removeClass("selected")
            }
        })

        contentContainer.load(`/${button.attr("id")}`)
    })
})



toggleOrder.on("click", () => {
    contentContainer.load("/order")
})


toggleMain.click()


window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        navigationBar.classList.add("hide")
    } else {
        navigationBar.classList.remove("hide")
    }
})

