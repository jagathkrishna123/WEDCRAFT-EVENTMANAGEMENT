import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/user/userSchema.js';
import Provider from './models/provider/providerSchema.js';

dotenv.config();

const checkIds = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected to MongoDB');

        const customerIds = ['69a66d1233eb3bca638413ec', '69894e772f3d611894a4c688'];

        for (const id of customerIds) {
            const user = await User.findById(id);
            const provider = await Provider.findById(id);
            console.log(`ID: ${id}`);
            console.log(`  User: ${user ? user.email : 'Not Found'}`);
            console.log(`  Provider: ${provider ? provider.email : 'Not Found'}`);
        }

        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

checkIds();
