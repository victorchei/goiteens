const URL_STUDENTS = "http://localhost:3000/students";

class StudentApi {
  getAllStudents() {
    return fetch(`${URL_STUDENTS}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        return data;
      });
  }

  getById(id) {
    return fetch(`${URL_STUDENTS}/${id}`)
      .then((response) => response.json())
      .then((data) => console.log(data));
  }

  addStudent(student) {
    return fetch(`${URL_STUDENTS}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        debugger;
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  updateStudentPut(id, student) {
    return fetch(`${URL_STUDENTS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        debugger;
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  updateStudentPatch(id, student) {
    return fetch(`${URL_STUDENTS}/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }

  deleteStudent(id) {
    return fetch(`${URL_STUDENTS}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  }
}

const studentApi = new StudentApi();

export default studentApi;

// studentApi.getAllStudents();
// studentApi.getById(1);

// const newStudent = {
//   name: "Ivan",
//   age: 25,
//   isMarried: false,
// };

// studentApi.getById('2e68').then((student) => {
//     console.log(student);
//     studentApi.addStudent(newStudent);
//     }).catch((error) => {
//         console.log("error");
//     });

// studentApi.addStudent(newStudent);

// studentApi.updateStudentPut("2e68", { test: 1 });
// studentApi.updateStudentPatch("2e68", { test: 2 });

// studentApi.deleteStudent("ac05");
