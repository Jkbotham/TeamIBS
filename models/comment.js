
const moment = require("moment"); 

module.exports = function(sequelize, DataTypes){
    const Comment = sequelize.define("Comment", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false
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

    Comment.associate = function (models) {
        Comment.belongsTo(models.Idea,{
            foreignKey: {
                allowNull: false
            },
            onDelete: "cascade"
        });
    };
    return Comment
};