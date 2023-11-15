if (localStorage.getItem('products') === null){
    localStorage.setItem('products', JSON.stringify([]))
}

let buttons = document.querySelectorAll('.card a')
let alertBox = document.querySelector('.toast-container')
let alertBoxText = document.querySelector('.fw-semibold')

for(let btn of buttons) {
    btn.onclick = function(e){
        e.preventDefault()
        let basket = JSON.parse(localStorage.getItem('products'))
        let id = this.parentElement.parentElement.id;
        let img = this.parentElement.previousElementSibling.src;
        let title = this.parentElement.children[0].innerText;
        let price  = this.previousElementSibling.children[0].innerText;

        let existProduct = basket.find(item => item.Id === id)
        if (existProduct === undefined){
            basket.push({
                Id: id,
                Image: img,
                Title: title,
                Price: price,
                Count: 1
            })
            showSuccessAlert()
        }     
        else {
            existProduct.Count++
            showDangerAlert()
        }   

        setTimeout(() => {
            alertBox.classList.add('d-none')
        }, 1000);
        
        
        localStorage.setItem('products', JSON.stringify(basket))
        showCount()
    }
} 


function showSuccessAlert(){
    alertBox.classList.remove('d-none')
    alertBox.classList.remove('text-bg-danger')
    alertBox.classList.add('text-bg-success')
    alertBoxText.innerText = 'Məhsul əlavə olundu' 
}

function showDangerAlert(){
    alertBox.classList.remove('d-none')
    alertBox.classList.remove('text-bg-success')
    alertBox.classList.add('text-bg-danger')
    alertBoxText.innerText = 'Məhsulun sayı artırıldı'
}


function showCount(){
    let basket = JSON.parse(localStorage.getItem('products'))
    document.querySelector('#count').innerText = basket.length
}

showCount()

let products = document.querySelector('#products')

async function getAllProducts(){
    await fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(data=> {
                data.forEach(item => {
                    products.innerHTML +=
                    `            
                    <div class="col-lg-4">
                    <div class="item">
                        <div id="1" class="card">
                            <img class="card-img-top" src="${item.image}" alt="Card image cap">
                            <div class="card-body">
                                <h5 class="card-title">${item.title}</h5>
                                <p class="card-text"><span>82</span> AZN</p>
                                <a href="#" class="btn btn-primary">Add to cart</a>
                            </div>
                        </div>
                    </div>
                </div>
                    `
                });
            })
}

getAllProducts.then 