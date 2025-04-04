import { UserProfile } from "../model/UsersProfile.js";
import { User } from "../model/Usersmodel.js";
const deleteUser = async () => {
  const currentYear = new Date().getFullYear();

  try {
    const userProfiles = await UserProfile.find(); 

    for (const profile of userProfiles) {
      if (currentYear - new Date(profile.dob).getFullYear() > 25) {
        await User.findByIdAndDelete(profile.user_id);
        await UserProfile.findByIdAndDelete(profile._id);
      }
    }

    console.log("Users deleted successfully");
  } catch (error) {
    console.error("Error deleting users:", error);
  }
};

export default deleteUser