({
  doInit: function(component, evt, helper) {
    var attributes = component.getAttributes();
    var model = component.getModel();
    var todo = attributes.getRawValue("todo");

    model.each(function(key, value) {
      value.setValue(todo.getRawValue(key));
    });
  },
  
  edit: function(component, evt, helper) {
    var attributes = component.getAttributes();
    var mode = attributes.getRawValue("mode");
    attributes.setValue("mode", "edit");
    var editor = component.find("new-todo").getElement();

    // Wait and then set focus and move cursor to end
    setTimeout(function() {
      editor.focus();
      editor.selectionStart = editor.selectionEnd = editor.value.length;
    }, 100);
  },

  remove: function(component, evt, helper) {
    var model = component.getModel();
    var attributes = component.getAttributes();
    var deleteTodoEvent = $A.get("e.todomvc:deleteTodo");
    
    deleteTodoEvent.setParams({
      "id": model.value.id.getValue()
    });

    deleteTodoEvent.fire();    
  },

  update: function(component, evt, helper) {
    var attributes = component.getAttributes();
    var mode = attributes.getRawValue("mode");
    attributes.setValue("mode", "view");
    helper.save(component);
  },

  complete: function(component, evt, helper) {
    var model = component.getModel();
    var target = evt.getSource ? evt.getSource().getElement() : evt.target;
    var checked = target.checked;
    model.value.completed.setValue(checked);
    helper.save(component);
  }
});