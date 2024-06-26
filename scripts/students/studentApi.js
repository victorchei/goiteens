const URL_STUDENTS = "http://localhost:3000/students";

// приклади оголошення асинхронних функцій
// const func = async function test() {
//   return 4;
// };

// func();

// async function test() {}

// const test = async () => {};

// const obj = {
//   method1: async () => {},
//   method: test,
// };

class StudentApi {
  getAllStudents() {
    return fetch(`${URL_STUDENTS}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => console.error(e));
  }

  getById(id) {
    return fetch(`${URL_STUDENTS}/${id}`)
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => console.error(e));
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
        return response.json();
      })
      .then((data) => data)
      .catch((e) => console.error(e));
  }

  updateStudentPut(id, student) {
    return fetch(`${URL_STUDENTS}/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(student),
    })
      .then((response) => response.json())
      .then((data) => data)
      .catch((e) => console.error(e));
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
      .then((data) => data)
      .catch((e) => console.error(e));
  }

  deleteStudent(id) {
    return fetch(`${URL_STUDENTS}/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => data)
      .catch((e) => console.error(e));
  }
}

class StudentApi2 {
  async getAllStudents() {
    try {
      const res = await fetch(`${URL_STUDENTS}`);

      if (!res.ok) {
        return console.log("some error");
      }

      if (res.status === "401") {
        return console.error("не авторизований");
      }

      const parsedData = await res.json();
      return parsedData;
    } catch (e) {
      console.error(e);
    }
  }

  async getById2(id) {
    try {
      const res = await fetch(`${URL_STUDENTS}/${id}`);
      const parsedData = await res.json();
      return parsedData;
    } catch (e) {
      console.error(e);
    }
  }

  async addStudent(student) {
    try {
      const answer = await fetch(`${URL_STUDENTS}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      const parsedData = await answer.json();
      return parsedData;
    } catch (e) {
      console.error(e);
    }
  }

  async updateStudentPut(id, student) {
    try {
      // отримуємо дані з АПІ
      const result = await fetch(`${URL_STUDENTS}/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });
      // парсимо дані
      const data = await result.json();

      // віддаємо дані
      return data;
    } catch (e) {
      console.error(e);
    }
  }

  async updateStudentPatch(id, student) {
    try {
      const data = await fetch(`${URL_STUDENTS}/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      const studentData = await data.json();
      return studentData;
    } catch (e) {
      console.error(e);
    }
  }

  async deleteStudent(id) {
    try {
      const res = await fetch(`${URL_STUDENTS}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(res.status);
      }

      return await res.json();
    } catch (e) {
      console.error(e);
    }
  }
}

const studentApi = new StudentApi();

export default studentApi;
