var isEdit = false;

//Get Data
async function fetchData() {
    try {
        const response = await fetch("https://61c336039cfb8f0017a3ea28.mockapi.io/user",)
        var data = await response.json();
        console.log(data);


        const tableList = document.getElementById('tableData');
        let output = "";

        data.forEach(element => {
            output += `
        <tr data-id = ${element.id}>
        <td>${element.id}</td>
        <td>${element.name}</td>
        <td>${element.email}</td>
        <td>${element.mobileNumber}</td>
        <td>${element.password}</td>
        <td>${element.city}</td>
        <td>${element.state}</td>
        <td>${element.country}</td>
        <td>${element.pincode}</td>
        <td>${element.education}</td>
        <td><button id="editUser">Edit</button></td>
        <td><button id="deleteUser">Delete</button></td>
      </tr>`;
        });
        tableList.innerHTML = output;

        tableList.addEventListener('click', (e) => {
            e.preventDefault();

            var deleteButtonIsPressed = e.target.id == "deleteUser";
            var editButtonIsPressed = e.target.id == "editUser";


            var idValue = e.target.parentElement.parentElement.dataset.id

            //Delete User
            if (deleteButtonIsPressed) {
                if (confirm('Are you sure to delete this record?')) {
                    fetch(`https://61c336039cfb8f0017a3ea28.mockapi.io/user/${idValue}`, {
                        method: "DELETE",
                    })
                        .then(res => res.json())
                        .then(() => location.reload())
                }
            }

            // EditUser
            if (editButtonIsPressed) {

                var selectedRow = e.target.parentElement.parentElement;

                isEdit = true

                document.getElementById('id').value = selectedRow.cells[0].innerHTML
                document.getElementById('name').value = selectedRow.cells[1].innerHTML,
                    document.getElementById('email').value = selectedRow.cells[2].innerHTML,
                    document.getElementById('mobileNumber').value = selectedRow.cells[3].innerHTML,
                    document.getElementById('password').value = selectedRow.cells[4].innerHTML,
                    document.getElementById('city').value = selectedRow.cells[5].innerHTML,
                    document.getElementById('state').value = selectedRow.cells[6].innerHTML,
                    document.getElementById('country').value = selectedRow.cells[7].innerHTML,
                    document.getElementById('pincode').value = selectedRow.cells[8].innerHTML,
                    document.getElementById('education').value = selectedRow.cells[9].innerHTML

            }
        })
    } catch (error) {
        console.log(error);
    }
}
fetchData();

const idValues = document.getElementById('id')
const nameValue = document.getElementById('name')
const emailValue = document.getElementById('email')
const mobileNumberValue = document.getElementById('mobileNumber')
const passowordValue = document.getElementById('password')
const cityValue = document.getElementById('city')
const stateValue = document.getElementById('state')
const countryValue = document.getElementById('country')
const pincodeValue = document.getElementById('pincode')
const educationValue = document.getElementById('education')


//Insert Data
const postData = document.getElementById('userForm')
postData.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (isEdit == true) {
        try {
            await fetch(`https://61c336039cfb8f0017a3ea28.mockapi.io/user/${idValues.value}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: nameValue.value,
                    email: emailValue.value,
                    mobileNumber: mobileNumberValue.value,
                    password: passowordValue.value,
                    city: cityValue.value,
                    state: stateValue.value,
                    country: countryValue.value,
                    pincode: pincodeValue.value,
                    education: educationValue.value


                })

            })
                .then(res => res.json())
                .then(() => location.reload())
        } catch (error) {
            console.log(error)
        }
    } else {
        try {
            await fetch("https://61c336039cfb8f0017a3ea28.mockapi.io/user", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({
                    name: nameValue.value,
                    email: emailValue.value,
                    mobileNumber: mobileNumberValue.value,
                    password: passowordValue.value,
                    city: cityValue.value,
                    state: stateValue.value,
                    country: countryValue.value,
                    pincode: pincodeValue.value,
                    education: educationValue.value
                }),
            })
                .then(res => res.json())
                .then(data => {
                    const dataArr = [];
                    dataArr.push(data);
                    fetchData(dataArr);
                });
        } catch (error) {
            console.log(error);
        }
        // reseting the input feild to empty
        nameValue.value = "";
        emailValue.value = "";
        mobileNumberValue.value = "";
        passowordValue.value = "";
        cityValue.value = "";
        stateValue.value = "";
        countryValue.value = "";
        pincodeValue.value = "";
        educationValue.value = "";
    }

})
