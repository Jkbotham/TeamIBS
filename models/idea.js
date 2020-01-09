
const moment = require("moment"); 

module.exports = function (sequelize, DataTypes) {
    const Idea = sequelize.define("Idea", {
        title: {
            type: DataTypes.STRING,
            allowNull:false
        },
        body: {
            allowNull:false,
            type: DataTypes.TEXT
        },
        points: {
            type: DataTypes.INTEGER
        },
        createdAt: {
            type: DataTypes.DATE,
                      
          get() {
                return moment(this.getDataValue('createdAt')).format('MM/DD/YYYY h:mm:ss');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('MM/DD/YYYY h:mm:ss');
            }
        }
    });

    Idea.associate = function (models) {
        Idea.hasMany(models.Comment, {});
    };
    return Idea
};