const Router = require('express').Router()
const { index, update, store, destroy } = require('./controller')
const InvoiceValidation = require('./validation')

Router.get('/', index)
Router.post('/', InvoiceValidation, store)
Router.put('/:id', update)
Router.delete('/:id', destroy)

module.exports = Router