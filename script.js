class expenseCalculator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        this.shadow = shadow; // сохраняем ссылку на shadow внутри объекта класса
        this.total = 0

        shadow.innerHTML = `
        <style>
        main {
            display: grid;
            margin-top: 25vh;
            text-align: center;
        }
    
        h1 {
            color: #3498db;
        }
    
        div {
            display: grid;
            gap: 10px;
            justify-content: center;
        }
    
        .form-text {
            height: 30px;
            width: 200px;
            background-color: #fff;
            border: 2px solid blue;
            outline: none;
            outline-color: currentcolor;
            cursor: pointer;
            border-radius: 5px;
            padding: 5px 15px;
            color: whitesmoke;
            transition: 0.5s;
        }
    
        .form-text:hover {
            background-color: #fff;
            border: 2px solid blue;
        }
    
        .btn {
            height: 44px;
            transition: 0.5s;
            padding: 5px 15px;
            background-color: #3498db;
            color: #fff;
            border: none;
            cursor: pointer;
            border-radius: 5px;
        }
    
        .btn:hover {
            background-color: #2980b9;
        }
    
        .totalSumm {
            font-size: 18px;
            margin-top: 10px;
            color: #2ecc71;
        }
    
        ul {
            list-style: none;
            padding: 0;
        }
    
        li {
            display: flex;
            justify-content: space-between;
            padding: 8px;
            background-color: #ecf0f1;
            border: 1px solid #bdc3c7;
            margin-bottom: 5px;
        }
    
        .deleteBtn {
            background-color: #e74c3c;
            color: #fff;
            border: none;
            padding: 5px 10px;
            cursor: pointer;
            border-radius: 3px;
        }
    
        .deleteBtn:hover {
            background-color: #c0392b;
        }
        </style>
        <main>
            <h1>Калькулятор расходов</h1>
                <div>
                    <input class="form-text" type="text" name="nameInput" id="nameInput" placeholder="Введите название расхода">
                    <input class="form-text" type="number" name="numInput" id="numInput" placeholder="Введите сумму расхода">
                    <input class="btn btn-primary" type="submit" value="Submit" id="btn">
                </div>
                <p class="totalSumm">Итоговая сумма: ${this.total}</p>
                <ul></ul>
        </main>
        `;

        const ulValue = document.createElement("ul");
        ulValue.className = "ulValue";
        ulValue.style = `
            text-align: center;
            font-size: 20px;
        `;
        shadow.appendChild(ulValue);

        shadow.getElementById('btn').addEventListener('click', this.addExpense.bind(this));
    }

    addExpense() {
        const nameInput = this.shadow.querySelector('#nameInput');
        const numInput = this.shadow.querySelector('#numInput');
        let deleteBtn = document.createElement("button");
        deleteBtn.className = "deleteBtn";
        deleteBtn.textContent = "Delete";

        if (nameInput.value != '' && numInput.value != '') {
            let liTag = document.createElement("li");

            liTag.textContent = `${nameInput.value}: ${numInput.value}`;
            liTag.setAttribute("data-value", numInput.value);
            liTag.appendChild(deleteBtn)

            deleteBtn.addEventListener('click', this.deleteExpense.bind(this));
            this.shadow.querySelector("ul").appendChild(liTag); // используем this.shadow
        }
        else {
            alert('Заполните все поля ввода');
        }

        this.updateExpense();
    }

    updateExpense() {
        const numInput = this.shadow.querySelector('#numInput');
        this.total += Number(numInput.value);
        this.shadow.querySelector(".totalSumm").textContent = `Итоговая сумма: ${this.total}`;
    }

    deleteExpense(event) {
        const liTag = event.target.parentNode;
        const value = parseFloat(liTag.getAttribute("data-value"));
        this.total -= value;
        this.shadow.querySelector(".totalSumm").textContent = `Итоговая сумма: ${this.total}`;

        liTag.remove();
    }
}

customElements.define("expense-calculator", expenseCalculator);