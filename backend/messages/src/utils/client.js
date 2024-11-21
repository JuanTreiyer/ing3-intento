const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.NEXT_PUBLIC_SUPABASE_SERVICE_ROLE;

function createAdminClient() {
  if (!supabaseUrl || !serviceKey) {
    throw new Error('No SUPABASE_URL or SUPABASE_SERVICE_KEY provided');
  }
  return createClient(supabaseUrl, serviceKey);
}

module.exports = { createAdminClient };
