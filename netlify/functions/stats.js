const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { data: nAll } = await supabase.from('nemotron_nodes').select('status');
        const { data: iAll } = await supabase.from('image_gen_nodes').select('status');

        const countStatus = (list) => ({
            active: list ? list.filter(n => n.status === 'active').length : 0,
            dead: list ? list.filter(n => n.status === 'dead').length : 0,
            total: list ? list.length : 0
        });

        return {
            statusCode: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nemotron: countStatus(nAll),
                image_gen: countStatus(iAll)
            })
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: err.message })
        };
    }
};
