import dotenv from 'dotenv';
import { fileURLToPath } from 'node:url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔍 ENVIRONMENT DEBUG SCRIPT');
console.log('='.repeat(50));

// Check current directory
console.log('📁 Current directory:', __dirname);

// Check if .env exists in different locations
const possibleEnvPaths = [
  path.resolve(__dirname, '.env'),
  path.resolve(__dirname, '../.env'),
  path.resolve(process.cwd(), '.env'),
  path.resolve(process.cwd(), 'server/.env')
];

console.log('\n📋 Checking for .env file in possible locations:');
possibleEnvPaths.forEach((envPath, index) => {
  const exists = fs.existsSync(envPath);
  console.log(`${index + 1}. ${envPath} - ${exists ? '✅ EXISTS' : '❌ NOT FOUND'}`);
  
  if (exists) {
    try {
      const content = fs.readFileSync(envPath, 'utf8');
      const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));
      console.log(`   📄 Content preview (${lines.length} variables):`);
      lines.slice(0, 5).forEach(line => {
        const [key] = line.split('=');
        console.log(`   - ${key}`);
      });
      if (lines.length > 5) {
        console.log(`   ... and ${lines.length - 5} more`);
      }
    } catch (err) {
      console.log(`   ❌ Error reading file: ${err.message}`);
    }
  }
});

// Try loading dotenv from the first existing path
const existingEnvPath = possibleEnvPaths.find(path => fs.existsSync(path));

if (existingEnvPath) {
  console.log(`\n🔧 Loading dotenv from: ${existingEnvPath}`);
  const result = dotenv.config({ path: existingEnvPath });
  
  if (result.error) {
    console.log('❌ Dotenv error:', result.error);
  } else {
    console.log('✅ Dotenv loaded successfully');
  }
} else {
  console.log('\n❌ No .env file found in any expected location!');
  console.log('\n📝 Please create a .env file in one of these locations:');
  console.log(`   - ${path.resolve(__dirname, '.env')} (recommended)`);
  console.log(`   - ${path.resolve(__dirname, '../.env')}`);
}

// Check environment variables
console.log('\n🌍 Environment Variables Check:');
console.log('NODE_ENV:', process.env.NODE_ENV || 'undefined');
console.log('CLOUDINARY_CLOUD_NAME:', process.env.CLOUDINARY_CLOUD_NAME || 'undefined');
console.log('CLOUDINARY_API_KEY:', process.env.CLOUDINARY_API_KEY || 'undefined');
console.log('CLOUDINARY_API_SECRET:', process.env.CLOUDINARY_API_SECRET || 'undefined');

// List all environment variables that contain 'CLOUDINARY'
const cloudinaryVars = Object.keys(process.env).filter(key => 
  key.toUpperCase().includes('CLOUDINARY')
);

console.log('\n☁️  All Cloudinary-related environment variables:');
if (cloudinaryVars.length === 0) {
  console.log('   ❌ No Cloudinary variables found');
} else {
  cloudinaryVars.forEach(key => {
    console.log(`   - ${key}: ${process.env[key] ? '✅ Set' : '❌ Empty'}`);
  });
}

console.log('\n' + '='.repeat(50));
console.log('🏁 Debug complete');