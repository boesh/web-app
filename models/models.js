const Sequelize = require("sequelize");
require("dotenv").config()

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  dialect: "mysql",
  host: process.env.DB_HOST,
  define: {
    timestamps: true,
  }
});

const City = sequelize.define(process.env.DB_CITIES_TABLE_NAME, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull:false
  }
});

const CitiesOfMasters = sequelize.define(process.env.DB_CITIES_OF_MASTERS_TABLE_NAME, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  }
});

const Master = sequelize.define(process.env.DB_MASTERS_TABLE_NAME, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    validate: {
      isEmail: true
    }
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  rating: {
      type: Sequelize.FLOAT,
      allowNull: false
  }
});

const Order = sequelize.define(process.env.DB_ORDER_TABLE_NAME, {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
  date: {
    type: Sequelize.DATE,
    allowNull: false
  },
  watchsize: {
    type: Sequelize.TINYINT,
    allowNull: false
  },
  confirmed: {
    type: Sequelize.BOOLEAN,
    defaultValue: '0'
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  masterId: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

const User = sequelize.define(process.env.DB_USERS_TABLE_NAME , {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false
  },
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
  city: {
    type: Sequelize.STRING,
    allowNull: false
  }
});
  

Master.belongsToMany(City, {through: CitiesOfMasters, onDelete: "cascade"});
City.belongsToMany(Master, {through: CitiesOfMasters, onDelete: "cascade"});


FindUser = async(email) =>
{
  return await User.findOne({where: {email: email}})
}

UpdateUser = async (user, name, city) =>
{
  return await user.update({name: name, city: city})
}


FindMaster = async (email) => {
  return await Master.findOne({where: {email: email}})
}


UpdateMaster = async (master, name, rating) => {
  return await master.update({name: name, rating: rating})
}





FindCity = async (cityName) => {
  return await City.findOne({where: cityName})
}





// FindUser("mail@gmail.com")
// .then(user => {
//   !user ? CreateUser("fgdh", "mail@gmail.com", "city")
//   .then(user => console.log(user.id)) 
// : console.log(user.id) })
// User.create({name: "testuser", email: "testmail@gmail.com", city: "testcity"})
// User.create({name: "testuser1", email: "testmail1@gmail.com", city: "testcity1"})
// User.create({name: "testuser2", email: "testmail2@gmail.com", city: "testcity2"})
// AddUser("Oleg", "vi123@gmail.com", "Dnipro2")
// AddMaster("master8@gmail.com", "master", 1).then(res => {
//   console.log(res + " in promise")
// })
// AddUser("Oleg2", "victor439977852@gmail.com", "Dnipro2").then(userId => {
//   console.log(userId)
// })
// AddUser("Oleg", "victor125@gmail.com", "Dnipro2").then(userId => {
//   console.log(userId)
// })

  


// AddOrder(Date.now(), 23, 3, 1, 5)
// Master.findOne({where: {id: 5}})
//   .then(master=> {
//     if(!master) return;
//     User.findOne({where: {id: 5}})
//     .then(user=>{
//       if(!user) return;
//       master.addUser(user, {through: {date: Date.now(), hour: 23, watchsize: 3}})
//       .then(order=>{
//         console.log(order)
//       })
//     })
//   })



// sequelize.sync({force:true}).then(()=>{

//   console.log("Tables have been created");
// }).catch(err=>console.log(err));



module.exports = Mas = {
  City,
  Master,
  User,
  Order,
  CitiesOfMasters
};
