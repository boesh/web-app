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
