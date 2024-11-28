document.getElementById("form").addEventListener("submit", createAccount);
document.getElementById("searchEmail").addEventListener("submit", searchEmail);

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
        x.textContent = `Name: ${p.nme}, Email: ${p.email}, Address: ${p.address}, Selling Price: ${p.sellingPrice}, Features: ${p.buildingFeatures}`;
        resultList.appendChild(x);
    }
}
