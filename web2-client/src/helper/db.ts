import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Create User Function or check if exists
export async function createUserIfNotExists(name: string, type: string, address: string[]) {
  try {
    const promises = address.map(async (id) => {
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { id: Number(id) },
      });

      if (!existingUser) {
        // User does not exist, create a new user with this id
        const newUser = await prisma.user.create({
          data: {
            id: Number(id), // Assuming the `id` in the model is of type Int, you need to convert string to number
            name,
            type,
            address,
          },
        });
        console.log(`User with ID ${id} created:`, newUser);
        return newUser;
      } else {
        console.log(`User with ID ${id} already exists, skipping creation.`);
        return existingUser;
      }
    });

    // Wait for all the promises to resolve
    const result = await Promise.all(promises);
    return result;
  } catch (error) {
    console.error('Error creating or checking users:', error);
    throw error;
  }
}
