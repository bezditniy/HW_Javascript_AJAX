window.onload = function () {
    const xhr = new XMLHttpRequest();
    const url = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json"

    const button = document.querySelector("#buttonGet");

    button.addEventListener("click", () => {

        xhr.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                const data = JSON.parse(this.responseText);
                const body = document.body;
                const tbl = document.createElement("table");

                const th = document.createElement("th");
                const th1 = document.createElement("th");
                const th2 = document.createElement("th");

                th.innerHTML = "Назва валюти";
                th1.innerHTML = "Код";
                th2.innerHTML = "Курс валют";

                body.appendChild(tbl);
                tbl.appendChild(th);
                tbl.appendChild(th1);
                tbl.appendChild(th2);
                tbl.style.border = "2px solid";
                
                for(let i = 0; i < data.length; i++) {

                    let name = data[i].txt;
                    let code = data[i].cc;
                    let course = data[i].rate;

                    if (course > 25) {

                        for (let i = 0; i < 1; i++) {
                            let tr = tbl.insertRow();
                            let td = tr.insertCell(0);
                            let td1 = tr.insertCell(1);
                            let td2 = tr.insertCell(2); 

                                td.innerHTML = `${name}`;
                                td1.innerHTML = `${code}`;
                                td2.innerHTML = `${course}` + "грн";

                                td.style.border = '1px solid black';
                                td1.style.border = '1px solid black';
                                td2.style.border = '1px solid black';

                            button.remove();
                        }
                   }
                }
               document.querySelector(".date").innerHTML = "Курс на - " + data[0].exchangedate;
            } else if (this.status >= 400) {
                alert(`"Помилка! Код помилки: " ${this.status}`)
            }
        }
        xhr.open("GET", url);
        xhr.send();
    })
}