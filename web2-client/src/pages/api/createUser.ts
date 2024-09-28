// pages/api/users.ts
import { PrismaClient } from '@prisma/client'; // Correct import statement
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient(); // Instantiate PrismaClient

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { name, type, addresses } = req.body;

    // Validate input
    if (!name || !type || !Array.isArray(addresses) || addresses.length === 0) {
      return res.status(400).json({ error: 'Invalid input data. Name, type, and addresses are required.' });
    }

    try {
      const promises = addresses.map(async (address: string) => {
        // Check if the address already exists
        const existingAddress = await prisma.address.findUnique({
          where: { value: address },
        });

        if (existingAddress) {
          console.log(`Address ${address} is already assigned to a user. Skipping creation for this address.`);
          return null; // Skip user creation for this address
        }

        // Check if the user already exists based on name and type
        const existingUser = await prisma.user.findUnique({
          where: { name_type: { name, type } }, // Ensure you have a compound unique index in your Prisma schema
        });

        if (!existingUser) {
          // User does not exist, create a new user with this address
          const newUser = await prisma.user.create({
            data: {
              name,
              type,
              addresses: {
                create: [{ value: address }],
              },
            },
          });
          console.log(`User created with name ${name}:`, newUser);
          return newUser;
        } else {
          // User exists, add the new address to the user if it doesn't exist yet
          const newAddress = await prisma.address.create({
            data: {
              value: address,
              userId: existingUser.id,
            },
          });
          console.log(`Address ${address} added for user ${name}.`);
          return existingUser;
        }
      });

      // Wait for all promises to resolve
      const result = await Promise.all(promises);
      res.status(200).json(result.filter((res) => res !== null)); // Filter out nulls
    } catch (error) {
      console.error('Error creating or checking users:', error);
      res.status(500).json({ error: `Failed to create or check users: ${error.message}` });
    } finally {
      await prisma.$disconnect(); // Ensure Prisma Client is disconnected after requests
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
