import { Sequelize } from "sequelize";


const sequelize = new Sequelize ("access", "root", "8618586426", {
    host: 'localhost',
    dialect: 'mysql',
    port:3306
});

export default sequelize;