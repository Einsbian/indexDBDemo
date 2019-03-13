class IndexDB {
  constructor() {
    let request = indexedDB.open("myDB",'5');
    // 创建成功之后获取database
    request.onsuccess = (event)=>{
      // this.db = request.result
      console.log('hel')
      this.db = request.result
    }
    request.onupgradeneeded = (event)=>{
      console.log('hellloooooooooo')
      this.db = request.result
      if(!this.db.objectStoreNames.contains(`somebody`)){
        this.store = this.db.createObjectStore(`somebody`, { keyPath: `id`});
      }
    }
    this.instance = null;
  }

  static getInstance() {
    if (!this.instance) {
      this.instance = new IndexDB();
    }
    return this.instance;
  }

  createObjStore(objStoreName, keyPath, data) { // 创建对象仓库，类似于table
    let request = this.db.transaction([objStoreName], 'readwrite')
      .objectStore(objStoreName)
      .add(data);

    request.onsuccess = (event)=>{
      this.db = event.target.result
      console.log(event)
    }
    request.onerror = (event)=>{
      console.log('error')
    }
  }

  // 获取指定id的数据
  getData(index) {
    let transaction = this.db.transaction(['somebody']);
    let objectStore = transaction.objectStore('somebody');
    var request = objectStore.get(index);
    request.onsuccess = (event) => {
      if (event.target.result) {
        console.log('Name: ' + event.target.result.name);
        console.log('Age: ' + event.target.result.age);
        console.log('Email: ' + event.target.result.email);
      } else {
        console.log('未获得数据记录');
      }
    }
    request.onerror = (event) => {
      console.log(error)
    }
  }

  getAllData() {
    let transaction = this.db.transaction(['somebody']);
    let objectStore = transaction.objectStore('somebody');
    objectStore.openCursor().onsuccess = (event) => {
      if (event.target.result) {
        console.log('Name: ' + event.target.result.value.name);
        console.log('Age: ' + event.target.result.value.age);
        console.log('Email: ' + event.target.result.value.email);
        event.target.result.continue();
      } else {
        console.log('未获得数据记录');
      }
    }
  }
}

let indexDB = IndexDB.getInstance()

let count = 0

function addUser(){
  let userArr = [
    {
      id: 1,
      name: '武松',
      age: 18,
      email: 'xingzhe@163.com'
    },
    {
      id: 2,
      name: '鲁智深',
      age: 19,
      email: 'huaheshang@163.com'
    },
    {
      id: 3,
      name: '史进',
      age: 18,
      email: 'jiuwenlong@163.com'
    },
    {
      id: 4,
      name: '阮小七',
      age: 18,
      email: 'huoyanluo@163.com'
    }
  ];
  indexDB.createObjStore(`somebody`,`id`,userArr[count])
  count++
}

function getUser(){
  indexDB.getAllData()
}


// indexDB.createTable("create table if not exists MsgData(name text,message text,time integer)", [])
// // indexDB.addData('alibaba','hello','b10')

// async function creatDom() {

//   let indexData = indexDB.getData();
//   // let elementStr = `<ul>`;
//   let parentElement = document.querySelector('#container');
//   let ulElement = document.createElement(`ul`)

//   await indexData.then(res => {
//     res.map(msg => {
//       let liElement = document.createElement(`li`)
//       liElement.append(msg.name)
//       ulElement.appendChild(liElement)
//       // elementStr += `<li>${msg.name}</li>`;
//     })
//   })
  
//   parentElement.append(ulElement)
//   // return elementStr + '</ul>'
// }

// creatDom()

