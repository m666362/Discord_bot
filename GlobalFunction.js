const { newRole } = require("./Constant")

module.exports.addUser = (member)=>{
    member.roles.add(newRole)
}