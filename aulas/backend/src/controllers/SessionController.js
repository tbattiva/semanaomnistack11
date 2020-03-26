const connection = require('../database/connection');

module.exports = {
    async create(request, response){
        const {id} = request.body;

        const ong = await connection('ongs').where('id', id).first().select("name");

        if (!ong) return response.status(404).send();

        return response.json(ong);
    }
}