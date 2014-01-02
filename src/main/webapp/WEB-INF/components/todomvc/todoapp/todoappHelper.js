({
  updateCounts: function(component, todos) {
    var remainingCount = 0;
    var todo = null;
    for (var id in todos) {
      todo = todos[id];
      remainingCount += !(todo.completed) ? 1 : 0;
    }
    component.setValue("v.remainingCount", remainingCount);
  },
  
  updateItems: function(component, todos) {
    var items = component.getValue("m.todos");
    items.clear();
    
    var todo = null;
    for (var id in todos) {
      todo = todos[id];
      items.push(todo);
    }
  },
  
  loadTodos: function(component) {
    var storage = window.localStorage;
    var todos = storage.getItem("todos");

    if (todos) {
      todos = JSON.parse(todos);
    } else {
      todos = {};
      storage.setItem("todos", JSON.stringify(todos));
    }
    
    this.updateCounts(component, todos);
    
    return todos;
  },
  
  saveTodos: function(component, todos) {
    var storage = window.localStorage;
    storage.setItem("todos", JSON.stringify(todos));
    this.updateItems(component, todos);
    this.updateCounts(component, todos);
  },
  
  updateTodo: function(component, todo, helper) {
    var todos = this.loadTodos(component);
    todos["" + todo.id] = todo;
    this.saveTodos(component, todos);
  },

  updateAll: function(component) {
    var todos = this.loadTodos(component);
    this.updateItems(component, todos);
    this.updateCounts(component, todos);
  },
  
  deleteTodo: function(component, todo, items) {
    var todos = this.loadTodos(component);
    delete todos["" + todo.id];
    
    this.saveTodos(component, todos);
  }  
});