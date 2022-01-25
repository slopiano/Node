const table = document.querySelector('.data')
const balance = document.querySelector('.balance')
const moneyPlus = document.querySelector('.money.plus')
const moneyMinus = document.querySelector('.money.minus')
const addNew = document.querySelector('#form')
const descriptions = document.querySelector('#text')
const amounts = document.querySelector('#amount')
const types = document.querySelector('#type')

const showData = async () =>{
    var totalBalance = 0;
    var mominus = 0;
    var moplus = 0;
    let text = "";
    try {
        const{
            data: {schema},
        } = await axios.get('/api/v1/action')
        console.log(schema);
    if(schema.length < 1){
        `<h1> Try Again </h1>`
        balance.innerHTML = "$0.00"
        moneyPlus.innerHTML = "+$0.00"
        moneyMinus.innerHTML = "-$0.00"
        return
    }
    const allData = schema
        .map((expense) =>{
            const{ description, income, price, _id: expenseID} = expense
            if(income){
                moplus+=price;
                text='+';
            }else{
                mominus+=price;
                text='-';
            }
            return `<div class="single-transaction ${income && 'income'}">
            <h5>${description}<span class="price">${text}${price}&nbsp;&nbsp;<a href="action.html?id=${expenseID}"  class="edit-link">
            <i class="fas fa-edit"></i>
            </a>
            <button type="button" class="delete-btn" data-id="${expenseID}">
            <i class="fas fa-trash"></i>
            </button></span></h5>
            </div>`
        }).join("")
        totalBalance = Math.round((Math.abs(moplus-mominus)*100))/100
        if(moplus>mominus){text=" ";}else{text="-";}
        table.innerHTML = allData
        balance.innerHTML = `${text}$${totalBalance.toFixed(2)}`
        moneyMinus.innerHTML = `-$${mominus}`
        moneyPlus.innerHTML = `+$${moplus}`
    } catch (error) {
        console.log(mominus);
        console.log(moplus);
        console.log(error);
    }
}

showData()

table.addEventListener('click', async (e) =>{
    const pressed = e.target
    if(pressed.parentElement.classList.contains('delete-btn')){
        const id = pressed.parentElement.dataset.id
        try {
            await axios.delete(`/api/v1/action/${id}`)
            showData()
        } catch (error) {
            console.log(error);
        }
    }
})


addNew.addEventListener('submit', async (e) => {
    e.preventDefault()
    const description = descriptions.value;
    const price = amounts.value;
    var chb = document.getElementById('income');
    var income = true;
    if(chb.checked){income = false;}else{income = true;}
    console.log(income);
    try {
      await axios.post('/api/v1/action', { description, price, income })
      showData()
      descriptions.value = ''
      amounts.value = ''
      types.value = ''
      chb.checked = false
    } catch (error) {
        console.log(error);
    }
  })
  