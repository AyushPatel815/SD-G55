// import { PrismaClient } from '@prisma/client'

// const prismaClientSingleton = async () => {
//   return new PrismaClient()
// }


// declare global {
//   var prisma: undefined | ReturnType<typeof prismaClientSingleton>
// }

// const prisma = globalThis.prisma ?? prismaClientSingleton()

// export default prisma

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma


import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

// declare global {
//   let prisma: ReturnType<typeof prismaClientSingleton>;
// }

let prismaInstance: ReturnType<typeof prismaClientSingleton> | undefined;

if (process.env.NODE_ENV !== 'production') {
  prismaInstance = prismaClientSingleton();
  // globalThis.prisma = prismaInstance;
} else {
  prismaInstance = undefined;
}

export default prismaInstance;
