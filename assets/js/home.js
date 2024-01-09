let page = 1
let limit = 3

const renderProducts = () => {
    axios.get(`https://655c83b725b76d9884fd6e9b.mockapi.io/products?limit=${limit}&page=${page}`)
        .then((res) => {
            db = res.data
            db.map((item) => {
                let miniDiv = document.createElement("div")
                miniDiv.className = "miniDiv"
                miniDiv.innerHTML = `
            <img src="${item.image}" alt="">
            <h2>${item.title}</h2>
            <button onclick = "addToCart(${item.id})"> + ADD TO CART</button>
            `
                productsAll.append(miniDiv)
            })
            page++
        })
}

loadMore.addEventListener("click", renderProducts)
const addToCart =(id) =>{
    let cart = JSON.parse(localStorage.getItem("cart")) ||[]
    cart.push(db.find(item=> item.id == id))
    localStorage.setItem("cart",JSON.stringify(cart))
}

window.onload = () => {
    renderProducts()
}


const btn = document.getElementById("btn")
const inp = document.getElementById("inp")


function findByName() {
    productsAll.innerHTML = ``
    axios.get("https://655c83b725b76d9884fd6e9b.mockapi.io/products")
        .then((res) => {
            db = res.data
            let filteredData = db.filter(item => item.title.toLowerCase().startsWith(inp.value.toLowerCase()))
            let sortData = [...filteredData].sort((a, b) => a.title.localeCompare(b.title))
            let sortDataTitle = [...filteredData].sort((b,a) => b.title.localeCompare(a.title))

            sortData.map((item) => {
                let miniDiv = document.createElement("div")
                miniDiv.className = "miniDiv"
                miniDiv.innerHTML = `
        <img src="${item.image}" alt="">
        <h2>${item.title}</h2>
        <button onclick = "addToCart(${item.id})">Add to Cart</button>
        `
                productsAll.append(miniDiv)
            })

            sortDataTitle.map((item) => {
                let miniDiv = document.createElement("div")
                miniDiv.className = "miniDiv"
                miniDiv.innerHTML = `
        <img src="${item.image}" alt="">
        <h2>${item.title}</h2>
        <button onclick = "addToCart(${item.id})">Add to Cart</button>
        `
                productsAll.append(miniDiv)
            })

        })
}

btn.addEventListener("click", findByName)



const myForm = document.getElementById("myForm")
const nameInp = document.getElementById("nameInp")
const emialInp = document.getElementById("emialInp")
const sendMessage = document.getElementById("sendMessage")


myForm.addEventListener("submit",function(event){
    event.preventDefault()
    axios.post("https://655c83b725b76d9884fd6e9b.mockapi.io/basket",{
        name: nameinp.value,
        surname: surnameinp.value,
        age: ageinp.value,
        email: emailinp.value,

    })
    .then((res)=>{
        console.log(res.data);
    })
    setTimeout(function () {
        window.location.href = "index.html"
    }, 2000)
})
