const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://pcigmkeaqvtelwshdekl.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjaWdta2VhcXZ0ZWx3c2hkZWtsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODE0OTgzMDIsImV4cCI6MTk5NzA3NDMwMn0.ESE75Xz5PT6Giq13PT_rIc9kNYZ8DYRWsdkgqjjWDac';

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;