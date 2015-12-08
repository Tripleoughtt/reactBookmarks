'use strict';
var express = require('express');
var router = express.Router();

router.get('/express', function(req, res, next) {
  res.render('index', { title: 'React' });
});

var links = [];

router.get('/api/links', function(req, res, next) {
   res.json({ links: links });
});
router.post('/api/links/delete', (req, res, next) => {
  links = links.filter( link => {return link.id !== Number(req.body.id)})
  res.send(links);
})
router.post('/api/links/like', (req, res, next) => {
  console.log('in router', req.ip);
  let id = Number(req.body.id)
  let ip = req.ip;
  let foundLink = links.filter( link => {
    return link.id === id
  });
  if (!foundLink[0].likes){
    foundLink[0].likes = [ip]
  } else {
      if(foundLink[0].likes.indexOf(ip) > -1){
        console.log('IN THE REMOVE LIKE')
        var deleteI = foundLink[0].likes.indexOf(ip);
        foundLink[0].likes.splice(deleteI, 1);
      } else {
        foundLink[0].likes.push(ip)
      }
  }
  links = links.map(link => {
    if (link.id === foundLink[0].id){
      console.log(link.likes)
      return foundLink[0];
    } else {
      return link
    }
  })
  console.log(links)
  res.send(links)
})

router.post('/api/links', function(req, res, next) {
  console.log('recived link', req.body)
   var newLink = req.body;
   newLink.id = Date.now();
   links.push(newLink);
   res.json(newLink);
});

module.exports = router;
