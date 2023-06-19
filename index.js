const express=require("express")
const uuid=require("uuid")

const port=3000
const app=express()
app.use(express.json())

const users=[]

const checkUserId=(request,response,next) => {
   const {id}= request.params
   const userIndex=users.findIndex(user => user.id === id)

   if(userIndex < 0) return response.status(404).json({error:"User Not Found"})

   request.userIndex=userIndex
   request.id=id

   next()

}

app.get("/users",(request,response) => {
    console.log("A rota foi chamada ")
    return response.json(users)
})


app.post("/users",(request,response) => {
    const {name,age}=request.body

    const newUser={id:uuid.v4(),name,age}

    users.push(newUser)
    return response.status(201).json(newUser)
})

app.put("/users/:id",checkUserId,(request,response) => {
    const id=request.id
    const {name,age} =request.body
    const updateUser=request.userIndex

    const updateUsers={id,name,age}
      
    
    users[updateUser] = updateUsers

    return response.json(updateUsers)
    
})

app.delete("/users/:id",checkUserId,(request,response) => {
    const index=request.userIndex

    users.splice(index,1)

    return response.status(204).json()
})



















app.listen(port,()=> {
    console.log("Servidor rodando")
})
