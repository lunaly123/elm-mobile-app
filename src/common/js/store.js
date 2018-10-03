export function saveToLocal(id, key, val) {
  let data = window.localStorage.data;
  if(!data) {
    data = {};
    data[id] = {};
  } else {
    data = JSON.parse(data);
    if(!data[id]) {
      data[id] = {};
    }
  }
  data[id][key] = val;
  window.localStorage.data = JSON.stringify(data);
}

export function loadFromLocal(id, key, def) {
  let data = window.localStorage.data;
  if(!data) {
    return def;
  }
  data = JSON.parse(data)[id];
  if(!data) {
    return def;
  }
  let val = data[key];
  return val || def;
}