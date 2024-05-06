/**
 * task - всі звичайні операції
 * micro task - проміси і створені через queueMicrotask()
 * macro task - setTimeout, setInterval, всі діє користовача як окремі івенти
 * що породжуються
 *
 * таски - мікро - мікро ...... рендер - 0 макротаска
 *
 * одна макро з черги (перша на черзі) - все, що написано
 * в макро тасці - таски - мікро таски всі
 */

// macro 3
setTimeout(() => {
  console.log("3 setTimeout");
}, 100);

//macro 1
setTimeout(() => {
  console.log("1 setTimeout");
}, 0);

const isTrue = false; // відразу 1
console.log("1"); // відразу 2

// macro 2
setTimeout(() => {
  console.log("2 setTimeout");
});

// // відразу
// const someData2 = new Promise((resolve, reject) => {
//   // відразу
//   console.log("2 executor");
//   // some logic
//   // відразу
//   if (isTrue) {
//     resolve("Some true data"); // створює мікро 1 таску і ставить в окрему чергу
//   } else {
//     reject("Some false data"); // створює мікро 2 таску і ставить в окрему чергу
//   }
//   // не спрацює ніколи
//   resolve();

//   resolve();
// });

// someData2
//   .then((data) => {
//     console.log("then data:", data);
//   })
//   .catch((error) => {
//     console.log("catch error:", error);
//   })
//   .finally(() => {
//     console.log("end");
//   });

const someData = new Promise((resolve, reject) => {
  console.log("2 executor");

  if (isTrue) {
    resolve("Some true data"); // створює мікро 1 таску і ставить в окрему чергу
  } else {
    reject("Some false data"); // створює мікро 2 таску і ставить в окрему чергу
  }
})
  .then((data) => {
    console.log("then data:", data);
  })
  .catch((error) => {
    console.log("catch error:", error);
  })
  .finally(() => {
    console.log("end");
  });

console.log("3"); // відразу
console.log("4"); // відразу

// якщо попало в resolve - onfulfilled
// якщо попало в reject - onrejected
// someData.then(onfulfilled, onrejected);

// someData.then(
//   (data) => { // 1
//     console.log("data:", data);
//   },
//   (error) => {
//     console.log("error:", error);
//   }
// )

fetch("https://jsonplaceholder.typicode.com/todos/1")
  .then((response) => {
    // console.log("response 1", response);
    return response.json();
  })
  .then((json) => {
    console.log("json 1", json);
    return 5;
  })
  .then((data) => {
    console.log("data 1", data);
    // throw new Error("Parameter is not a number!");

    const x = data.viktor();
  })
  .catch((error) => {
    console.log("catch error", error);
  })
  .finally(() => {
    console.log("finally");
  });
