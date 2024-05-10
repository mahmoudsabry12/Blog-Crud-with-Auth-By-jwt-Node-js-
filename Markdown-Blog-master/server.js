const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const { swaggerUi, specs } = require('./Swagger');

const cors = require("cors")
const jwt = require("jsonwebtoken")
const cookieParser = require("cookie-parser")
const StudentModel = require('./models/Student')

// const authRoutes = require('./routes/authRoutes'); Import authRoutes

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors(
    {
        origin: 'http://127.0.0.1:5173',
        credentials: true,
        
}
))


mongoose.connect('mongodb://localhost/blog', {
  useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true
})
// mongoose.connect('mongodb://localhost:27017/collage')

app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(methodOverride('_method'))

app.get('/', async (req, res) => {
  const articles = await Article.find().sort({ createdAt: 'desc' })
  res.render('articles/index', { articles: articles })
})

app.use('/articles', articleRouter)

//Swagger 
// Serve Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

//app.use(authRoutes);  Use the routes

app.post('/register', (req, res) => {
  const {name, email, password} = req.body;
  StudentModel.create({name, email, password})
  .then(user => res.json(user))
  .catch(err => res.json(err))
})

app.post('/login', (req, res) => {
  const {email, password} = req.body;
  StudentModel.findOne({email})
  .then(user => {
      if(user ) {
          if(user.password === password) {
              const accessToken = jwt.sign({email: email}, 
                  "jwt-access-token-secret-key", {expiresIn: '1m'})
              const refreshToken = jwt.sign({email: email}, 
                  "jwt-refresh-token-secret-key", {expiresIn: '5m'})

              res.cookie('accessToken', accessToken, {maxAge: 60000})

              res.cookie('refreshToken', refreshToken, 
                  // {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'strict'})
                  {maxAge: 300000, httpOnly: true, secure: true, sameSite: 'None'})
              return res.json({Login: true})
          }
      } else {
          res.json({Login: false, Message: "no record"})
      }
  }).catch(err => res.json(err))
})
const varifyUser = (req, res, next) => {
  const accesstoken = req.cookies.accessToken;
  if(!accesstoken) {
      if(renewToken(req, res)) {
          next()
      }
  } else {
      jwt.verify(accesstoken, 'jwt-access-token-secret-key', (err ,decoded) => {
          if(err) {
              return res.json({valid: false, message: "Invalid Token"})
          } else {
              req.email = decoded.email
              next()
          }
      })
  }
}

const renewToken = (req, res) => {
  const refreshtoken = req.cookies.refreshToken;
  console.log(refreshtoken)
  let exist = true;
  if(!refreshtoken) {
      return res.json({valid: false, message: "No Refresh token"})
  } else {
      jwt.verify(refreshtoken, 'jwt-refresh-token-secret-key', (err ,decoded) => {
          if(err) {
              return res.json({valid: false, message: "Invalid Refresh Token"})
          } else {
              const accessToken = jwt.sign({email: decoded.email}, 
                  "jwt-access-token-secret-key", {expiresIn: '1m'})
              res.cookie('accessToken', accessToken, {maxAge: 60000})
              exist = true;
          }
      })
  }
  return exist;
}

app.get('/dashboard',varifyUser, (req, res) => {
  return res.json({valid: true, message: "authorized"})
})






app.listen(3001)