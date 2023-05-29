"use strict";

const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const typeInput = document.querySelector("#input-type");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
const findBtn = document.querySelector("#find-btn");
const tableBodySearch = document.querySelector("#tbody-search");

const petArr = JSON.parse(getFromStorage("arr"));
const breedArr = JSON.parse(getFromStorage("breed"));

//======Hiển thị Breed trong màn hình search=========

//Định nghĩa Hàm hiển thị danh sách breed
function renderBreed(breed) {
  //dòng đầu tiên "Select Breed"
  breedInput.innerHTML = "";
  const option = document.createElement("option");
  option.innerHTML = "Select Breed";
  breedInput.appendChild(option);

  //các dòng còn lại theo danh sách
  for (let i = 0; i < breed.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${breed[i].name}`;
    breedInput.appendChild(option);
  }
}
//Gọi hàm hiển thị danh sách breed
renderBreed(breedArr);

//================================================

//Hàm lọc dữ liệu khi click vào nút để search
findBtn.addEventListener("click", function () {
  const searchPetArr = petArr.filter(
    (e) =>
      e.id.includes(idInput.value) &&
      e.name.includes(nameInput.value) &&
      (e.type.includes(typeInput.value) || typeInput.value === "Select Type") &&
      (e.breed.includes(breedInput.value) ||
        breedInput.value === "Select Breed") &&
      (e.vaccinated === vaccinatedInput.checked ||
        vaccinatedInput.checked === false) &&
      (e.dewormed === dewormedInput.checked ||
        dewormedInput.checked === false) &&
      (e.sterilized === sterilizedInput.checked ||
        sterilizedInput.checked === false)
  );

  renderTableData(searchPetArr);
});

//Hàm hiển thị danh sách pet đã lọc ra bảng.
function renderTableData(Arr) {
  tableBodySearch.innerHTML = "";
  for (let i = 0; i < Arr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `<th scope="row">${Arr[i].id}</th>
    <td>${Arr[i].name}</td>
    <td>${Arr[i].age}</td>
    <td>${Arr[i].type}</td>
    <td>${Arr[i].weight} kg</td>
    <td>${Arr[i].length} cm</td>
    <td>${Arr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${Arr[i].color}"></i>
    </td>
    <td><i class="bi bi-${
      Arr[i].vaccinated ? "check" : "x"
    }-circle-fill"></i></td>
    <td><i class="bi bi-${
      Arr[i].dewormed ? "check" : "x"
    }-circle-fill"></i></td>
    <td><i class="bi bi-${
      Arr[i].sterilized ? "check" : "x"
    }-circle-fill"></i></td>
    <td>${Arr[i].date}</td>`;
    tableBodySearch.appendChild(row);
  }
}
