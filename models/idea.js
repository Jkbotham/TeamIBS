
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
        }
    });

    Idea.associate = function (models) {
        Idea.hasMany(models.Comment, {});
    };
    return Idea
};