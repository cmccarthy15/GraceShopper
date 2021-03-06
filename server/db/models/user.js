const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')
const Address = require('./address')

const User = db.define('user', {
  firstName: { // update to name and first name and last name getters
    type: Sequelize.STRING,
    //allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    //allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  isAdmin: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  password: {
    type: Sequelize.STRING
  },
  salt: {
    type: Sequelize.STRING
  },
  googleId: Sequelize.STRING
}, {
    getterMethods: {
      fullName() {
        return this.firstName + ' ' + this.lastName
      }
    }
  })

//   , {
//   scopes: {
//     addresses: () => ({
//       include: [{
//         model: Address, where: { userId: this.id }
//       }]
//     })
//   }
// }

module.exports = User

/**
 * instanceMethods
 */
User.prototype.correctPassword = function (candidatePwd) {
  return User.encryptPassword(candidatePwd, this.salt) === this.password
}

/**
 * classMethods
 */
User.generateSalt = function () {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = function (plainText, salt) {
  return crypto
    .createHash('RSA-SHA256')
    .update(plainText)
    .update(salt)
    .digest('hex')
}

/**
 * hooks
 */
const setSaltAndPassword = user => {
  if (user.changed('password')) {
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password, user.salt)
  }
}

User.beforeCreate(setSaltAndPassword)
User.beforeUpdate(setSaltAndPassword)
