const Decimal = require('decimal.js');
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const { Donasi, Transaksi, Info } = require('../models');


class donasiControllers {

    static Getdonasi = async(req, res) => {
        const { nama } = req.query;
        try {
            if (nama != undefined) {
                var data = await Donasi.findAll({
                    where: {
                        nama: {
                            [Op.like]: `%${nama}%`
                        },

                        status_aktif: 1,
                        kategori_id: req.params.id
                    },
                    order: [
                        ['id', 'DESC'],
                        ['nama', 'ASC'],
                    ],
                })
            }
            if (nama == undefined) {
                var data = await Donasi.findAll({
                    where: {
                        status_aktif: 1,
                        kategori_id: req.params.id
                    },
                    order: [
                        ['id', 'DESC'],
                        ['nama', 'ASC'],
                    ],
                })
            }


            data.map(dt => {
                dt.setDataValue('persent', dt.jumlah_terkumpul / dt.jumlah_target * 100);
                dt.jumlah_target = Intl.NumberFormat(['ban', 'id']).format(dt.jumlah_target);
                dt.jumlah_terkumpul = Intl.NumberFormat(['ban', 'id']).format(dt.jumlah_terkumpul);

            });


            return res.status(200).json({
                products: data,
            })
        } catch (error) {
            return res.status(400).json({
                status: 'error',
                message: error.stack
            })
        }
    }



    static Getdonasibyuser = async(req, res) => {

        Transaksi.findAll({
            where: {
                users_id: req.user.id
            },
            include: [{
                model: Donasi,
                attributes: ['nama']
            }]
        }).then(value => {
            return res.status(200).json({
                value
            })
        }).catch(err => {
            return res.status(400).json({
                status: 'error',
                message: err.stack
            })
        });

    }


    static GetBerita = async(req, res) => {

            Info.findAll({

                include: [{
                    model: Donasi,
                    attributes: ['jumlah_terkumpul', 'nama']
                }]

            }).then(value => {
                return res.status(200).json({
                    value
                })
            }).catch(err => {
                return res.status(400).json({
                    status: 'error',
                    message: err
                })
            });

        }
        // const totalAmount = await Transaksi.findAll({
        //   attributes: [

    //     [Sequelize.fn('sum', Sequelize.col('jumlah')), 'jumlah_uang']
    //   ],
    //     where: { id_donasi: 6 ,unpayment:"done"},
    //     group: ['id_donasi'],
    //     raw: true
    // });

}

module.exports = donasiControllers;