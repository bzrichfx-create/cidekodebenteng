import { createClient } from '@supabase/supabase-js';


// Initialize database client
const supabaseUrl = 'https://wodbxlfnlmjhlojzbttv.databasepad.com';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImEwNzdjZDBmLTM5NGYtNDE5OC05ODNmLWJjNDJkNDhjOWFiYiJ9.eyJwcm9qZWN0SWQiOiJ3b2RieGxmbmxtamhsb2p6YnR0diIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzgwOTk1MzU1LCJleHAiOjIwOTYzNTUzNTUsImlzcyI6ImZhbW91cy5kYXRhYmFzZXBhZCIsImF1ZCI6ImZhbW91cy5jbGllbnRzIn0.yb4rgR3rUHgrSo1zKnwOEdLYMPqt6yfCCl7ftAY8kxI';
const supabase = createClient(supabaseUrl, supabaseKey);


export { supabase };