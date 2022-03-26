import { DataTypes, Op, Sequelize } from "sequelize";

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
        allowNull: false,
        validate: {
            len: [6, 20]
        }

    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
           isEmail: true
        }
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
   timestamps: false,
});

User.create({username: "Jhonrdoe", email: "abc@gmail.com", age: "28"}, {raw: true})
.then(user => console.log(user))
.catch(e => {
    console.log(e)
})


// User.bulkCreate([
//     {username: "Jhonedoe", age: 30},
//     {username: "Jhonedoe", age: 21},
//     {username: "Davedoe", age: 25},
//     {username: "Alice", age: 30},
//     {username: "Bob", age: 21},
// ])
// .then(result => console.log(result))
// .catch(err => consol.elog(err))


// User.findAll({ where:{age: 30}, attributes: ['username', 'age'], raw: true}
// )
// .then(result => console.log(result))
// .catch(err => console.log(err))


// User.findAll({ raw: true, attributes: { exclude: ['adress']} })

// .then(result => console.log(result))
// .catch(err => console.log(err))


// User.findOne({ where:{age: 21}, raw: true})
// .then(result => console.log(result))
// .catch(err => console.log(err))


// User.findByPk(11, {raw: true})
// .then(result => console.log(result))
// .catch(err => console.log(err))



// User.findAll({
//     where: {
//         username: {
//             [Op.substring]: "ob",
//         },
//     },
//     raw: true,
// })
// .then(result => console.log(result))
// .catch(err => console.log(err))





sequelize.sync({ });

sequelize
.authenticate()
.then(() => console.log("connection successful to the database"))
.catch(err => console.log("connection to db failed", err));