function start() {
  if (localStorage.getItem("INITIALISED") == "true") return;
  // set initial locations of objects
  fetch('start.json')
    .then(result => result.json())
    .then(data => {
      for (key in data) {
        localStorage.setItem(key, data[key]);
      }
    });
  // save a list of carryable objects
  fetch('objects.json')
    .then(result => result.json())
    .then(data => {
      localStorage.setItem("OBJECTS",data.toString())
    });
  // save a list of immovable objects
  fetch('fixtures.json')
    .then(result => result.json())
    .then(data => {
      localStorage.setItem("FIXTURES",data.toString())
    });
  // save a list of properties
  fetch('properties.json')
    .then(result => result.json())
    .then(data => {
      localStorage.setItem("PROPERTIES",data.toString())
    });
}

function restart() {
  localStorage.clear();
  location.reload()
}

function look_for_objects(room, e) {
  let objects = localStorage.getItem("OBJECTS");
  for (item of objects.split(",")) {
    if (localStorage.getItem(item) == room) {
        e.innerHTML += `<button onclick="take('${item}','${room}','${room}')">You see ${item}, pick it up.</button><br>`;
      }
      if (localStorage.getItem(item) == "you") {
        e.innerHTML += `<button onclick="drop('${item}','${room}','${room}')">You are carrying ${item}, drop it</button><br>`;
      }
  }
  localStorage.setItem("INITIALISED","true")
}

function look_for_fixtures(room, e) {
  let fixtures = localStorage.getItem("FIXTURES");
  for (item of fixtures.split(",")) {
    if (localStorage.getItem(item) == room) {
        e.innerHTML += `<p>You see ${item}.</p>`;
      }
  }
}

function look_for_properties(e) {
  let properties = localStorage.getItem("PROPERTIES");
  for (item of properties.split(",")) {
    if (localStorage.getItem(item)=="true") {
        e.innerHTML += `<p>You are ${item}.</p>`;
    }
  }
}

function look(room) {
  let e = document.getElementById(room);
  e.innerHTML = "";
  look_for_objects(room, e);
  look_for_fixtures(room, e);
  look_for_properties(e);
}

function take(item, room, id) {
  localStorage.setItem(item, "you");
  look(room, id);
}

function drop(item, room, id) {
  localStorage.setItem(item, room);
  look(room, id);
}

function must_have(e, items, where="you") {
  if (!Array.isArray(items)) items = [items];
  for (item of items) {
    if (localStorage.getItem(item) == where) {
      continue
    }
    else if (where == "you") {
      alert(`You don't have ${item}!`);
      return 
    }
    else {
      alert(`There is no ${item} here!`);
      return
    }
  }
  location.href = e.href
}

function must_not_have(e, item, where="you") {
  console.log(localStorage.getItem(item));
  if (localStorage.getItem(item) == where) {
    if (where == "you") {
      alert(`You have ${item}!`);
    }
    else {
      alert(`There is ${item} blocking your way!`);
    }
  }
  else return location.href = e.href;
}

function show_if(place,id) {
  let e = document.getElementById(id);
  console.log(localStorage.getItem(id));
  if (localStorage.getItem(id) == place) {
    e.style.visibility = "visible";
  }
  else {
    e.style.visibility = "hidden";
  }
}

function use(room, item, as_is, to_be, message) {
  if (localStorage.getItem(item) == "you") {
    localStorage.setItem(as_is, null);
    localStorage.setItem(to_be, room);
    alert(message);
    location.reload();
  }
  else {
    alert(`You don't have ${item}!`);
  }
}

function change(item, as_is, to_be, message) {
  if (item) localStorage.setItem(item, null);
  if (as_is) localStorage.setItem(as_is, false);
  if (to_be) localStorage.setItem(to_be, true);
  alert(message);
  location.reload();
}