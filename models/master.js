const Sequelize = require("sequelize");
const sequelize = new Sequelize("mastersdb", "root", "h7%kVyfPqP9p!LyJ!8*%", {
  dialect: "mysql",
  host: "localhost",
  define: {
    timestamps: true,
    tableName: "masters"
  }
});


const User = sequelize.define("User", {
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
    cities: {
      type: Sequelize.JSON
    },
    bookeddates: {
      type: Sequelize.JSON
    },
    rating: {
      type: Sequelize.FLOAT,
      allowNull: false
    }

  });
 
  // User.create({
  //   email: "master2@gmail.com",
  //   name: "Victor2",
  //   cities: {
  //     "city":"Uman"
  //   },
  //   bookeddates: {
  //     "01.01.2019 12" : "reserved"
  //   },
  //   rating: 5

    
  // }).then(res=>{
  //   const user = {id: res.id, name: res.name, age: res.age}
  //   console.log(user);
  // }).catch(err=>console.log(err));

  // sequelize.sync({force: true}).then(result=>{
  //   console.log(result);
  // })
  // .catch(err=> console.log(err));
  
  // User.findAll(
  //   {
  //     where: {
  //       id: 1
  //     }
  //   }
  // ).then(res => 
  //   {
  //     console.log(res)
  //   })

 module.exports = User;
