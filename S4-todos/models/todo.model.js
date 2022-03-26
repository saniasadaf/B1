import { DataTypes } from "sequelize";
import sequelize from "../db-connection.js";


const Todo = sequelize.define('Todo', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // email: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     validate: {
    //        isEmail: true
    //     }
    // },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [5, 15]
        },
        unique: true

    },
    description: {
        type: DataTypes.STRING,
       defaultvalue: "na"
    }
        
    },{
        timestamps: false,
     });


     export default Todo;
     