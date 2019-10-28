const Sequelize = require("sequelize");
const sequelize = new Sequelize("usersdb", "root", "h7%kVyfPqP9p!LyJ!8*%", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: true,
    tableName: "users"
  }
});


const User = sequelize.define("User", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  watchsize: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  hour: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  masterid: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: '0'
  }

});


// sequelize.sync({force: true}).then(result=>{
//   console.log(result);
// })
// .catch(err=> console.log(err));


module.exports = User;