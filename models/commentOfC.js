
module.exports = function (Sequelize, DataTypes) {
        const SubComment = Sequelize.define("SubComment", {
        body: {
            allowNull: false,
            type: DataTypes.STRING
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
