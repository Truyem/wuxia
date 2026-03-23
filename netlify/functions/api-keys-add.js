const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event, context) => {
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, headers, body: 'Method Not Allowed' };
    }

    try {
        const keys = JSON.parse(event.body);
        if (!Array.isArray(keys)) {
            return { statusCode: 400, headers, body: JSON.stringify({ error: 'Array required' }) };
        }

        const nNodes = keys.filter(k => k.urls?.nemotron).map(k => ({ url: k.urls.nemotron, status: 'active' }));
        const iNodes = keys.filter(k => k.urls?.image_gen).map(k => ({ url: k.urls.image_gen, status: 'active' }));

        if (nNodes.length > 0) await supabase.from('nemotron_nodes').upsert(nNodes, { onConflict: 'url' });
        if (iNodes.length > 0) await supabase.from('image_gen_nodes').upsert(iNodes, { onConflict: 'url' });

        return {
            statusCode: 200,
            headers: { ...headers, 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: 'Success', nemotron: nNodes.length, image_gen: iNodes.length })
        };
    } catch (err) {
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({ error: err.message })
        };
    }
};
