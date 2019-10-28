const bcrypt = require("bcryptjs");

const Sequelize = require("sequelize");
const sequelize = new Sequelize("adminsdb", "root", "h7%kVyfPqP9p!LyJ!8*%", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: false,
    tableName: "admins"
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
