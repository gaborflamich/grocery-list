let grocery = document.getElementById('grocery-form');
let writeList = document.getElementById('writeList');
let currentItem = null;

grocery.addEventListener('submit', (e) => {
  e.preventDefault();
  if (currentItem) {
    updateItem();
  } else {
    let data = writeList.value;
    createListItem(data);
    saveItemToLocalStorage(data);
  }
});

function createListItem(data) {
  let list = document.querySelector('ul');
  let item = document.createElement('li');
  let text = document.createElement('span');
  let icons = document.createElement('span');
  let removeBtn = document.createElement('i');
  let doneBtn = document.createElement('i');
  let updateBtn = document.createElement('i');

  item.classList.add('list-group-item');
  icons.classList.add('icons');
  removeBtn.classList.add('icon-delete');
  doneBtn.classList.add('icon-check');
  updateBtn.classList.add('icon-update');

  text.textContent = data;
  writeList.value = '';
  list.append(item);
  icons.append(doneBtn, updateBtn, removeBtn);
  item.append(text, icons);

  removeBtn.addEventListener('click', (e) => {
    deleteItem(e, data);
  });

  item.addEventListener('click', (e) => {
    doneItem(e);
  });

  updateBtn.addEventListener('click', (e) => {
    editItem(e, text);
  });
}

document.addEventListener('DOMContentLoaded', (e) => {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  items.forEach(createListItem);
});

function saveItemToLocalStorage(data) {
  let items = JSON.parse(localStorage.getItem('items')) || [];
  items.push(data);
  localStorage.setItem('items', JSON.stringify(items));
}

function updateItemInLocalStorage(oldData, newData) {
  let items = JSON.parse(localStorage.getItem('items'));
  let index = items.indexOf(oldData);
  if (index !== -1) {
    items[index] = newData;
    localStorage.setItem('items', JSON.stringify(items));
  }
}

function deleteItem(e, data) {
  e.target.parentElement.parentElement.remove();
  let items = JSON.parse(localStorage.getItem('items'));
  let index = items.indexOf(data);
  if (index !== -1) {
    items.splice(index, 1);
    localStorage.setItem('items', JSON.stringify(items));
  }
}

function doneItem(e) {
  e.target.classList.toggle('done');
}

let originalText = null;

function editItem(e, text) {
  writeList.focus();
  writeList.value = text.textContent;
  originalText = text.textContent;
  currentItem = text;
}

function updateItem() {
  let newText = writeList.value;
  currentItem.textContent = newText;
  updateItemInLocalStorage(originalText, newText);
  writeList.value = '';
  originalText = null;
  currentItem = null;
}
