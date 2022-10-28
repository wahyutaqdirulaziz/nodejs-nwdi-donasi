const { Transaksi, User } = require('../models');
class lastDonatControllers {

    static lastdonasi = async(req, res) => {

        Transaksi.findAll({
            where: { status: "PAID" },
            include: [{
                model: User,
                attributes: ['name']
            }],
            order: [
                ['id', 'DESC'],
            ],
        }).then(transaksi => {
            transaksi.map(dt => {

                dt.jumlah = Intl.NumberFormat(['ban', 'id']).format(dt.jumlah);

            });
            return res.status(200).json({
                data: transaksi
            })
        });
    }

}


module.exports = lastDonatControllers;