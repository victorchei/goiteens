const test = "test";

const getDate = (param) => {
  return new Date(param);
};

const parseDate = (arg1) => {
  return Date.parse(arg1);
};

// console.log(getDate('2021-10-10'));
// console.log(getDate('2021.10.10'));
// console.log(getDate('2021/10/10'));
// console.log(getDate('2021-10-10T10:10:10.000Z'));
// console.log(parseDate('2021-10-10T10:10:10.000Z'));

// console.log(new Date(2000, 1, 1));
// console.log(new Date(2000, 1, 1, 1, 1, 1, 1));
// console.log(new Date(2000, 1, 1, 1));

// console.log(new Date(2000));

// console.log(Date.now());

// console.log(new Date(Date.now()));

// showDate();

function showDate() {
  const date = new Date();
  console.log("Date: " + date);

  // повертає день місяця від 1 до 31
  console.log("getDate(): " + date.setDate(2));

  // повертає день тижня від 0 до 6
  console.log("getDay(): " + date.getDay());

  // повертає місяць від 0 до 11
  console.log("getMonth(): " + date.getMonth());

  // повертає рік з 4 цифр
  console.log("getFullYear(): " + date.getFullYear());

  // повертає годину
  console.log("getHours(): " + date.getHours());
}

function toLocale(options, data) {
  const date = getDate(data);

  return date.toLocaleString("uk-UA", options);
}

const options1 = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

const options2 = {
  weekday: "short",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour12: false,
};

const options3 = {
  hour12: false,
};

// console.log(toLocale(options1));

// console.log(toLocale(options2));

// console.log(toLocale(options3));

// day - string
// якщо вихідний повертає true, якщо ні - false
// 0 - 6
// dayNumber - зберігати номер дня тижня
function weekdays(someDate) {
  const dayNumber = new Date(someDate).getDay();

  console.log("dayNumber:  ", toLocale(options1, someDate), dayNumber);

  if (dayNumber === 5 || dayNumber === 6) {
    return true;
  }

  return false;
}

console.log(weekdays("2024-04-06"));
