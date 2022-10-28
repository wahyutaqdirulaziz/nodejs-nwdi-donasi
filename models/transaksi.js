module.exports = (sequelize, DataTypes) => {
    const Transaksi = sequelize.define('Transaksi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      transaksi_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      id_donasi: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      va_nomor: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: new Date()
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
        ,defaultValue: new Date()
      }
      
    }, 
    
    {
      tableName: 'transaksi'
    })

    Transaksi.associate = models => {
      Transaksi.belongsTo(models.Donasi, {
        foreignKey: 'id_donasi'
      })
      Transaksi.belongsTo(models.User, {
        foreignKey: 'users_id'
      })
    }
    return Transaksi;
  }