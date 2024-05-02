const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
})

module.exports =mongoose.model('StudentModel',StudentSchema)
// export default  StudentModel