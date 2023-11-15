let totalNetPrice = 0
let netPrice = document.getElementsByClassName('netPrice')

function getItems() {
    let basket = JSON.parse(localStorage.getItem('products'))
    if (basket.length > 0) {
        document.querySelector('.alert').classList.add('d-none')
        document.querySelector('.table').classList.remove('d-none')
        basket.forEach(item => {
            document.querySelector('.table tbody').innerHTML +=
                `
        <tr>
            <td>${item.Id}</td>
            <td>
                <img src=${item.Image}>
            </td>
            <td>${item.Title}</td>
            <td>
                <input type="number" min="1" value=${item.Count}>
            </td>

            <td class='price'>${item.Price}</td>
  
            <td class='netPrice'>${(item.Price * item.Count).toFixed(2)} ₼</td>
            <td>
                <button class='btn btn-danger btn-delete'>
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
        `
        })
    }
    else {
        document.querySelector('.alert').classList.remove('d-none')
        document.querySelector('.table').classList.add('d-none')
    }

    

    SummaryPriceResult()



    let delete_buttons = document.querySelectorAll('.btn-delete')

    for (let delete_btn of delete_buttons) {
        delete_btn.onclick = function () {
            let id = this.parentElement.parentElement.children[0].innerText
            let filtered_items = basket.filter(item => item.Id !== id)
            localStorage.setItem('products', JSON.stringify(filtered_items))
            location.reload()
            SummaryPriceResult()
        }

    }

    let input = document.querySelectorAll('input')
    for (let count_input of input) {
        count_input.onchange = function() {
        let itemCount = this.value
        let price = this.parentElement.parentElement.children[4].innerText
        this.parentElement.parentElement.children[5].innerText = (price*itemCount).toFixed(2)+' ₼'
        SummaryPriceResult()
    }
    }
}


getItems()



    function SummaryPriceResult(){
        for(let i=0; i < netPrice.length; i++){
        totalNetPrice += parseFloat(netPrice[i].innerText)
        document.getElementById('totaltNetPrice').innerHTML = totalNetPrice.toFixed(2) +' ₼'
        }
        console.log(netPrice);
    }