const express = require('express');
const connectDB = require('./config/db');
const cors = require("cors")
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger_output.json');
require('dotenv').config();

const app = express();

app.use(cors());
connectDB();

app.use(express.json({ extended: false }));

// Serve Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Your existing routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/page', require('./routes/pageRoutes'));
app.use('/api/text-block', require('./routes/components/textBlockRoutes'));
app.use('/api/image-block', require('./routes/components/imageRoutes'));
app.use('/api/cat-button', require('./routes/components/ctaButtonRoutes'));
app.use('/api/carousel', require('./routes/components/carouselRoutes'));
app.use('/api/analytics', require('./routes/analyticsEventRoutes'));
app.use('/api/email', require('./routes/emailRoutes'));
app.use('/api/video', require('./routes/videoRoutes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));