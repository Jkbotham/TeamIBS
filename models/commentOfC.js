const moment = require("moment");

module.exports = function (Sequelize, DataTypes) {
        const SubComment = Sequelize.define("SubComment", {
        body: {
            validate: {
                notNull: true
            },
            type: DataTypes.STRING,
            allowNull: false
        },
        createdAt: {
            type: DataTypes.DATE,                  
          get() {
                return moment(this.getDataValue('createdAt')).format('MM/DD/YYYY h:mm:ss a');
            }
        },
        updatedAt: {
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('updatedAt')).format('MM/DD/YYYY h:mm:ss a');
            }
        }        
    });

    SubComment.associate = function (models) {
        SubComment.belongsTo(models.Comment, {
            foreignKey: {
                allowNull: false
            }
        });
     };
     return SubComment;
    };
