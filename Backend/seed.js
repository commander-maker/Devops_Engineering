require('dotenv').config();
const mongoose = require('mongoose');
const Worker = require('./models/Worker');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://mongodb:27017/devops-db';

const sampleWorkers = [
  {
    name: 'John Smith',
    profession: 'Electrician',
    experience: 6,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400',
    available: true
  },
  {
    name: 'David Johnson',
    profession: 'Plumber',
    experience: 8,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    available: true
  },
  {
    name: 'Michael Brown',
    profession: 'Carpenter',
    experience: 10,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400',
    available: true
  },
  {
    name: 'Robert Wilson',
    profession: 'Mason',
    experience: 7,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400',
    available: true
  },
  {
    name: 'James Martinez',
    profession: 'Electrician',
    experience: 5,
    rating: 4,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
    available: false
  },
  {
    name: 'William Garcia',
    profession: 'Plumber',
    experience: 9,
    rating: 5,
    image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400',
    available: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing workers
    await Worker.deleteMany({});
    console.log('🗑️  Cleared existing workers');

    // Insert sample workers
    const workers = await Worker.insertMany(sampleWorkers);
    console.log(`✅ Added ${workers.length} sample workers to database`);

    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
