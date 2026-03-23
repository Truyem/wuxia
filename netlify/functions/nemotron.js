const { createClient } = require('@supabase/supabase-js');
const axios = require('axios');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);

exports.handler = async (event, context) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    };

    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    try {
        const { data: nodes, error } = await supabase
            .from('nemotron_nodes')
            .select('*')
            .eq('status', 'active');

        if (error || !nodes || nodes.length === 0) {
            return {
                statusCode: 503,
                headers,
                body: JSON.stringify({ error: 'No active Nemotron nodes' })
            };
        }

        // Simple random rotation (state is not preserved across serverless calls easily)
        const node = nodes[Math.floor(Math.random() * nodes.length)];

        const response = await axios({
            method: event.httpMethod,
            url: node.url,
            data: event.body ? JSON.parse(event.body) : undefined,
            params: event.queryStringParameters,
            headers: {
                ...event.headers,
                host: new URL(node.url).host,
                // Netlify doesn't allow some headers to be forwarded
                'connection': undefined,
                'content-length': undefined
            }
        });

        return {
            statusCode: response.status,
            headers: { ...headers, 'Content-Type': response.headers['content-type'] || 'application/json' },
            body: typeof response.data === 'string' ? response.data : JSON.stringify(response.data)
        };
    } catch (err) {
        console.error('Nemotron Error:', err.message);
        return {
            statusCode: err.response?.status || 500,
            headers,
            body: JSON.stringify({ error: err.message, detail: err.response?.data })
        };
    }
};
