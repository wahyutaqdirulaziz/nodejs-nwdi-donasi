const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { User, UserDetail, Role } = require('../models');


class userControllers {
    static register = async(req, res) => {
        const {
            name,
            email,
            password,
        } = req.body;

        let newPassword = password;
        if (password !== undefined) {
            newPassword = await bcrypt.hash(password, 10);
        }

        await User.create({
            name,
            email,
            password: newPassword,
            poto: "user.jpg",
            created_at: new Date()
        }).then(result => {
            let data = {
                id: result.id,
                name: result.name,
                email: result.email,
                created_at: result.created_at
            }
            Role.create({ model_id: result.id });
            UserDetail.create({
                alamat: "silahkan update alamat",
                nomor_handphone: "silahkan update nomor anda",
                users_id: result.id,
            }).then(function(result) {
                return res.status(200).json({
                    user: data
                })
            });;
        }).catch(error => {
            const err = error
            return res.status(400).json({
                status: 'error',
                message: err
            });
        });

    }

    static login = async(req, res) => {
        const {
            email,
            password
        } = req.body;

        await User.findOne({
            where: {
                email
            }
        }).then(async result => {
            //return console.log(result);
            if (result === null) {
                return res.status(404).json({
                    status: 'error',
                    message: 'User not found'
                })
            } else {


                const data = {
                    id: result.id,
                    name: result.name,
                    email: result.email,
                    password: result.password,
                }

                const users = {
                    id: result.id,
                    name: result.name,
                    email: result.email,

                }

                await bcrypt.compare(password, result.password.replace(/^\$2y(.+)$/i, '$2b$1'), async function(err, passed) {
                    if (passed) {
                        User.update({
                            fcm_token: req.body.fcm
                        }, {
                            where: { id: data.id },
                        })
                        let token = await jwt.sign(data, "nwdi");
                        return res.status(200).json({
                            users,
                            token
                        })
                    } else {
                        return res.status(401).json({
                            status: 'error',
                            message: 'password is wrong'
                        });
                    }
                })
            }
        }).catch(error => {
            return res.status(400).json({
                status: 'error',
                message: error.message
            })
        })
    }


    static getprofile = async(req, res) => {
        User.findOne({
            where: {
                id: req.user.id
            },
            include: [{
                model: UserDetail,
                attributes: ['alamat', 'nomor_handphone']
            }]
        }).then(profile => {
            return res.status(200).json({
                status: 'success',
                profile
            })
        }).catch(error => {
            return res.status(401).json({
                status: 'error',
                message: 'authentication failled'
            });
        });

    }


    static updateFotoprofile = async(req, res) => {
        const user = await User.findOne({
            where: {
                id: req.user.id
            }
        });

        if (user != null) {
            //file exists
            const filepath = `./public/profile/${user.poto}`;
            try {
                fs.unlinkSync(filepath);
            } catch (error) {

            }

        }


        const file = req.files.file;
        const fileSize = file.data.length;
        const ext = path.extname(file.name);
        const fileName = file.md5 + ext;
        // const url = `${req.protocol}://${req.get("host")}/profile/${fileName}`;
        const allowedType = ['.png', '.jpg', '.jpeg'];
        if (!allowedType.includes(ext.toLowerCase())) return res.status(422).json({ msg: "Invalid Images" });
        if (fileSize > 5000000) return res.status(422).json({ msg: "Image must be less than 5 MB" });
        file.mv(`./public/profile/${fileName}`, async(err) => {
            if (err) return res.status(500).json({ msg: err.message });
            try {
                await User.update({
                    poto: fileName,
                }, {
                    where: {
                        id: req.user.id
                    },
                });
                res.status(200).json({
                    status: "success",
                    msg: "Profile update Successfuly"
                });
            } catch (error) {
                console.log(error.message);
            }
        })

    }


    static updateprofile = async(req, res) => {
        UserDetail.update({
            alamat: req.body.alamat,
            nomor_handphone: req.body.nomor_handphone,
        }, {
            where: { users_id: req.user.id },
        }).then(function(result) {
            return res.status(200).json({
                status: 'success',
                message: 'update success !'
            })
        });

    }

    static updatepassword = async(req, res) => {
        User.update({
            password: req.body.password,
        }, {
            where: { id: req.user.id },
        }).then(function(result) {
            return res.status(200).json({
                status: 'success',
                message: 'password updated success !'
            })
        });

    }

}

module.exports = userControllers;