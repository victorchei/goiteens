import studentApi from "./studentApi.js";

function studentsService() {
  const listContainer = document.querySelector("#students > ul");

  studentApi
    .getAllStudents()
    .then((res) => {
      listContainer.innerHTML = getStudentsList(res);
    })
    .catch((e) => {
      listContainer.innerHTML = "Помилка";
      console.error("getAllStudents", e);
    });
}

function getStudentsDetails(st) {
  const { id, name, age, email, phone, faculty } = st;

  return `
    <li id="${id}">
          <details>
            <summary>${name}</summary>
            <form>
              <input type="text" name="name" placeholder="Name" value="${name}" disabled />
              <input type="number" name="age" placeholder="Age" value="${age}" disabled />
              <input type="email" name="email" placeholder="Email" value="${email}" disabled />
              <input type="text" name="phone" placeholder="Phone" value="${phone}" disabled />
              <input type="text" name="faculty" placeholder="Faculty" value="${faculty}" disabled />
              <button type="button" class='edit' >Редагувати</button>
              <button type="submit" disabled>Зберегти</button>
            </form>
            
          </details>
    </li>
    `;
}

function getStudentsList(list) {
  return list.map(getStudentsDetails).join(" ");
}

function clickHandler(e) {
  const { target } = e;
  if (target.closest(".edit")) {
    setEditable(target);
  }
}

function setEditable(editBtn) {
  const form = editBtn.closest("form");
  const disabledList = form.querySelectorAll("[disabled]");
  Array.from(disabledList).forEach((elem) => {
    elem.disabled = false;
  });

  editBtn.disabled = true;
}

function submitHandler(e) {
  e.preventDefault();
  e.stopPropagation();
  console.log(e);
}

studentsService();
document.addEventListener("click", clickHandler);
document.addEventListener("submit", submitHandler);
