module.exports = (sequelize, DataTypes) => {
    const UserDetail = sequelize.define('UserDetail', {
            users_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                primaryKey: true,
            },
            alamat: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            nomor_handphone: {
                type: DataTypes.STRING,
                allowNull: false,
            },


        },

        {
            tableName: 'users_detail'
        })
    UserDetail.associate = models => {
        UserDetail.belongsTo(models.User, {
            foreignKey: 'id'
        })
    }
    UserDetail.removeAttribute('id');
    return UserDetail;
}