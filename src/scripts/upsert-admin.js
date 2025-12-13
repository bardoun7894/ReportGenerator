
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User Schema inline to avoid import issues
const userSchema = new mongoose.Schema({
          name: { type: String, required: true },
          email: { type: String, required: true, unique: true },
          password: { type: String, required: true },
          image: String,
          emailVerified: Date,
}, { timestamps: true });

// Try to get existing model or create new one
const User = mongoose.models.User || mongoose.model('User', userSchema);

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
                              console.log(`User ${email} found. Updating password...`);
                              existingUser.password = hashedPassword;
                              // If you had a role field, you'd set it here.
                              await existingUser.save();
                              console.log('User updated successfully.');
                    } else {
                              console.log(`User ${email} not found. Creating new user...`);
                              const newUser = new User({
                                        name: 'Admin User',
                                        email,
                                        password: hashedPassword,
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
