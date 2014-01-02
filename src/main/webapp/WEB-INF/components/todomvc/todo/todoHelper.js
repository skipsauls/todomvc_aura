({
  save: function(component) {
    var updateTodoEvent = $A.get("e.todomvc:updateTodo");
    var model = component.getModel();
    mo = model;
    updateTodoEvent.setParams(model.unwrap());
    updateTodoEvent.fire();
  }
});