var app = require('connect')()
var serveStatic = require('serve-static')
var cors = require('cors')

app.use(cors())
app.use(serveStatic('public'))

console.log(' ➜   Open: http://localhost:7007')
app.listen(7007)
