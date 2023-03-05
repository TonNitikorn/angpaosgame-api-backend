const model = require('../../models/index');
const { v4: uuidv4 } = require('uuid');

//register
exports.register = async (data) => {

    //check username and password is null
    if (!data.currency || !data.prefix || !data.secret_key || !data.ip) {
        const error = new Error("ข้อมูลไม่ถูกต้อง");
        error.statusCode = 401
        throw error;
    }

    // create agents
    const admin = await model.agents.create({
        uuid: uuidv4(),
        prefix: data.prefix,
        secret_key: data.secret_key,
        ip: data.ip,
        status: 'ACTIVE',
        currency: data.currency,
        create_at: new Date(),
    }, {
        attributes: { exclude: ['id', 'update_at',] }
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

    return admin
};