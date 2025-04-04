import express from 'express'
const app = express();
import { faker } from '@faker-js/faker';
export function createRandomUser() {
  return {
    userId: faker.string.uuid(),
    username: faker.internet.username(),
    email: faker.internet.email(),
    password: faker.internet.password(),

  };
}


const users = faker.helpers.multiple(createRandomUser, {
  count: 5,
});
console.log(users)




app.listen(3000, () => {
  console.log('server is running on port 3000')
})