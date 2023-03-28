import { Sequelize } from "sequelize";

const db = new Sequelize ('crud_img','root','',{
    host:"localhost",
    dialect:"mysql",
});

export default db;