require('dotenv').config();
const Xendit = require('xendit-node');
const x = new Xendit({
  secretKey: (process.env.DEV)? process.env.SECRET_XENDIT_DEV : process.env.SECRET_XENDIT,
});
const { VirtualAcc } = x;
const vaSpecificOptions = {};
const va = new VirtualAcc(vaSpecificOptions);

const { Disbursement } = x;
const disbursementSpecificOptions = {};
const d = new Disbursement(disbursementSpecificOptions);

const { Invoice } = x;
const invoiceSpecificOptions = {};
const i = new Invoice(invoiceSpecificOptions);
const {Transaksi}  = require('../models');

class paymentControllers{
    static banklist = async (req, res) => {
       await d.getBanks().then(result=>{
        return res.status(200).json({
            data: result
          })
       }).catch(error => {
        const err = error.errors
        return res.status(400).json({
          status: 'error',
          message: err
        });
      });
    }


    static paymentdonasi= async(req,res)=>{
       await d.create({
            externalID: 'NWDI-11223779',
            bankCode: 'BCA',
            accountHolderName: 'Stan',
            accountNumber: '1234567890',
            description: 'Payment for nasi padang',
            amount: 10000,
          })
            .then(result => {
                return res.status(200).json({
                    data: result
                  })
            })
            .catch(e => {
              console.error(`Disbursement creation failed with message: ${e.message}`);
            });
    }

    static paymentbyid= async(req,res)=>{
        await d.getByID({ disbursementID: "62cb3bee47b68f0d84fc393e"})
             .then(result => {
                 return res.status(200).json({
                     data: result
                   })
             })
             .catch(e => {
               console.error(`Disbursement creation failed with message: ${e.message}`);
             });
     }


     static createvirtual = async(req,res)=>{
      //  console.log(req.body.amount);
       var date = Math.floor(Date.now() / 1000);
        va.createFixedVA({
            externalID: `VA_fixed-${date}`,
            bankCode: req.body.bankCode,
            name: req.body.name,
            expectedAmt : parseInt(req.body.amount),
            suggestedAmt:parseInt(req.body.amount),
            description : req.body.description,
            currency: "IDR"
          })
            .then(result => {
               Transaksi.create({
                transaksi_id : `VA_fixed-${date}`,
                id_donasi : parseInt(req.body.id_donasi),
                jumlah: parseInt(req.body.amount),
                users_id :parseInt(req.body.users_id),
                unpayment : "payment"
              });
                return res.status(200).json({
                    data: result
                  })
            })
            .catch(e => {
              return res.status(`VA creation failed with message: ${e.message}`);
            });

     }

     static callbackvirtual = async (req,res)=>{

      const transaksi_id = req.body.external_id;
      // const status = req.body.status;

      Transaksi.findOne({ where: { transaksi_id: transaksi_id } }).then(transaksi => {
        if (transaksi) {
          Transaksi.update({
            unpayment: "done"
          },{
            where: { transaksi_id: transaksi_id },
          })
          .then(value=> {
            
            return res.status(200).json({
              "message": `update success${value}`
            })
          }).catch(function(err) { 
            return res.status(200).json({
              "message": "update failled"
            })
        });
        }
      });



     }



     static virtual = async (req,res)=>{
        va.getFixedVA({
            id: "62cb511a06b41a05b35f29f5",       
          }).then(result => {
            return res.status(200).json({
                data: result
              })
        })
        .catch(e => {
          console.error(`Disbursement creation failed with message: ${e.message}`);
        });
         
     }

     static invoice = async (req,res)=>{
        i.createInvoice({
            externalID: 'VA_fixed-{{$timestamp}}',
            payerEmail: 'stanley@xendit.co',
            description: 'Invoice for Shoes Purchase',
            amount: 20000,
          }).then(result => {
            return res.status(200).json({
                data: result
              })
        })
        .catch(e => {
          console.error(`Disbursement creation failed with message: ${e.message}`);
        });
         
     }
}




module.exports = paymentControllers;