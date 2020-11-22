'use strict';

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
console.log("firebase is setted up")
// [END initialize]

var idNum;

// 자료 읽기
var ref = db.ref("users");
ref.on('value', function(snapshot) {
  var key = snapshot.key;
  var data = snapshot.val();
  console.log(typeof key, key);
  console.log(typeof data, data);

  const ksjs = Object.keys(data);
  console.log(ksjs);

//  idNum = data.id;
//  console.log(typeof idNum, idNum);


//  for(key in data) {
//    console.log('key:' + key + ' / ' + 'value:' + data[key]);
//  }

/*
  // object를 json포맷의 문자열로 변환
  const json = JSON.stringify(data, null, 2);
  console.log(json);

  // json포맷의 문자열을 array object로 변환
  const parsed = JSON.parse(json);
  console.log(typeof parsed, parsed);
*/
});


// 자료 쓰기
// 기존 자료에 id가 없으면 id라는 ref를 추가 하고 자료를 세팅하고, id가 있으면 그 자료에 자료를 세팅함
var ref = db.ref('users');
var aa = {
  num: 2,
  name: "345dd",
  score: 53
}

// push(특정 id를 스스로 만들어서 자료를 올림. 자료는 고유성을 가짐)
ref.push(aa);
// set(기존의 자료를 삭제하고 현재 업로드한 자료로 대체함)
// ref.set(aa);
// update(기존의 자료는 그대로 두고 현재의 자료를 업데이트 함)
// ref.update(aa);
// 등을 사용할 수 있음
