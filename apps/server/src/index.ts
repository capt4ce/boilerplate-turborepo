// import { AppDataSource } from "./data-source"
// import { User } from "./entity/User"

// AppDataSource.initialize().then(async () => {

//     console.log("Inserting a new user into the database...")
//     const user = new User()
//     user.firstName = "Timber"
//     user.lastName = "Saw"
//     user.age = 25
//     await AppDataSource.manager.save(user)
//     console.log("Saved a new user with id: " + user.id)

//     console.log("Loading users from the database...")
//     const users = await AppDataSource.manager.find(User)
//     console.log("Loaded users: ", users)

//     console.log("Here you can setup and run express / fastify / any other framework.")

// }).catch(error => console.log(error))

import FastifyServer from './dependencies/http-server/fastify'
import { AppDataSource } from "./dependencies/database/typeorm/data-source"

AppDataSource.initialize()

const server = new FastifyServer()
server.addRoute('GET', '/', async (_request, response)=> {
    const result = await new Promise((resolve)=> {
        setTimeout(()=> {
            resolve({ hello: 'world aaa' })
        }, 3000)
    })
    return result
})
server.setup()
server.start()