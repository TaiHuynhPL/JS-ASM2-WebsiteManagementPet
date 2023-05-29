"use strict";

const tableBodyEl = document.querySelector("#tbody");
const containerForm = document.querySelector("#container-form");
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

const petArr = JSON.parse(getFromStorage("arr"));
const breedArr = JSON.parse(getFromStorage("breed"));

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
    <td><button type="button" class="btn btn-warning" onclick="startEditPet(${i})">Edit</button>
    </td>`;
    tableBodyEl.appendChild(row);
  }
}
//Chạy hàm hiển thị bảng để mặc định hiển thị thông tin
renderTableData(petArr);

//Hàm hiển thi form và giá trị trên form(khi nhấn nút edit)
function startEditPet(petId) {
  //Chạy hàm hiển thị danh sách breed ô input có thể nhận đúng giá trị
  renderBreed(petArr[petId].type);
  //Hiển thị form
  containerForm.classList.remove("hide");
  //Lấy giá trị của phần tử cần edit hiển thị lên form
  idInput.value = petArr[petId].id;
  nameInput.value = petArr[petId].name;
  ageInput.value = petArr[petId].age;
  typeInput.value = petArr[petId].type;
  weightInput.value = petArr[petId].weight;
  lengthInput.value = petArr[petId].length;
  colorInput.value = petArr[petId].color;
  breedInput.value = petArr[petId].breed;
  vaccinatedInput.value = petArr[petId].vaccinated;
  if (vaccinatedInput.value === "true") {
    vaccinatedInput.checked = true;
  } else {
    vaccinatedInput.checked = false;
  }
  dewormedInput.value = petArr[petId].dewormed;
  if (dewormedInput.value === "true") {
    dewormedInput.checked = true;
  } else {
    dewormedInput.checked = false;
  }
  sterilizedInput.value = petArr[petId].sterilized;
  if (sterilizedInput.value === "true") {
    sterilizedInput.checked = true;
  } else {
    sterilizedInput.checked = false;
  }
}

//Hàm hiển thị danh sách breed theo đúng type được chọn
function renderBreed(breed) {
  const currentTypeArr = breedArr.filter((b) => b.type === breed);
  breedInput.innerHTML = "";
  const option = document.createElement("option");
  option.innerHTML = "Select Breed";
  breedInput.appendChild(option);
  for (let i = 0; i < currentTypeArr.length; i++) {
    const option = document.createElement("option");
    option.innerHTML = `${currentTypeArr[i].name}`;
    breedInput.appendChild(option);
  }
}

//Sự kiện khi thay đổi ở ô input type thì nội dung của ô breed sẽ được cập nhật theo đúng type
typeInput.addEventListener("change", function () {
  const currentType = typeInput.value;
  renderBreed(currentType);
});

//Hàm lưu giá trị vào mảng
function submitEdit() {
  //Tìm vị trí của phần tử mà ta muốn edit
  const id = petArr.findIndex((a) => a.id === idInput.value);
  //Gán tất cả giá trị thay đổi vào mảng
  petArr[id].name = nameInput.value;
  petArr[id].age = ageInput.value;
  petArr[id].type = typeInput.value;
  petArr[id].weight = weightInput.value;
  petArr[id].length = lengthInput.value;
  petArr[id].color = colorInput.value;
  petArr[id].breed = breedInput.value;
  if (vaccinatedInput.checked === true) {
    petArr[id].vaccinated = true;
  } else {
    petArr[id].vaccinated = false;
  }
  if (dewormedInput.checked === true) {
    petArr[id].dewormed = true;
  } else {
    petArr[id].dewormed = false;
  }
  if (sterilizedInput.checked === true) {
    petArr[id].sterilized = true;
  } else {
    petArr[id].sterilized = false;
  }
}

// Cập nhật dự liệu khi ấn nút submit
submitBtn.addEventListener("click", function () {
  //Kiểm tra xem có trường nào chưa nhập hay không.
  if (
    !nameInput.value ||
    !ageInput.value ||
    !weightInput.value ||
    !lengthInput.value ||
    !colorInput.value
  ) {
    alert("You need to fill in all the input boxes!");
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

  //Kiểm tra xem có chọn giá trị cho trường Breed chưa.
  else if (breedInput.value === "Select Breed") {
    alert("Please select Breed!");
  } else {
    //Chạy hàm submitEdit để lưu giá trị thay đổi vào mảng
    submitEdit();
    //Lưu dữ liệu vào LocalStorage
    saveToStorage("arr", JSON.stringify(petArr));
    // Hiển thị lại danh sách Pet vừa được cập nhật
    renderTableData(petArr);
    //Ẩn form
    containerForm.classList.add("hide");
  }
});
