exports.create = function (req,res, next) {
    var user = req.user;
    var text = req.body.text;
    var count = user.todos.push({
        text : text
    });
    var _id = user.todos[count-1]._id;
    user.save(function(err){
        if(err){
            return next(err);
        }
        res.json({todo: {text: text, _id: _id}});
        console.log(user);
    })
}

exports.index = function (req, res, next) {
    res.json({todos: req.user.todos});
}