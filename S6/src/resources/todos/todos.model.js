const { Database } = require("sequelize");
const sequelize = require("../../utils/db");


const Todo = sequelize.define('Todo', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 15]
        }

    },
    description: {
        type: DataTypes.STRING,
       defaultvalue: "na"
    }
        
    },{
        timestamps: false,
     });


     module.exports = Todo
     