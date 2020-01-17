const bcrypt = require("bcryptjs");
require("dotenv").config()

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: "mysql",
  host: process.env.DB_HOST,
  define: {
    timestamps: false,
    tableName: process.env.DB_ADMINS_TABLE_NAME
  }
});


const User = sequelize.define("User", {
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
  
  User.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  

  User.beforeCreate( function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

 module.exports = User;
