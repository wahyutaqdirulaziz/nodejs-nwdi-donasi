const Sequelize = require('sequelize');
const {Donasi,Transaksi}  = require('../models');


class donasiControllers {

    static Getdonasi = async (req,res)=>{
      const totalAmount = await Transaksi.findAll({
        attributes: [
          
          [Sequelize.fn('sum', Sequelize.col('jumlah')), 'jumlah_uang']
        ],
          where: { id_donasi: 6 ,unpayment:"done"},
          group: ['id_donasi'],
          raw: true
      });
        try {
            let data = await Donasi.findAll({
              
            })
            // data.forEach((data) => {
            //   data.jumlah_terkumpul = ((parseInt(data.jumlah_terkumpul)/parseInt(data.jumlah_target))*100/100).toFixed(2);
            // })
            return res.status(200).json({
              products: data,
              total : totalAmount[0].jumlah_uang
            })
          } catch (error) {
            return res.status(400).json({
              status: 'error',
              message: error.stack
            })
          }
        }

}

module.exports = donasiControllers;