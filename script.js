"use strict";

//Tạo các biến cho các element HTML
const idInput = document.querySelector("#input-id");
const nameInput = document.querySelector("#input-name");
const ageInput = document.querySelector("#input-age");
const typeInput = document.querySelector("#input-type");
const weightInput = document.querySelector("#input-weight");
const lengthInput = document.querySelector("#input-length");
const colorInput = document.querySelector("#input-color-1");
const breedInput = document.querySelector("#input-breed");
const vaccinatedInput = document.querySelector("#input-vaccinated");
const dewormedInput = document.querySelector("#input-dewormed");
const sterilizedInput = document.querySelector("#input-sterilized");
const submitBtn = document.querySelector("#submit-btn");
const healthyBtn = document.querySelector("#healthy-btn");

const tableBodyEl = document.querySelector("#tbody");
const btnDelete = document.querySelector(".btn-danger");

const petArr = JSON.parse(getFromStorage("arr"));
const breedArr = JSON.parse(getFromStorage("breed"));

//Tạo hàm clearInput để trả về Form Input như ban đầu.
const clearInput = function () {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
};

submitBtn.addEventListener("click", function () {
  //Tạo 1 mảng mới chỉ chứa ID của mảng petArr.
  const petArrID = petArr.map((p) => p.id);

  //Kiểm tra xem có trường nào chưa nhập hay không.
  if (
    !idInput.value ||
    !nameInput.value ||
    !ageInput.value ||
    !weightInput.value ||
    !lengthInput.value ||
    !colorInput.value
  ) {
    alert("You need to fill in all the input boxes!");
  }

  //Kiểm tra giá trị ID có trùng với ID đã có chưa.
  else if (petArrID.includes(idInput.value)) {
    alert("ID must be unique!");
  }

  // Kiểm tra giá trị Age có nằm trong khoảng 1 đến 15.
  else if (parseInt(ageInput.value) < 1 || parseInt(ageInput.value) > 15) {
    alert("Age must be between 1 and 15!");
  }

  // Kiểm tra giá trị Weight có nằm trong khoảng 1 đến 15.
  else if (
    parseInt(weightInput.value) < 1 ||
    parseInt(weightInput.value) > 15
  ) {
    alert("Weight must be between 1 and 15!");
  }

  // Kiểm tra giá trị Length có nằm trong khoảng 1 đến 100.
  else if (
    parseInt(lengthInput.value) < 1 ||
    parseInt(lengthInput.value) > 100
  ) {
    alert("Length must be between 1 and 100!");
  }

  //Kiểm tra xem có chọn giá trị cho trường Type chưa.
  else if (typeInput.value === "Select Type") {
    alert("Please select Type!");
  }

  // Kiểm tra xem có chọn giá trị cho trường Breed chưa.
  else if (breedInput.value === "Select Breed") {
    alert("Please select Breed!");
  }

  //Gán tất cả giá trị vào Object data.
  else {
    const data = {
      id: idInput.value,
      name: nameInput.value,
      age: parseInt(ageInput.value),
      type: typeInput.value,
      weight: parseInt(weightInput.value),
      length: parseInt(lengthInput.value),
      color: colorInput.value,
      breed: breedInput.value,
      vaccinated: vaccinatedInput.checked,
      dewormed: dewormedInput.checked,
      sterilized: sterilizedInput.checked,
      date: new Date().toLocaleDateString(),
    };

    petArr.push(data);
    //Lưu dữ liệu vào LocalStorage
    saveToStorage("arr", JSON.stringify(petArr));

    // Xóa các dữ liệu vừa nhập trên form.
    clearInput();
    // Hiển thị danh sách Pet
    renderTableData(petArr);
  }
});

//Hàm hiển thị danh sách pet ra bảng.
function renderTableData(Arr) {
  tableBodyEl.innerHTML = "";
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
    <td>${Arr[i].date}</td>
    <td><button type="button" class="btn btn-danger" onclick="deletePet(${i})">Delete</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}
renderTableData(petArr);

//Hàm xóa 1 pet.
function deletePet(i) {
  if (confirm("Are you sure?")) {
    petArr.splice(i, 1);
    saveToStorage("arr", JSON.stringify(petArr));
    clearInput();
    renderTableData(petArr);
  }
}

//Biến kiểm tra xem hiện tại đang hiển thị tất cả pet hay chỉ pet khỏe mạnh.
let healthyCheck = false;

//Biến mảng chứa danh sách pet khỏe mạnh.
let healthyPetArr = [];

//Hàm để chọn danh sách pet khỏe
healthyBtn.addEventListener("click", function () {
  //Chuyển từ danh sách Pet khỏe mạnh sang danh sách tất cả Pet
  if (healthyCheck) {
    renderTableData(petArr);
    healthyBtn.textContent = "Show Healthy Pet";
    healthyCheck = false;
  }
  //Chuyển từ danh sách tất cả Pet sang danh sách Pet khỏe mạnh
  else {
    function healthy(pet) {
      return (
        pet.vaccinated === true &&
        pet.dewormed === true &&
        pet.sterilized === true
      );
    }
    healthyPetArr = petArr.filter(healthy);

    renderTableData(healthyPetArr);
    healthyBtn.textContent = "Show All Pet";
    healthyCheck = true;
  }
});

/*===========================================================
======Hiển thị Breed trong màn hình quản lý thú cưng=========
===========================================================*/

//Hàm hiển thị danh sách breed
function renderBreed(breed) {
  const currentTypeArr = breedArr.filter((b) => b.type === breed);
  //dòng đầu tiên "Select Breed"
  breedInput.innerHTML = "";
  const option = document.createElement("option");
  option.innerHTML = "Select Breed";
  breedInput.appendChild(option);

  //các dòng còn lại theo danh sách
  for (let i = 0; i < currentTypeArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${currentTypeArr[i].name}`;
    breedInput.appendChild(option);
  }
}

//Sự kiện khi thay đổi ở ô input type thì nội dung của ô breed sẽ được cập nhật theo đúng type
typeInput.addEventListener("change", function () {
  let currentType = typeInput.value;
  renderBreed(currentType);
});
