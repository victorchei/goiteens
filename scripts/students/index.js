import studentApi from "./studentApi.js";

async function studentsService() {
  const listContainer = document.querySelector("#students > ul");

  // studentApi
  //   .getAllStudents2()
  //   .then((res) => {
  //     listContainer.innerHTML = getList(res);
  //   })
  //   .catch((e) => {
  //     listContainer.innerHTML = "Помилка";
  //     console.error("getAllStudents", e);
  //   });

  try {
    const students = await studentApi.getAllStudents2();
    const stringHtml = getList(students);
    listContainer.innerHTML = stringHtml;
  } catch (e) {
    listContainer.innerHTML = "Помилка";
    console.error("getAllStudents", e);
  }
}

// function updateDetails(form, data) {
//   for (key in data) {
//     form.elements[key].value = data[key];
//   }
// }

function getDetails(obj, isEditable) {
  const { id = "new-id", name = "", age, email, phone, faculty } = obj;

  return `
      <li id="${id}">
            <details>
              <summary>${name}</summary>
              <form data-id='${id}'>
                <input type="text" name="name" placeholder="Name" value="${name}" data-edit='${!isEditable}' disabled='${!isEditable}' />
                <input type="number" name="age" placeholder="Age" value="${age}" data-edit='${!isEditable}' disabled='${!isEditable}' />
                <input type="email" name="email" placeholder="Email" value="${email}" data-edit='${!isEditable}' disabled='${!isEditable}' />
                <input type="text" name="phone" placeholder="Phone" value="${phone}" data-edit='${!isEditable}' disabled='${!isEditable}' />
                <input type="text" name="faculty" placeholder="Faculty" value="${faculty}" data-edit='${!isEditable}' disabled='${!isEditable}' />
                
                <div class='edit-btns'>
                <button type="button"  data-edit='${isEditable}' class='edit' >Редагувати</button>
                <button type="reset" data-edit='${!isEditable}' disabled='${!isEditable}'>Повернути зміни</button>
                <button type="submit" data-edit='${!isEditable}' disabled='${!isEditable}'>Зберегти</button>
                </div>
              </form>
              
            </details>
      </li>
      `;
}

function getList(list) {
  return list.map(getDetails).join(" ");
}

function getEditedFieldsByFormChildNode(editBtn) {
  const form = editBtn.closest("form");
  const list = form.querySelectorAll("[data-edit]");
  return Array.from(list);
}

function switchDisabledByNodeList(nodeList) {
  nodeList.forEach((elem) => {
    elem.disabled = !elem.disabled;
    elem.dataset.edit = !elem.dataset.edit;
  });
}

function switchEditable(editBtn) {
  const disabledList = getEditedFieldsByFormChildNode(editBtn);
  switchDisabledByNodeList(disabledList);
}

function getFormNewData(form) {
  return {
    name: form.elements.name.value,
    age: form.elements.age.value,
    email: form.elements.email.value,
    phone: form.elements.phone.value,
    faculty: form.elements.faculty.value,
  };
}

function clickHandler(e) {
  const { target } = e;

  if (target.closest(".edit")) {
    switchEditable(target);
    return;
  } 
  // else if (target.closest('input[type="number"]')) {
  //   console.log("we do it");
  // }
}

function submitHandler(e) {
  e.preventDefault();
  e.stopPropagation();

  const { target } = e;
  const id = target.dataset.id;
  const newData = getFormNewData(target);

  // треба функція додлавання і обновки студентів окремо
  if (id === "new-student") {
    studentApi
      .addStudent(newData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.log(e));
    return console.log("need to set new student");
  } else {

    studentApi
      .updateStudentPatch(id, newData)
      .then(() => {
        debugger;
        // updateDetails(target, newData);
        // switchEditable(target);
      })
      .catch((e) => console.log(e));
  }
}

studentsService();

document.addEventListener("click", clickHandler);
document.addEventListener("submit", submitHandler);
