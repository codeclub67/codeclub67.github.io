function start() {
  fetch('objects.json')
    .then(result => result.json())
    .then(data => {
      for (key in data) {
        localStorage.setItem(key, data[key]);
      }
    })
}

function here(room, id) {
  let e = document.getElementById(id);
  e.innerHTML = "";
  fetch('objects.json')
    .then(result => result.json())
    .then(objects => {
      for (item in objects) {
        if (localStorage.getItem(item) == room) {
          e.innerHTML += `<button onclick="take('${item}','${room}','${id}')">You see a ${item}, pick it up.</button><br>`;
        }
        if (localStorage.getItem(item) == "inventory") {
          e.innerHTML += `<button onclick="drop('${item}','${room}','${id}')">You are carrying a ${item}, drop it</button><br>`;
        }
      }
    })
}

function take(item, room, id) {
  localStorage.setItem(item, "inventory");
  here(room, id);
}

function drop(item, room, id)  {
  localStorage.setItem(item, room);  
  here(room, id);  
}

function carrying(e,item)  {
  if (localStorage.getItem(item) == "inventory")  {
    return location.href= e.href;
  }
  else {
    alert(`You don't have the ${item}!`);
  }
}