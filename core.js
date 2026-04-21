document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.querySelector('.input-container');

    const descInput = inputContainer.querySelector('.description-el');
    const valueInput = inputContainer.querySelector('.value-el');
    const submitBtn = inputContainer.querySelector('.submit-btn');

    const totalValueText = document.querySelector('.total-value');
    const currentValueEl = totalValueText.querySelector('.currentValue');
    
    const listContainer = document.querySelector('.list-container');

    const itemsList = listContainer.querySelector('.items-list');

    let idCount = 0;
    const transactions = [];

    function getInputValues(){
        return [String(descInput.value), Number(valueInput.value)];
    }

    function clearInputValues(){
        descInput.value = '';
        valueInput.value = '';
    }

    function createObject(desc, value, id) {
        if (!desc || valueInput.value === '' || id == null){
            throw new Error("Error creating object. Missing arguments.");
        }

        return {
            description: desc,
            value: value,
            id: id
        }
    };

    function createElement(object){
        const newLi = document.createElement('li');

        newLi.textContent = `${object.description} - $${object.value}`;
        newLi.dataset.id = object.id;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('delete-btn');
        newLi.appendChild(removeBtn);

        return newLi;
    };

    function renderBalance(){
        const total = transactions.reduce((acc, curr) => {
            return acc + curr.value;
        }, 0);

        currentValueEl.textContent = `$ ${total.toFixed(2)}`;

        currentValueEl.style.color = total >= 0 ?  'green' : 'red';
    }

    function render(){
        itemsList.innerHTML = '';

        transactions.forEach(transaction => {
            const li = createElement(transaction);
            itemsList.appendChild(li);
        });

        renderBalance();
    }

    function pushTransaction(newTransaction){
        transactions.push(newTransaction);
    }

    function removeTransaction(transactionId){
        const index = transactions.findIndex(transaction => transaction.id === transactionId);
        transactions.splice(index, 1);
    }

    submitBtn.addEventListener('click', () => {
        const [desc, value] = getInputValues();
        const newObj = createObject(desc, value, idCount++);

        pushTransaction(newObj);

        clearInputValues();
        render();
    });

    itemsList.addEventListener('click', (event) => {
        const btn = event.target.closest('.delete-btn');
        if (!btn) return;

        const li = btn.closest('li');
        const idToRemove = Number(li.dataset.id);

        removeTransaction(idToRemove);
        render();
    })

    
    render();
})