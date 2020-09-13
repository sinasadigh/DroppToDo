const controller = require("../controller");
const ToDo = require("../../models/todo");

class todoController extends controller {
  async get_user_todo(req, res, next) {
    let querySort = req.query.sortItem;
    let sortobj;
    let findobj = [{ user: req.user._id }];
    if (querySort) {
      if (querySort === "priority") sortobj = { priority: 1 };
      if (querySort === "priorityDesc") sortobj = { priority: -1 };
      if (querySort === "date") sortobj = { date: 1 };
      if (querySort === "dateDesc") sortobj = { date: -1 };
    } else {
      sortobj = { date: -1 };
    }
    if (req.query.date) {
      findobj.push({ date: req.query.date });
    }
    if (req.query.priority) {
      findobj.push({ priority: req.query.priority });
    }
    if (req.query.status) {
      findobj.push({ status: req.query.status });
    }
    const todoList = await ToDo.find().and(findobj).sort(sortobj);
    if (!todoList) return res.status(404).send("متاسفانه رکوردی پیدا نشد.");
    return res.send(todoList);
  }
  async createTodo(req, res, next) {
    let result = await this.validationData(req);

    if (result.status) {
      var d = new Date(req.body.date);

      let todo = new ToDo({
        title: req.body.title,
        description: req.body.description,
        date: d.toISOString(),
        priority: req.body.priority,
        status: req.body.status,
        user: req.user._id,
      });
      todo = await todo.save();
      return res.send(todo);
    }
    return res.json({ message: result.message });
  }
  async updateStatus(req, res, next) {
    let todo = await ToDo.findByIdAndUpdate(req.params.id, {
      status: req.body.status,
    });
    if (!todo) return res.status(404).send("متاسفانه آیتم پیدا نشد.");
    res.send(todo);
  }
}
module.exports = new todoController();
