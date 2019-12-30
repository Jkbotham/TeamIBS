
module.exports = function (Sequelize, DataTypes) {
        const SubComment = Sequelize.define("SubComment", {
        body: {
            validate: {
                notNull: true
            },
            type: DataTypes.STRING,
            allowNull: false
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
