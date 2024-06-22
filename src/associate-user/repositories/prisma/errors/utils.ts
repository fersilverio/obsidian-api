import { Prisma } from "@prisma/client";

export function sendPrismaErrorMessage(error: Prisma.PrismaClientKnownRequestError) {
    let message: string;

    switch (error.code) {
        case "P2002":
            message = `Unique constraint failed on the ${error.meta.target}`;
            break;
        case "P2011":
            message = `Null constraint violation on the ${error.meta.target}`;
            break;
    }

    return message;
}