
module.exports = function(sequelize, DataTypes){
    const Comment = sequelize.define("Comment", {
        body: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Comment.associate = function (models) {
        Comment.belongsTo(models.Idea,{
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Comment
};