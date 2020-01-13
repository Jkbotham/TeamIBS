
module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", {
        user_id: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        user_displayName: {
            allowNull: false,
            type: DataTypes.STRING
        }
        
    });

    User.associate = function (models) {
        User.hasMany(models.Comment, {});
    };

    User.associate = function (models) {
        User.hasMany(models.Idea, {});
    };

    return User
}