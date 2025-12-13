import mongoose, { Schema, model, models } from 'mongoose';

const UserSchema = new Schema({
          name: {
                    type: String,
                    required: [true, 'Please provide a name'],
                    maxlength: [60, 'Name cannot be more than 60 characters'],
          },
          email: {
                    type: String,
                    required: [true, 'Please provide an email'],
                    unique: true,
                    maxlength: [100, 'Email cannot be more than 100 characters'],
          },
          password: {
                    type: String,
                    required: [true, 'Please provide a password'],
          },
          role: {
                    type: String,
                    enum: ['user', 'admin'],
                    default: 'user',
          },
          createdAt: {
                    type: Date,
                    default: Date.now,
          },
});

const User = models.User || model('User', UserSchema);

export default User;
