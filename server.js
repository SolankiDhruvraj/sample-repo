import express from "express"

const app = express()

app.get("/", (req, res) => {
    res.status(200).json({ message: "Hello" })
})
app.listen(4001,()=>{
    console.log("Server lsitening")
})