import mongoose, { Schema, model, models, Types } from 'mongoose';

const ReportSchema = new Schema({
          title: {
                    type: String,
                    required: [true, 'Please provide a title'],
                    maxlength: [200, 'Title cannot be more than 200 characters'],
          },
          type: {
                    type: String,
                    required: true,
          },
          userId: {
                    type: Types.ObjectId,
                    ref: 'User',
          },
          // Guest tracking info
          guestInfo: {
                    ip: String,
                    city: String,
                    country: String,
                    countryCode: String,
                    region: String,
                    timezone: String,
                    isp: String,
                    mobile: Boolean,
                    proxy: Boolean,
                    lat: Number,
                    lon: Number,
          },
          template: {
                    type: String,
          },
          status: {
                    type: String,
                    enum: ['draft', 'completed'],
                    default: 'completed',
          },
          data: {
                    type: Schema.Types.Mixed,
          },
          createdAt: {
                    type: Date,
                    default: Date.now,
          },
          updatedAt: {
                    type: Date,
                    default: Date.now,
          },
});

const Report = models.Report || model('Report', ReportSchema);

export default Report;
