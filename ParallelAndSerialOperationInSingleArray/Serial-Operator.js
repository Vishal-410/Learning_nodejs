import { hrtime } from 'process';

let contents = [
  { "id": 1, "first_name": "abc", "last_name": "xyz", "email": "abcxyz@360.cn", "gender": "Male", "ip_address": "163.213.59.129" },
  { "id": 2, "first_name": "def", "last_name": "ghi", "email": "defghi@360.cn", "gender": "Female", "ip_address": "163.213.59.130" },
  { "id": 3, "first_name": "abc", "last_name": "xyz", "email": "abcxyz@360.cn", "gender": "Male", "ip_address": "163.213.59.129" },
  { "id": 4, "first_name": "def", "last_name": "ghi", "email": "defghi@360.cn", "gender": "Female", "ip_address": "163.213.59.130" },
  { "id": 5, "first_name": "abc", "last_name": "xyz", "email": "abcxyz@360.cn", "gender": "Male", "ip_address": "163.213.59.129" },
  { "id": 6, "first_name": "def", "last_name": "ghi", "email": "defghi@360.cn", "gender": "Female", "ip_address": "163.213.59.130" },
  { "id": 7, "first_name": "abc", "last_name": "xyz", "email": "abcxyz@360.cn", "gender": "Male", "ip_address": "163.213.59.129" },
  { "id": 8, "first_name": "def", "last_name": "ghi", "email": "defghi@360.cn", "gender": "Female", "ip_address": "163.213.59.130" },
  { "id": 9, "first_name": "abc", "last_name": "xyz", "email": "abcxyz@360.cn", "gender": "Male", "ip_address": "163.213.59.129" },
  { "id": 10, "first_name": "def", "last_name": "ghi", "email": "defghi@360.cn", "gender": "Female", "ip_address": "163.213.59.130" },
  { "id": 11, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" },
  { "id": 12, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" },
  { "id": 13, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" },
  { "id": 14, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" },
  { "id": 15, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" },
  { "id": 16, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" },
  { "id": 17, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" },
  { "id": 18, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" },
  { "id": 19, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" },
  { "id": 20, "first_name": "jkl", "last_name": "mno", "email": "jklmno@360.cn", "gender": "Male", "ip_address": "163.213.59.131" }
];

const start = hrtime.bigint();

// Perform the operation without console.log for accurate timing
const result = contents.map((content) => {
  return content; // Replace with actual processing logic
});

const end = hrtime.bigint();
const responsetime = (end - start) / BigInt(10 ** 6);  // Convert nanoseconds to milliseconds

console.log(`Serial execution time: ${responsetime}ms`);

export default responsetime;
