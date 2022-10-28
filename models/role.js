module.exports = (sequelize, DataTypes) => {
    const Role = sequelize.define('Role', {
            role_id: {
                type: DataTypes.INTEGER,
                defaultValue: 2,
            },
            model_type: {
                type: DataTypes.STRING,
            },
            model_id: {
                type: DataTypes.INTEGER,
                allowNull: false,

            },

        },

        {
            tableName: 'model_has_roles',
            timestamps: false,

            // If don't want createdAt
            createdAt: false,

            // If don't want updatedAt
            updatedAt: false,
        })
    Role.removeAttribute('id');
    return Role;
}