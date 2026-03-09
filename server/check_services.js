import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Auditorium from './models/Services/AuditoriumSchema.js';
import Catering from './models/Services/Catering&FoodsSchema.js';

dotenv.config();

const checkServices = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const auditoriums = await Auditorium.find({}, 'auditoriumName providerId');
        console.log('Auditoriums:', auditoriums.map(a => ({ name: a.auditoriumName, hasProvider: !!a.providerId })));

        const caterings = await Catering.find({}, 'companyName providerId');
        console.log('Caterings:', caterings.map(c => ({ name: c.companyName, hasProvider: !!c.providerId })));

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

checkServices();
