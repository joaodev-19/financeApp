document.addEventListener('DOMContentLoaded', () => {
    const inputContainer = document.querySelector('.input-container');

    const descInput = inputContainer.querySelector('.description-el');
    const valueInput = inputContainer.querySelector('.value-el');
    const submitBtn = inputContainer.querySelector('.submit-btn');

    const totalValueText = document.querySelector('.total-value');
    const currentValueEl = totalValueText.querySelector('.currentValue');
    
    const listContainer = document.querySelector('.list-container');

    const itemsList = listContainer.querySelector('.items-list');
    console.log(itemsList);

    let currentValue = 0;
    let idCount = 0;
    const transactions = [];

    function getInputValues(){
        return [String(descInput.value), Number(valueInput.value)];
    }

    function createObject(desc, value, id) {
        if (!desc || !value || !id){
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

        return newLi;
    };

    function updateCurrentValue(currentList){
        const newCurrentValue = currentList.reduce((acc, curr) => {
            return acc + curr.value;
        }, 0);
    }

    function render(){
    }

    
})