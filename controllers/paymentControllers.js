
const Xendit = require('xendit-node');
const moment = require('moment');
const x = new Xendit({
  secretKey: "xnd_development_drzuXn0ZLPD5TlR9QPsUxzGu1q87ZCzFp5GBOtW89PzeUNxFID1KIjwxPs",
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
const {Transaksi,User,Donasi}  = require('../models');
const { admin } = require('./firebase_config')

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
      var Dates = Date.now();
      console.log(moment().add(1, 'days').format())
      console.log(moment().format() + 1)
       var date = Math.floor(Dates / 1000);
        va.createFixedVA({
            externalID: `NWDI-${date}`,
            bankCode: req.body.bankCode,
            name: req.body.name,
            expectedAmt : parseInt(req.body.amount),
            suggestedAmt:parseInt(req.body.amount),
            expirationDate : new Date(moment().add(2, 'days').format()),
            currency: "IDR"
          })
            .then(result => {
               Transaksi.create({
                transaksi_id : result.external_id,
                va_nomor :result.account_number,
                keterangan : req.body.keterangan,
                id_donasi : parseInt(req.body.id_donasi),
                jumlah: parseInt(req.body.amount),
                users_id :parseInt(req.body.users_id),
                status : result.status,
              });
                return res.status(200).json({
                  message : "success",
                    data: result
                  })
            })
            .catch(e => {
              return res.status(500).json({message : "failed",data:`VA creation failed with message: ${e.message}`});
            });

     }

     static callbackvirtual = async (req,res)=>{
      const transaksi_id = req.body.external_id;
      const notification_options = {
        priority: "high",
        timeToLive: 60 * 60 * 24
      };
      const message_notification = {
        notification: {
           title: "Melontar Mobile",
           body: "Hallo Terimakasi Sudah Melakukan Melontar Semoga Lancar Terus Ya untuk Rizkiy nya"
               }
        };
    const options =  notification_options
   
 
      console.log(transaksi_id)
      // const status = req.body.status;
      Transaksi.findOne({ where: { transaksi_id: transaksi_id } }).then(transaksi => {
        Donasi.findOne({
          where:{
            id : transaksi.id_donasi
          }
        }).then(donasiresult=>{
          Donasi.update({
            jumlah_terkumpul : parseInt(donasiresult.jumlah_terkumpul) + parseInt(transaksi.jumlah)
          },{ 
            where: { id: transaksi.id_donasi },
          }).then(t=>{
            console.log(t)
          })
          console.log("success update tambah")
        }).catch(err=>{
         console.log(err)
        })
        User.findOne({where :{id : transaksi.users_id }}).then(user =>{
          
          admin.messaging().sendToDevice(user.fcm_token,message_notification, options).then( response => {

            console.log(response);
             
           })
           .catch( error => {
               console.log(error);
           });
         })
        if (transaksi) {
          Transaksi.update({
            status: "PAID"
          },{ 
            where: { transaksi_id: transaksi_id },
          })
          .then(value=> {
            console.log(value)
            return res.status(200).json({
              "message": `update success${value}`
            })
          }).catch(function(err) { 
            return res.status(200).json({
              "message": "update failled",err
            })
        });
        }
      });



     }



     static callbackvirtualexp = async (req,res)=>{

      const transaksi_id = req.body.external_id;
      // const status = req.body.status;

      Transaksi.findOne({ where: { transaksi_id: transaksi_id } }).then(transaksi => {
        if (transaksi) {
          Transaksi.update({
            status: "CANCELED"
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