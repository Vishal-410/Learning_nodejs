import { UserProfile } from "../model/UsersProfile.js";
import { User } from "../model/Usersmodel.js";
const avgAge = async (req, res) => {
  try {
    const userProfiles = await UserProfile.find(); 
    const user = await User.find();
    const totalUsers = user.length;

    if (totalUsers === 0) return 0;

    const currentYear = new Date().getFullYear();

    const sumOfAges = userProfiles.reduce((sum, profile) => {
      if (profile.dob) {
        return sum + (currentYear - new Date(profile.dob).getFullYear());
      }
      return sum;
    }, 0);

    const averageAge = sumOfAges / totalUsers;

    return averageAge;
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error" });
  }
};
export default avgAge