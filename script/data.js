"use strict";

const importBtn = document.querySelector("#import-btn");
const exportBtn = document.querySelector("#export-btn");
const fileInput = document.querySelector("#input-file");

const petArr = JSON.parse(getFromStorage("arr"));

//export file
exportBtn.addEventListener("click", function () {
  const blob = new Blob([getFromStorage("arr")], {
    type: "text/plain;charset=utf-8",
  });
  saveAs(blob, "pet.json");
});

//import file
importBtn.addEventListener("click", function () {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.readAsText(file, "UTF-8");
    reader.onload = function (evt) {
      console.log(evt);
      //chuyển nội dung file upload sang mảng
      const newArrUpload = JSON.parse(evt.target.result);
      //Tạo 1 mảng mới chỉ chứa id từ mảng mới upload
      const newArrUploadId = newArrUpload.map((e) => e.id);
      //tạo 1 mảng mới chỉ chứa ad từ mảng trong storage
      const petArrId = petArr.map((e) => e.id);
      //Đặt biến đếm, chạy vòng lặp để kiểm tra id của mảng upload và mảng trong storage có trùng ko
      let count = 0;
      for (let i = 0; i < petArrId.length; i++) {
        if (newArrUploadId.includes(petArrId[i])) {
          //nếu trùng thì xóa phần tử trong mảng của storage, đồng thời tăng biến tạm để tính toán vị trí xóa cho lần tiếp theo
          petArr.splice([i - count], 1);
          count++;
        }
      }
      //tạo 1 mảng mới hoàn chỉnh từ 2 mảng
      const newArr = petArr.concat(newArrUpload);
      //lưu vào storage và thông báo thành công cho người dùng
      saveToStorage("arr", JSON.stringify(newArr));
      alert("import successful");
    };
  }
});
