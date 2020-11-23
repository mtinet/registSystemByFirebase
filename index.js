'use strict';

// 입력받기 인터페이스
const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// [START imports]
const firebase = require('firebase-admin');
// [END imports]

// TODO(DEVELOPER): Change the two placeholders below.
// [START initialize]
// Initialize the app with a service account, granting admin privileges
/** @type {any} */
const serviceAccount = require('jsontest-ff05d-firebase-adminsdk-ivjfk-1a1f061042.json');
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
  databaseURL: 'https://jsontest-ff05d.firebaseio.com'
});

const db = firebase.database();
console.log("firebase is setted up...")
console.log("")
// [END initialize]

var idNum = 1;
var key;
var data;
var obj_length;


readDB();
//writeDB();

rl.on("line", function(line) {
  if (line == "r") {
    readDB();
    console.log("read current info");
    rl.prompt();
  }
  if (line == "w") {
    writeDB();
    console.log("wrote current info");
    rl.prompt();
  }
  if (line == "exit") {
    console.log("program exit...");
    rl.close();
  }
}).on("close", function() {
  process.exit();
});


// 자료 읽기
function readDB() {
  var ref = db.ref("users");
  ref.on('value', function(snapshot) {
    key = snapshot.key;
    data = snapshot.val();
    // console.log(typeof key, key);
    // console.log(typeof data, data);
    console.log("* 저장되어 있는 데이터 목록");
    console.log(data);

    obj_length = Object.keys(data).length;
    console.log("* 저장되어 있는 데이터의 갯수 : " + obj_length);

    idNum = obj_length+1;
    console.log("* 다음 아이디 번호 : ", idNum);

    console.log("* 'r'을 누르면 기록된 데이터를 불러오고, 'w'를 누르면 데이터를 기록합니다.")
  });
}


// 자료 쓰기
function writeDB() {
  // 기존 자료에 id가 없으면 id라는 ref를 추가 하고 자료를 세팅하고, id가 있으면 그 자료에 자료를 세팅함
  var ref = db.ref("users");
  var aa = {
    ["id"+idNum] : {name: "김주현",
          email: "mtinet@hanmail.net",
          phone: "010-9483-2362"
    }
  }
  // push(특정 id를 스스로 만들어서 자료를 올림. 자료는 고유성을 가짐)
  // ref.push(aa);
  // set(기존의 자료를 삭제하고 현재 업로드한 자료로 대체함)
  // ref.set(aa);
  // update(기존의 자료는 그대로 두고 현재의 자료를 업데이트 함)
  ref.update(aa);
  console.log("* 'r'을 누르면 기록된 데이터를 불러오고, 'w'를 누르면 데이터를 기록합니다.")
  // 등을 사용할 수 있음
}
