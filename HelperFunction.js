const { PREMIUM_CUTOFF, premiumRole } = require("./Constant");

const updateMemberRoleForDonation = async (guild, member, donationAmount) => {
  // If the user donated more than $10, give them the premium role.
  if (guild && member && donationAmount >= PREMIUM_CUTOFF) {
    // Get the role, or if it doesn't exist, create it.
    let role = Array.from(guild.roles.values()).find(
      (role) => role.name === premiumRole.name
    );

    if (!role) {
      role = await guild.createRole(premiumRole);
    }

    // Add the role to the user, along with an explanation
    // for the guild log (the "audit log").
    return member.addRole(role.id, "Donated $10 or more.");
  }
};

module.exports = updateMemberRoleForDonation