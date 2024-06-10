// macro task =  all tasks > all micro
// 1 macro (all inside) > 2 macro ....
// micro task = promise (then, catch, finally, all, allSettle, race, any) - мікро завдання коли виони виконуються
// всі мікро таски виконуються всередині своєї макро таски

// example of async macrotask and microtask
// asyncExample();
function asyncExample() {
  // simple task 1, create const
  const someConst1 = 1;
  console.log("task 1 someConst1", someConst1);

  // simple task 2, create function
  const someFunc = () => null;
  console.log("task 2 someFunc", someFunc);

  // simple task 4, create promise
  const somePromise = new Promise((resolve) => {
    // simple task 3, run function inside crete promise
    console.log("task 3 someFunc inside promise");
    resolve(1);
  });

  console.log("task 4 somePromise", somePromise);

  // simple task 5, create promise
  const somePromise2 = new Promise((resolve) => {
    //create macro task 1
    console.log("task 5 someFunc inside promise");
    setTimeout(() => {
      console.log("setTimeout 1000 1");
      //code inside macro task
      resolve(2);
    }, 1000);
  });

  console.log("task 6 somePromise2", somePromise2);

  // create macro task 2
  setTimeout(() => {
    console.log("setTimeout 1000 2");
  }, 1000);

  // create macro task 3
  setTimeout(() => {
    // code inside macro task
    console.log("setTimeout 0");

    // create macro task - буде аж коли виконається setTimeout в який завернутий код
    setTimeout(() => {
      console.log("setTimeout 1000 inside setTimeout 0");
    }, 1000);
  }, 0);

  console.log("task 7");

  somePromise2
    .then((res) => {
      console.log("somePromise2 with setTimeout 1000 micro 1 then 1", res);
      return "value1";
    })
    .then((value) => {
      console.log("somePromise2 with setTimeout 1000 micro 2 then 2", value);
    });

  somePromise
    .then((res) => {
      console.log("micro 1 somePromise then run1", res);
      return "value1";
    })
    .then((value) => {
      console.log("micro 2 somePromise then run1", value);
    });

  somePromise
    .then((res) => {
      console.log("micro 1 somePromise then run2", res);
      return "value2";
    })
    .then((value) => {
      console.log("micro 2 somePromise then run2", value);
    });
}

function makePromise(text, delay) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(text), delay);
  });
}

// Promise.all - виконується результат всіх промісів одночасно

//promiseAllExample();
function promiseAllExample() {
  const promiseA = makePromise("promiseA value", 1000);
  const promiseB = makePromise("promiseB value", 3000);

  Promise.all([promiseA, promiseB])
    .then((value) => console.log(value)) //["promiseA value", "promiseB value"]
    .catch((error) => console.log(error)); // never run(we don't have error)
}

//promiseAllExampleWithFetch();
function promiseAllExampleWithFetch() {
  const promise1 = fetch("https://jsonplaceholder.typicode.com/todos/1");
  const promise2 = fetch("https://jsonplaceholder.typicode.com/todos/2");
  const promise3 = Promise.reject("some error");

  Promise.all([promise1, promise2, promise3])
    .then((responses) => {
      console.log("responses", responses);
      return Promise.all(responses.map((response) => response.json()));
    })
    .then((jsons) => {
      console.log("jsons", jsons);
    })
    .catch((error) => console.error(error));
}

// Promise.race - виконується коли найшвидший виконується

// promiseRaceExamplePositive();
function promiseRaceExamplePositive() {
  const promiseA = makePromise("promiseA value", 1000);
  const promiseB = makePromise("promiseB value", 3000);
  const promiseC = makePromise("promiseC value", 1);

  Promise.race([promiseA, promiseB, promiseC])
    .then((value) => console.log(value)) // promiseC value" - найшвидший
    .catch((error) => console.log(error)); // never run(we don't have error)
}

// promiseRaceExampleNegative();
function promiseRaceExampleNegative() {
  const promiseA = makePromise("promiseA value", 1000);
  const promiseB = makePromise("promiseB value", 3000);
  const promiseC = Promise.reject("promiseRaceExampleNegative C some error");

  Promise.race([promiseA, promiseB, promiseC])
    .then((value) => console.log(value)) // never run(we don't have value)
    .catch((error) => console.log(error)); // найшвидший має помилку
}

// так само як race якщо найшвидший запит виконується успішно, то він виконається
// promiseAnyExamplePositive();
function promiseAnyExamplePositive() {
  const promiseA = makePromise("promiseA value", 1000);
  const promiseB = makePromise("promiseB value", 3000);
  const promiseC = makePromise("promiseC value", 1);

  Promise.any([promiseA, promiseB, promiseC])
    .then((value) => console.log(value)) // promiseC value" - найшвидший
    .catch((error) => console.log(error)); // never run(we don't have error)
}

// Promise.any - виконується коли хоча б один виконується успішно

// promiseAnyExampleNegative();
function promiseAnyExampleNegative() {
  const promiseA = makePromise("promiseA value", 1000);
  const promiseB = makePromise("promiseB value", 3000);
  const promiseC = Promise.reject("promiseRaceExampleNegative C some error");

  Promise.any([promiseA, promiseB, promiseC])
    .then((value) => console.log(value)) // never run(we don't have value)
    .catch((error) => console.log(error)); // найшвидший має помилку
}

// promiseAllErrorsExample();
function promiseAllErrorsExample() {
  Promise.any([
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Ой!")), 1000)
    ),
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error("Помилка!")), 2000)
    ),
  ]).catch((error) => {
    console.log(error.constructor.name); // AggregateError
    console.log(error.errors[0]); // Error: Ой!
    console.log(error.errors[1]); // Error: Помилка!
  });
}

// shortPromiseExample();
function shortPromiseExample() {
  new Promise((resolve) => resolve("success value")).then((value) =>
    console.log(value)
  );

  Promise.resolve("success value").then((value) => console.log(value));

  // Rejected promise
  new Promise((resolve, reject) => reject("error")).catch((error) =>
    console.error(error)
  );

  Promise.reject("error").catch((error) => console.error(error));
}

// поганий код
// example1()
function example1() {
  const makeGreeting = (guestName) => {
    if (guestName === "" || guestName === undefined) {
      return {
        success: false,
        message: "Guest name must not be empty",
      };
    }

    return {
      success: true,
      message: `Welcome ${guestName}`,
    };
  };

  const result = makeGreeting("Mango");

  if (result.success) {
    console.log(result.message);
  } else {
    console.error(result.message);
  }
}

// кращий код з колбеками
// example2()
function example2() {
  const makeGreeting = (guestName, onSuccess, onError) => {
    if (guestName === "" || guestName === undefined) {
      return onError("Guest name must not be empty");
    }
    onSuccess(`Welcome ${guestName}`);
  };

  makeGreeting(
    "Mango",
    (greeting) => console.log(greeting),
    (error) => console.error(error)
  );
}

// промісфікація
// example3()
function example3() {
  const makeGreeting3 = (guestName) => {
    if (guestName === "" || guestName === undefined) {
      return Promise.reject("Guest name must not be empty");
    }

    return Promise.resolve(`Welcome ${guestName}`);
  };

  makeGreeting3("Mango")
    .then((greeting) => console.log(greeting))
    .catch((error) => console.error(error));
}
