import 'dotenv/config'; 
import { Pool } from 'pg';


const pool = new Pool({
  user: process.env.PGUSER,          
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,      
  password: process.env.PGPASSWORD,
  port: 5432
});


export default pool;