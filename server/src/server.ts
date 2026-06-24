import { app } from './app.ts';
import conf from './conf/conf.ts'
import connectDB from './db/index.ts'
import { initCronJobs } from './services/cron.service.ts'



const PORT = conf.port || 5000;

connectDB()
    .then(() => {
        const server = app.listen(PORT, () => {
            console.log(`SERVER IS RUNNING AT http://127.0.0.1:${PORT}`);
        });

        initCronJobs();

        server.on('error', (err) => {
            console.error('SERVER ERROR: ', err);
            process.exit(1);
        })
    })
    .catch((err) => {
        console.error(`MONGODB CONNECTION ERROR: ${err}`);
        process.exit(1);
    });