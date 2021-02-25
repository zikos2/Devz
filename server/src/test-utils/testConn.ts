import { createConnection } from "typeorm"


export const testConn = (drop: boolean = false) => {
    return createConnection({
        name: "default",
        type: "sqlite",
        database: "test-database.sqlite",
        synchronize: drop,
        dropSchema: drop,
        entities: [__dirname + "/../entity/*.ts"],
        migrations: ["../migration/**/*.ts"],
        subscribers: ["../subscriber/**/*.ts"],
        cli: {
            entitiesDir: "../entity",
            migrationsDir: "../migration",
            subscribersDir: "../subscriber"
        }
    })
}
