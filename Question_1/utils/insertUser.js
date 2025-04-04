import { UserProfile } from "../model/UsersProfile.js";
import { User } from "../model/Usersmodel.js";
const users = [
  { first_name: "John", last_name: "Doe", email: "john@example.com", password: "pass123", dob: "1990-01-15", mobile_no: "1234567890" },
  { first_name: "Jane", last_name: "Smith", email: "jane@example.com", password: "pass234", dob: "2013-07-25", mobile_no: "2345678901" },
  { first_name: "Alice", last_name: "Brown", email: "alice@example.com", password: "pass345", dob: "1995-11-05", mobile_no: "3456789012" },
  { first_name: "Bob", last_name: "Johnson", email: "bob@example.com", password: "pass456", dob: "2012-04-22", mobile_no: "4567890123" },
  { first_name: "Charlie", last_name: "Davis", email: "charlie@example.com", password: "pass567", dob: "1993-08-19", mobile_no: "5678901234" },
];


const insertUser = async () => {
  try {
    for (const userData of users) {
      const newUser = new User({
        first_name: userData.first_name,
        last_name: userData.last_name,
        email: userData.email,
        password: userData.password,

      });
      const savedUser = await newUser.save();
      const newUserProfile = new UserProfile({
        user_id: savedUser._id,
        dob: new Date(userData.dob),
        mobile_no: userData.mobile_no,
      });
      await newUserProfile.save();
      console.log(`User ${userData.email} inserted successfully.`);

    }

    console.log("User inserted Successfully")
  } catch (error) {
    console.log(error);
  }
}
export default insertUser