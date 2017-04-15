exports.create = function (req, res, next) {
    var user = req.user;
    var text = req.body.text;
    var count = user.todos.push({
        text: text
    });
    var _id = user.todos[count - 1]._id;
    user.save(function (err) {
        if (err) {
            return next(err);
        }
        res.json({todo: {text: text, _id: _id}});
        console.log(user);
    })
}

exports.index = function (req, res, next) {
    console.log(req.user.todos);
    res.json({todos: req.user.todos});
}

exports.destroy = function (req, res, next) {
    var user = req.user;
    var todo_id = req.params.todo_id;
    user.todos = user.todos.filter(function (todo) {
        if (todo._id == todo_id) {
            return false;
        }
        return true;
    });
    user.save(function(err){
        if(err){
            return next(err);
        }
        res.json({});
    });
}