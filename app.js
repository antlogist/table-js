/*
Дан массив пользователей, его можно скопировать отсюда из первой задачи, создать таблицу вида:
1. В конце таблицы обязательно последняя tr должна содержать total balance всех пользователей из таблицы при этом он должен быть всегда выровнен по правому краю.

2. Количество пользователей может быть любым.

3. Таблица и все ее содержимое должно создаваться через js, в разметке у вас может быть только контейнер.

4. В коде у вас должна быть переменная которая будет содержать в виде объекта список полей и заголовков th которые будут выводиться в таблице. Что то типа { name: ‘Name’, email: ‘Email’... } соответственно ключ объекта это ваше поле которое вы хотите вывести из объекта пользователя а значение это заголовок th.
*/

const users = [
    {
        _id: "5d220b10e8265cc978e2586b",
        isActive: true,
        balance: 2853.33,
        age: 20,
        name: "Buckner Osborne",
        gender: "male",
        company: "EMPIRICA",
        email: "bucknerosborne@empirica.com",
        phone: "+1 (850) 411-2997",
        registered: "2018-08-13T04:28:45 -03:00",
        nestedField: { total: 300 }
    },
    {
        _id: "5d220b10144ef972f6c2b332",
        isActive: true,
        balance: 1464.63,
        age: 38,
        name: "Rosalie Smith",
        gender: "female",
        company: "KATAKANA",
        email: "rosaliesmith@katakana.com",
        phone: "+1 (943) 463-2496",
        registered: "2016-12-09T05:15:34 -02:00",
        nestedField: { total: 400 }
    },
    {
        _id: "5d220b1083a0494655cdecf6",
        isActive: false,
        balance: 2823.39,
        age: 40,
        name: "Estrada Davenport",
        gender: "male",
        company: "EBIDCO",
        email: "estradadavenport@ebidco.com",
        phone: "+1 (890) 461-2088",
        registered: "2016-03-04T03:36:38 -02:00",
        nestedField: { total: 200 }
    }
];

(function createTable(users) {
    const tableCols = {
        name: "Name",
        email: "Email",
        balance: "Balance"
    };
    const tableColsValuesArr = Object.values(tableCols);
    const tableColsEntriesArr = Object.entries(tableCols);

    // Rendering
    const container = document.getElementById("table");
    const fragment = document.createDocumentFragment();
    const table = document.createElement("table");
    table.style.borderCollapse = "collapse";
    table.setAttribute("width", "100%");
    table.setAttribute("align", "left");
    fragment.appendChild(table);
    container.appendChild(fragment);

    // Render table head
    renderTableHead();
    function renderTableHead() {
        const tr = document.createElement("tr");
        // Row number
        const thNum = document.createElement("th");
        thNum.textContent = "#";
        thNum.classList.add("order");
        tr.appendChild(thNum);
        tableColsValuesArr.map(item => {
            const th = document.createElement("th");
            th.textContent = item;
            tr.appendChild(th);
        });
        table.appendChild(tr);
        renderTableBody();
    }

    // Render table body
    function renderTableBody() {
        users.map((item, index, arr) => {
            // Objects into arrays conversion
            const trArr = Object.entries(item);
            // Tr creation
            const tr = document.createElement("tr");
            // Row number
            const tdNumber = document.createElement("td");
            tdNumber.classList.add("order");
            tdNumber.textContent = ++index;
            tr.appendChild(tdNumber);
            // Loops
            tableColsEntriesArr.map(([key, value], index, arr) => {
                trArr.map(([key2, value2]) => {
                    if (key === key2) {
                        const td = document.createElement("td");
                        td.textContent = value2;
                        tr.appendChild(td);
                    }
                });
            });
            // Rendering tr
            table.appendChild(tr);
        });
        total();
    }

    // Render total
    function total() {
        // Objects into arrays conversion
        const totalTr = document.createElement("tr");
        const td = document.createElement("td");
        // Create empty tds
        [...tableColsValuesArr].map(item => {
            const emptyTd = document.createElement("td");
            totalTr.appendChild(emptyTd);
        });

        td.textContent = "Total balance: ";
        td.appendChild(calcTotal());
        totalTr.appendChild(td);
        table.appendChild(totalTr);
        tableStyle();
    }

    // Calculate total
    function calcTotal() {
        let total = 0;
        users.map(item => {
            const itemArr = Object.entries(item);
            itemArr.map(([key, value]) => {
                if (key === "balance") {
                    total += value;
                }
            });
        });
        const span = document.createElement("span");
        span.style.fontWeight = "bold";
        span.append(total);
        return span;
    }

    // Style
    function tableStyle() {
        const tr = document.querySelectorAll("tr");
        const td = document.querySelectorAll("td");
        const th = document.querySelectorAll("th");
        const order = document.querySelectorAll(".order");
        [...tr].map((item, index, arr) => {
            if (index === 0) {
                item.style.borderTop = "1px solid lightgray";
            }
            if (index !== arr.length - 1) {
                item.style.borderBottom = "1px solid lightgray";
                item.setAttribute("align", "left");
            }
        });
        [...td].map((item, index) => {
            item.style.padding = "15px 10px 15px 10px";
            item.style.minWidth = "25px";
        });
        [...th].map(item => {
            item.style.padding = "15px 10px 15px 10px";
        });
        [...order].map(item => {
            item.setAttribute("align", "center");
        });
    }
})(users);
