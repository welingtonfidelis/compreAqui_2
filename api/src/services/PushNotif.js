const axios = require('axios');
const app_id = process.env.ONESIGNAL_APP_ID;
const api_key = process.env.ONESIGNAL_API_KEY;

module.exports = {
    async sendOnePush(playId, title = 'CompreAqui', msg = '') {   
        try {
            await axios.post('https://onesignal.com/api/v1/notifications', {
                'app_id': app_id,
                'include_player_ids': playId,
                'data': { "foo": "bar" },
                "headings": {"en": title},
                'contents': { "en": msg },
                "template_id": "fd0a1b83-2061-4c75-ab0b-a5436d69276e"
            });
            
        } catch (error) {
            console.warn(
                'ERRO NO ENVIO DE NOTIFICAÇÃO ÚNICA PUSH',
                (error.stack || error.message || error)
            );
        }
    },
    async sendAllPush(title = 'CompreAqui', msg, segments) {
        try {
            //ex.: Client, Comemrcial, Active Users, Inactive Users
            segments = segments !== undefined ? segments : ['Client'];
            
            await axios.post('https://onesignal.com/api/v1/notifications', {
                'app_id': app_id,
                "included_segments": segments,
                'data': { "foo": "bar" },
                "headings": {"en": title},
                'contents': { "en": msg },
                "template_id": "fd0a1b83-2061-4c75-ab0b-a5436d69276e"
            },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': api_key
                    }
                }
            );

        } catch (error) {
            console.warn(
                'ERRO NO ENVIO DE NOTIFICAÇÃO GERAL PUSH',
                (error.stack || error.message || error)
            );
        }
    },
}