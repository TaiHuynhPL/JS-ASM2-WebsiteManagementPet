"use strict";

const sidebar = document.querySelector("#sidebar");
const sidebarTitle = document.querySelector("#sidebar-title");

//Animation khi người dùng click vào Sidebar
sidebarTitle.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});

//Hàm sẽ thực hiện việc lưu xuống LocalStorage
const saveToStorage = function (key, value) {
  localStorage.setItem(key, value);
};

//Hàm sẽ lấy dữ liệu từ LocalStorage theo Key tương ứng
const getFromStorage = function (key) {
  return localStorage.getItem(key) || "[]";
};
