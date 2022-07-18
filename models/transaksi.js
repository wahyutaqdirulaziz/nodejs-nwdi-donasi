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
      jumlah: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      users_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      unpayment: {
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
      tableName: 'transaksis'
    })
    return Transaksi;
  }