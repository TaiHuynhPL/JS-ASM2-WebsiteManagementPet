"use strict";

const tableBodyBreedEl = document.querySelector("#tbody-breed");
const addBreedInput = document.querySelector("#input-breed--add");
const addTypeInput = document.querySelector("#input-type--add");
const submitBreedBtn = document.querySelector("#submit-btn--breed");

const clearInputBreed = function () {
  addBreedInput.value = "";
  addTypeInput.value = "";
};

const breedArr = JSON.parse(getFromStorage("breed"));

//Hàm hiển thị danh sách bảng breed
function renderBreedTable(Arr) {
  tableBodyBreedEl.innerHTML = "";
  for (let i = 0; i < Arr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${i + 1}</th>
    <td>${Arr[i].name}</td>
    <td>${Arr[i].type}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet(${i})">Delete</button>
    </td>`;
    tableBodyBreedEl.appendChild(row);
  }
}
renderBreedTable(breedArr);

//Tạo 2 mảng mới gồm chỉ giá trị name và chỉ giá trị tên của hàm ban đầu để lọc điều kiện;
const breedArrName = breedArr.map((b) => b.name);
const breedArrType = breedArr.map((b) => b.type);

//Thực hiện sự kiện khi nhấn vào nút submit
submitBreedBtn.addEventListener("click", function () {
  if (!addBreedInput.value) {
    alert("Please select Name!");
  } else if (addTypeInput.value === "Select Type") {
    alert("Please select Type!");
  } else if (
    breedArrName.includes(addBreedInput.value) &&
    breedArrType.includes(addTypeInput.value)
  ) {
    alert("Breed and Type must be unique!");
  } else {
    const data = {
      name: addBreedInput.value,
      type: addTypeInput.value,
    };

    breedArr.push(data);
    saveToStorage("breed", JSON.stringify(breedArr));
    clearInputBreed();
    renderBreedTable(breedArr);
  }
});

//Hàm xóa 1 breed.
function deletePet(i) {
  if (confirm("Are you sure?")) {
    breedArr.splice(i, 1);
    saveToStorage("breed", JSON.stringify(breedArr));
    clearInputBreed();
    renderBreedTable(breedArr);
  }
}
