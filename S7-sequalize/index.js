import { DataTypes, INTEGER, Sequelize } from "sequelize";

const sequelize = new Sequelize ("access", "root", "8618586426", {
    host: 'localhost',
    dialect: 'mysql',
    port:3306
});

const User = sequelize.define('user', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false

    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
  adress: {
      type: DataTypes.STRING,
      defaultValue: "NA"
  }
}, {
   timestamps: false
})


// User.sync()
// .then(res => console.log("User model sync success",res))
// .catch(err => console.log("Failed to sync user model", err))

const Todo = sequelize.define('todo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true

    },
    tittle: {
        type: DataTypes.STRING,
        allowNull: false

    },
    description: {
        type: DataTypes.STRING,
        defaultValue: "-"

    }
})

// for (let i=0; i<10; i++) {

// User.create({ username: `user${i}`, age: i+15 })
// .then(res => res.toJSON())
// .then(result => console.log(result))
// .catch(err => console.log(err))
// }


User.findAll()
.then(res => res.toJSON())
.then(result =>console.log(result)) 
.catch(err => console.log(err))

sequelize.sync({ })


sequelize
.authenticate()
.then(() => console.log("connection successful to the database"))
.catch(err => console.log("connection to db failed", err));