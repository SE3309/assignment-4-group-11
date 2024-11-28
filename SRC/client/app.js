document.getElementById("form").addEventListener("submit", createAccount);
document.getElementById("searchEmail").addEventListener("submit", searchEmail);
document.getElementById("searchPrice").addEventListener("submit", searchPrice);
document.getElementById("searchRent").addEventListener("submit", searchRent);
document.getElementById("updateEmail").addEventListener("submit", updateEmail);

async function createAccount(e) {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const username = document.getElementById("username").value;
    const phone = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const payment = document.getElementById("payment").value;
    const res = await fetch("/api/createAccount", {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            name: name,
            email: email,
            username: username,
            phone: phone,
            address: address,
            payment: payment
        })
    })
    if (res.ok){
        alert("Success!");
        const val = await fetch(`/api/getClient/${email}`);
        const res = await val.json();
        console.log(res);
        document.getElementById("validateCreate").textContent = `Successfully created client. Email: ${res.email}, Name: ${res.nme}, 
        Address: ${res.address}, userId: ${res.userId}`
    }
    else {
        alert("Error");
    }
}

async function searchEmail(e) {
    e.preventDefault();
    const email = document.getElementById("creatorEmail").value;
    const res = await fetch(`/api/getPropertyByEmail/${email}`);
    const props = await res.json();
    const resultList = document.getElementById("f2Results");
    while (resultList.firstChild){
        resultList.removeChild(resultList.firstChild);
    }
    for (let p of props){
        const x = document.createElement("p");
        x.textContent = `Name: ${p.nme}, Email: ${p.email}, Address: ${p.address}, 
        Selling Price: $${p.sellingPrice}, Features: ${p.buildingFeatures}`;
        resultList.appendChild(x);
    }
}

async function searchPrice(e) {
    e.preventDefault();
    const maxPrice = document.getElementById("maxPrice").value;
    const minPrice = document.getElementById("minPrice").value;
    if (parseFloat(maxPrice) != maxPrice){
        alert("Not a Number!");
        return;
    }
    if (parseFloat(minPrice) != minPrice){
        alert("Not a Number!");
        return;
    }
    const res = await fetch(`/api/getPropertyByPrice/${maxPrice}/${minPrice}`);
    const props = await res.json();
    const resultList = document.getElementById("f3Results");
    while (resultList.firstChild){
        resultList.removeChild(resultList.firstChild);
    }
    for (let p of props){
        const x = document.createElement("p");
        x.textContent = `Address: ${p.address}, Date Posted: ${p.datePosted}, Price: $${p.sellingPrice}, 
        Annual Property Tax: ${p.annualPropertyTax}, Features: ${p.buildingFeatures}`;
        resultList.appendChild(x);
    }
}

async function searchRent(e) {
    e.preventDefault();
    const searchString = document.getElementById("searchString").value;
    const res = await fetch(`/api/searchPropertyByAddress/${searchString}`);
    const props = await res.json();
    const resultList = document.getElementById("f4Results");
    while (resultList.firstChild){
        resultList.removeChild(resultList.firstChild);
    }
    for (let p of props){
        const x = document.createElement("p");
        x.textContent = `Address: ${p.address}, Date Posted ${p.datePosted}, Monthly Rent: ${p.monthlyRent}, 
        Features: ${p.buildingFeatures}`;
        resultList.appendChild(x);
    }
}

async function updateEmail(e) {
    e.preventDefault();
    const currentEmail = document.getElementById("currentEmail").value;
    const newEmail = document.getElementById("newEmail").value;
    const res = await fetch(`/api/updateEmail/${currentEmail}`, {
        method: "PUT",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            newEmail: newEmail
        })
    })
    const res2 = await res.json();
    document.getElementById("rowsUpdated").textContent = `Rows Updated: ${res2.affectedRows}`;
    const res3 = await fetch(`/api/getEmail/${newEmail}`);
    const res4 = await res3.json();
    const resultList = document.getElementById("f5Results");
    while (resultList.firstChild){
        resultList.removeChild(resultList.firstChild);
    }
    for (let p of res4){
        const x = document.createElement("p");
        x.textContent = `UserId: ${p.userId}, Email: ${p.email}, Name: ${p.nme}, 
        Username: ${p.username}, Address: ${p.address}, Phone Number: ${p.phoneNumber}`;
        resultList.appendChild(x);
    }
}
