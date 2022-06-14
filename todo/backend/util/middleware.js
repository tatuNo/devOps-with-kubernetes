const requestLogger = (req, res, next) => {
  console.log('Method:', req.method)
  console.log('Path:  ', req.path)
  console.log('Body:  ', req.body)
  console.log('---')
  next()
}

const errorHandler = (error, req, res, next) => {
  if(error.name === 'SequelizeValidationError') {
    return res.status(400).send({ error: error.message})
  }
  next(error)
}

module.exports = {
  requestLogger,
  errorHandler
}