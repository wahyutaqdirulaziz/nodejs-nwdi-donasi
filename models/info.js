module.exports = (sequelize, DataTypes) => {
    const Info = sequelize.define('Info', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            poto: {
                type: DataTypes.STRING,
                allowNull: false,

            },
            donasi_id: {
                type: DataTypes.INTEGER,


            },
            deskripsi: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tanggal: {
                type: DataTypes.DATE,
                allowNull: false,
            },


        },

        {
            tableName: 'berita'

        })
    Info.associate = models => {
        Info.belongsTo(models.Donasi, {
            foreignKey: 'donasi_id'
        });
    }



    return Info;
}