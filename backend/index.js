const app = require('./src/app')
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server is listening at ${PORT}`));
