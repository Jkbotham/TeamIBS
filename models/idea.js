module.exports = function (sequelize, DataTypes) {
    const Idea = sequelize.define("Idea", {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        points: {
            type: DataTypes.INTEGER
        }
    });

    Idea.associate = function (models) {
        Idea.hasMany(models.Comment, {
            onDelete: "cascade"
        });
    };
    return Idea
};