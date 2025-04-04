import express from 'express';
import { hrtime } from 'process';
import { Worker } from 'worker_threads';
import responsetime from './Serial-Operator.js';

const app = express();
const port = 3000;

let contents = [{
  "id": 1,
  "first_name": "abc",
  "last_name": "xyz",
  "email": "abcxyz@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.129"
}, {
  "id": 2,
  "first_name": "def",
  "last_name": "ghi",
  "email": "defghi@360.cn",
  "gender": "Female",
  "ip_address": "163.213.59.130"
},
{
  "id": 3,
  "first_name": "abc",
  "last_name": "xyz",
  "email": "abcxyz@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.129"
}, {
  "id": 4,
  "first_name": "def",
  "last_name": "ghi",
  "email": "defghi@360.cn",
  "gender": "Female",
  "ip_address": "163.213.59.130"
},
{
  "id": 5,
  "first_name": "abc",
  "last_name": "xyz",
  "email": "abcxyz@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.129"
}, {
  "id": 6,
  "first_name": "def",
  "last_name": "ghi",
  "email": "defghi@360.cn",
  "gender": "Female",
  "ip_address": "163.213.59.130"
},
{
  "id": 7,
  "first_name": "abc",
  "last_name": "xyz",
  "email": "abcxyz@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.129"
}, {
  "id": 8,
  "first_name": "def",
  "last_name": "ghi",
  "email": "defghi@360.cn",
  "gender": "Female",
  "ip_address": "163.213.59.130"
},
{
  "id": 9,
  "first_name": "abc",
  "last_name": "xyz",
  "email": "abcxyz@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.129"
}, {
  "id": 10,
  "first_name": "def",
  "last_name": "ghi",
  "email": "defghi@360.cn",
  "gender": "Female",
  "ip_address": "163.213.59.130"
},
{

  "id": 11,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
}
,
{

  "id": 12,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
}
,
{

  "id": 13,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
},
,
{

  "id": 14,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
},
,
{

  "id": 15,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
},
,
{

  "id": 16,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
},
,
{

  "id": 17,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
},
,
{

  "id": 18,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
},
,
{

  "id": 19,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
},,
{

  "id": 20,
  "first_name": "jkl",
  "last_name": "mno",
  "email": "jklmno@360.cn",
  "gender": "Male",
  "ip_address": "163.213.59.131"
}
]


// const start = hrtime.bigint();
// const worker = new Worker('./worker.js'); 
// worker.postMessage(contents);

// worker.on('message', (result) => {
//   const end = hrtime.bigint(); 
 
//   console.log(result);

 
//   const executionTime = (end - start) / BigInt(10 ** 6)  
//   console.log(`Execution time: ${executionTime}ms`);


// });
console.log(`Serial execution time: ${responsetime}ms`);
app.listen(port, () => {
  console.log(`server is running on port ${port}`);
})