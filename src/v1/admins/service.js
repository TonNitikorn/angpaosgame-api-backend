const model = require('../../models/index');
const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');

//register
exports.register = async (data) => {

    //check username and password is null
    if (!data.username || !data.password || !data.prefix) {
        return res.status(400).json({
            message: 'ข้อมูลไม่ถูกต้อง'
        });
    }
    // check password by bcryptjs   
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(data.password, salt);

    // create member
    const admin = await model.admins.create({
        uuid: uuidv4(),
        username: data.username,
        prefix: data.prefix,
        password: hashPassword,
        create_at: new Date(),
    }, {
        attributes: { exclude: ['id', 'update_at', 'password'] }
    }
    );

    //log action
    //   await model.log_actions.create({
    //       uuid: uuidv4(),
    //       admins_uuid: req_admin.uuid,
    //       actions: 'register',
    //       description: data,
    //       create_at: new Date(),
    //   });

    const token = jwt.sign({ uuid: admin.uuid, }, config.JWT_KEY, { expiresIn: config.JWT_EXP });
    return { admin }
};

//get admin list
exports.getAdminList = async (data) => {
    const admin = await model.admins.findAll({
        attributes: { exclude: ['id', 'update_at', 'password'] }
    });
    return { admin }
}

//edit admin by uuid
exports.editAdmin = async (data) => {
    const admin = await model.admins.findOne({
        where: {
            uuid: data.uuid
        },
        attributes: { exclude: ['id', 'update_at', 'password'] }
    });

    //update admin
    const update_admin = await model.admins.update({
        prefix: data.prefix,
        update_at: new Date(),
    }, {
        where: {
            uuid: data.uuid
        }
    });


    return { admin }
}

//change status admin by uuid
exports.changeStatus = async (data) => {

    //update admin
    const update_admin = await model.admins.update({
        status: data.status,
        update_at: new Date(),
    }, {
        where: {
            uuid: data.uuid
        }
    });

    return { update_admin }
}
