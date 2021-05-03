const core = require('@actions/core')
const axios = require('axios')

try{
    const slackWebhook = core.getInput('SLACK_WEBHOOK');
    const title = core.getInput('TITLE');
    const body = JSON.parse(core.getInput('BODY'));
    const headers = {
        headers: {
            'content-type': 'application/json'
        }
    }

    if(!slackWebhook || !body){
        throw new Error('Webhook and Body must be present')
    }

    axios.post('https://75e236b85e39.ngrok.io/sendMessage',{slackWebhook,title,body}, headers).then(res => {
        console.log(`Status: ${res.status}`)
        console.log(res.data)
    }).catch(e => {throw new Error(e)});
} catch(e) {
    console.log(e)
    core.setFailed(e.message);
}
