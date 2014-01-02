({
  doInit: function(component, evt, helper) {
    var location = $A.historyService.get().token;
    location = location === "" ? "/" : location;
    $A.historyService.set(location);

    var items = component.getValue("m.todos");

    var todos = helper.loadTodos(component);
    var todo = null;
    for (var id in todos) {
      todo = todos[id];
      items.push(todo);
    }
  },

  handleLocationChangeEvent: function(component, evt, helper) {
    var attributes = component.getAttributes();
    attributes.setValue("location", evt.getParam("token"));
    helper.updateAll(component);
  },

  toggleAll: function(component, evt, helper) {
    var target = evt.getSource();
    var checked = target.getElement().checked;

    var items = component.getValue("m.todos");
    var todos = helper.loadTodos(component);
    var todo = null;
    for (var id in todos) {
      todo = todos[id];
      todo.completed = checked;     
    }
    
    helper.saveTodos(component, todos);
  },

  clearCompletedTodos: function(component, evt, helper) {
    var items = component.getValue("m.todos");
    var todos = helper.loadTodos(component);

    var todo = null;
    for (var id in todos) {
      todo = todos[id];
      if (todo.completed) {
        delete todos[id];
      }
    }
    
    helper.saveTodos(component, todos);
    helper.updateAll(component);
  },
  
  newTodo: function(component, evt, helper) {
    var target = evt.target;
    var value = target.value;

    var todo = {
      id: Date.now(),
      value: value,
      completed: false
    };

    helper.updateTodo(component, todo);
    
    target.value = "";
  },

  
  handleupdateTodoEvent: function(component, event, helper) {
    var params = event.getParams();
    helper.updateTodo(component, params);
  },

  handledeleteTodoEvent: function(component, event, helper) {
    var params = event.getParams();
    var items = component.getValue("m.todos");
    helper.deleteTodo(component, params, items);
  }
});