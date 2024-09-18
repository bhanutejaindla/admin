import bcrypt from 'bcryptjs';

const password = 'Basara@2020';  // Replace with the password you want to hash

// Hash the password
bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
        console.error('Error hashing password:', err);
        return;
    }

    console.log('Hashed Password:', hashedPassword);
});
