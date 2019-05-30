import { MongoError } from 'mongodb';

export default function  evaluateMongoError(
    error: MongoError,
    properties: Array<{ id: string , name: string }> ,
  ): Error {
    if (error.code === 11000) {
        for (const pro of properties) {
            if (
                error.message
                  .toLowerCase()
                  .includes(pro.name.toLowerCase())
              ) {
                throw new Error(
                  `${pro.id} ${pro.name} is already registered`,
                );
              }
        }

    }
    throw new Error(error.message);
  }
