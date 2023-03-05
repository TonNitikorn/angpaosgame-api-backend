const model = require('../../models/index');
const { v4: uuidv4 } = require('uuid');

//register
exports.register = async (data) => {

    //check username and password is null
    if (!data.game_name || !data.game_img || !data.game_type ) {
        const error = new Error("ข้อมูลไม่ถูกต้อง");
        error.statusCode = 401
        throw error;
    }

    // create agents
    const admin = await model.games.create({
        uuid: uuidv4(),
        game_name: data.game_name,
        game_img: data.game_img,
        game_type: data.game_type,
        game_status: 'ACTIVE',
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