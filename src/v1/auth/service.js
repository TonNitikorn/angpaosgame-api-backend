const model = require('../../models/index');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');


// loginOTP

    exports.login = async (data) => {
        //check username and password is null
        if (!data.username || !data.password || !data.prefix) {
            const error = new Error("ข้อมูลไม่ถูกต้อง");
            error.statusCode = 401
            throw error;
        }

        const admin = await model.admins.findOne({
            where: {
                username: data.username
            }
        });

        if (!admin) {
            const error = new Error("Username หรือ Password ไม่ถูกต้อง");
            error.statusCode = 401
            throw error;
        }

        // check password by bcryptjs
        const isMatch = await bcrypt.compare(data.password, admin.password);
        if (!isMatch) {
            const error = new Error("รหัสผ่านไม่ถูกต้อง");
            error.statusCode = 401
            throw error;
        }

        // await model.log_actions.create({
        //     uuid: uuidv4(),
        //     admins_uuid: admin.uuid,
        //     actions: 'login',
        //     description: data,
        //     create_at: new Date(),
        // });

        const token = jwt.sign({ uuid: admin.uuid, }, config.JWT_KEY, { expiresIn: config.JWT_EXP });
        // const expiresin = jwt.decode(token).exp;

        return {
            access_token: token,
            token_type: "Bearer"
        }
    };



