// import { PrismaClient } from "@prisma/client";


const { PrismaClient } = require('@prisma/client');


const prisma = new PrismaClient()

// async function main() {

//     const users = await prisma.user.create({ data: { username: "Ayush", password: "Ayush1920" } })
//     console.log(users)

// }
async function main() {

    // const user = await prisma.profile.update({
    //     where: {
    //         clientUsername: "Ayush"
    //     },
    //     data: {
    //         clientUsername: "Ayush",
    //         // email: "smistry@cougarnet.uh.edu",
    //         fullName: "Ayush Patel",
    //         address1: "815 Starcross Bend Drive",
    //         // city: "Missouri City",
    //         // state: "Texas",
    //         // zipcode: "77459",

    //     }

    
        // Create a new user
        const newUser = await prisma.user.create({
          data: {
            username: 'Ayush',
            password: 'Ayush1920',
            // Add other fields as needed
          },
        });
    
        // Create a new profile for the user
        const newProfile = await prisma.profile.create({
          data: {
            clientUsername: newUser.username,
            firstName: 'Ayush',
            lastName: 'Patel',
            // Add other fields as needed
            address1:  '815 Starcross Bend Dr',
            address2: '',
            city: 'Missouri City',
            state: 'Texas',
            zipcode: '77459'
          },
        });
    
        // Create a new quote
        const newQuote = await prisma.quote.create({
          data: {
            clientUsername: newUser.username,
            gallons: 100,
            price: 200.50,
            address: '815 Starcross Bend Dr',
            city: 'Missouri City',
            state: 'Tx',
            zipcode: '77459',
            // Add other fields as needed
          },
        });
    
    
    // });
    // const updatedQuote = await prisma.quote.create({
    //     where: { clientUsername: user.clientUsername },
    //     update: {
    //         address: user.address1 || "",
    //         city: user.city || '',
    //         state: user.state || '',
    //         zipcode: user.zipcode || ''
    //         // Add other fields to copy from the profile as needed
    //     },
    //     data: {
    //         clientUsername: user.clientUsername,
    //         address: user.address1 || "",
    //         city: user.city || "",
    //         state: user.state || "",
    //         zipcode: user.zipcode || "",
    //         gallons: 10, // Provide default values or adjust as needed
    //         price: 15,   // Provide default values or adjust as needed
    //         due: 5     // Provide default values or adjust as needed
    //     }
    // });

    // const user = await prisma.user.findUnique({
    //     where: {
    //         username: "Ayush" // Replace "username_here" with the actual username
    //     }
    // });

    // if (!user) {
    //     console.error("User not found");
    //     return;
    // }

    // Create the second quote entry
    // const secondQuote = await prisma.quote.create({
    //     data: {
    //         clientUsername: user.username || '',
    //         gallons: 20, // Example value
    //         price: 30,   // Example value
    //         due: 10,     // Example value
    //         address: "3623 Lexington common", // Example value
    //         city: "Missouri City city",       // Example value
    //         state: "Texas",     // Example value
    //         zipcode: "12345"           // Example value
    //     }
    // });
    // // const user = await prisma.profile.findMany({})

    // console.log(secondQuote);

}

// async function fetchData() {
//     try {
//         // Fetch data from the database
//         const users = await prisma.user.findMany();
//         const profiles = await prisma.profile.findMany();
//         // const quotes = await prisma.quote.findMany();

//         // Do something with the fetched data
//         console.log("Users:", users);
//         console.log("Profiles:", profiles);
//         // console.log("Quotes:", quotes);
//     } catch (error) {
//         console.error("Error fetching data:", error);
//     } finally {
//         // Disconnect Prisma Client
//         await prisma.$disconnect();
//     }
// }


main()
    .catch(e => {
        console.error(e.message);
    })

    .finally(async () => {
        await prisma.$disconnect();
    });


// fetchData()



// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// async function createUser(username: string, password: string): Promise<void> {
//   try {
//     // Insert new user into the User table
//     await prisma.user.create({
//       data: {
//         username: username,
//         password: password,
//       },
//     });

//     console.log('User created successfully.');
//   } catch (error) {
//     console.error('Error creating user:', error);
//   } finally {
//     await prisma.$disconnect(); // Disconnect from the Prisma client
//   }
// }

// // Usage example
// createUser('ayush', 'password123');
