const bcrypt  = require('bcrypt');
const jwt     = require('jsonwebtoken');
const {User}  = require('../models');
const {
  JWT_SECRET_KEY
} = process.env;

class userControllers {
  static register = async (req, res) => {
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
      created_at : new Date()
    }).then(result => {
      let data = {
        id: result.id,
        name: result.name,
        email: result.email,
        created_at: result.created_at
      }
      return res.status(201).json({
        user: data
      })
    }).catch(error => {
      const err = error.errors
      const errorList = err.map(d => {
        let obj = {}
        obj[d.path] = d.message
        return obj;
      })
      return res.status(400).json({
        status: 'error',
        message: err
      });
    });

  }

  static login = async (req, res) => {
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

        await bcrypt.compare(password, result.password, async function (err, passed) {
          if (passed) {
            let token = await jwt.sign(data, JWT_SECRET_KEY, {
              expiresIn: '1h'
            });
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

 

 

 

}

module.exports = userControllers;