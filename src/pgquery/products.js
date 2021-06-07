//Postgres connection
import pg from 'pg';
const {Pool,Client} = pg;
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'mydatabase',
    password: 'pass',
    port: 5432,
  })

pool.connect(err=>{
    if(err){
        console.log('...Pgsql not connected')
    }else{
        console.log('...Pgsql connected')
    }
})  

export default pool;

