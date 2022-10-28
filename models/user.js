module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Nama tidak boleh kosong'
                    }
                }
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: {
                        msg: 'Email tidak valid'
                    },
                    notNull: {
                        msg: 'Email tidak boleh kosong'
                    }
                },
                unique: {
                    msg: 'Email sudah digunakan'
                }
            },
            poto: {
                type: DataTypes.STRING,
                allowNull: true,

            },
            fcm_token: {
                type: DataTypes.STRING,
                allowNull: true,

            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {
                        msg: 'Password tidak boleh kosong'
                    },
                    min: 6,
                    max: 10
                }
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: new Date()
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: new Date()
            }

        },

        {
            tableName: 'users'
        })

    User.associate = models => {
        User.hasMany(models.Transaksi, {
            foreignKey: 'id'
        });
    }
    User.associate = models => {
        User.hasMany(models.UserDetail, {
            foreignKey: 'users_id'
        });
    }
    return User;
}