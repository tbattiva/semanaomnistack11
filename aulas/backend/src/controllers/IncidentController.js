const connection = require('../database/connection');
const crypto = require('crypto');

module.exports = {
    async index(request, response) {
        const {page = 1} = request.query;
        
        const [count] = await connection('incidents').count();
        
        const limit = 2;
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(limit)
            .offset((page - 1) * limit)
            .select([
                'incidents.*', 
                'ongs.name',
                'ongs.city',
                'ongs.whatsapp',
                'ongs.uf',
                'ongs.email'
            ]);

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
    async create(request, response) {
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first();

        if (incident && incident.ong_id != ong_id){
            return response.status(401).json({error:'not authorized'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();
    },

    async delete2(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id).where('ong_id', ong_id)
            .first();

        if (incident){
            const isDeleted = await connection('incidents').where('id', id).delete();
            if (isDeleted) return response.status(200).json({msg:'deleted'});
        }

        return response.status(400).send();
    }
    
}