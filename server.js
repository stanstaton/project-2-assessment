const express = require('express');
const methodOverride = require('method-override');
const db = require('./models')

const app = express();

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));
app.use(express.static('static'));
app.use(methodOverride('_method'));

// WRITE YOUR ROUTES HERE /////////////////////
app.get('/', (req,res) => {
    db.widget.findAll()
    .then(widgets => {
        res.render('index', {widgets});
    })
    .catch(err => {
        console.log(err)
        res.send('something went wrong')
    })
    
})

app.post('/', (req,res) => {
    db.widget.create(req.body)
    .then(() =>{
		res.redirect('/')
	})
	.catch(err => {
		console.log('something went wrong')
		res.send('something went wrong')
	})
})

app.delete('/', (req,res) => {
    db.widget.destroy({
        where: {id: req.body.id}
    })
    .then(() => {
        res.redirect('/')
    })
    .catch(err => {
        console.log(err)
        res.send('something went wrong')
    })
})


// YOUR ROUTES ABOVE THIS COMMENT /////////////

app.listen(process.env.PORT || 3000);
