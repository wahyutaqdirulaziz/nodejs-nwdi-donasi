module.exports = (sequelize, DataTypes) => {
    const Donasi = sequelize.define('Donasi', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      nama: {
        type: DataTypes.STRING,
        allowNull: false,
       
      },
      keterangan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      status_aktive: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      gambar: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kategori_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      jumlah_target: {
        type: DataTypes.DECIMAL,
        allowNull: false,
      },
      jumlah_terkumpul: {
        type: DataTypes.DECIMAL,
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
      tableName: 'donasis'
    })
    return Donasi;
  }