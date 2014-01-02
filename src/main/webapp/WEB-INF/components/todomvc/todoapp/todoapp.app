<aura:application template="todomvc:template" useAppCache="false">
  <aura:handler name="init" value="{!this}" action="{!c.doInit}" />
  <aura:handler event="aura:locationChange" action="{!c.handleLocationChangeEvent}" />
  <aura:handler event="todomvc:updateTodo" action="{!c.handleupdateTodoEvent}" />
  <aura:handler event="todomvc:deleteTodo" action="{!c.handledeleteTodoEvent}" />
  <aura:attribute name="remainingCount" type="Long" default="0" />
  <aura:attribute name="location" type="String" default="/" />

  <section id="todoapp">
    <header id="header">
      <h1>todos</h1>
      <input aura:id="new-todo" id="new-todo" value="" onchange="{!c.newTodo}" placeholder="What needs to be done?" />
    </header>
    <section id="main">
      <aura:renderIf isTrue="{!m.todos.length > 0}">
        <ui:inputCheckbox class="toggle-all" value="{!and(v.remainingCount == 0, m.todos.length > 0)}" change="{!c.toggleAll}" />
      </aura:renderIf>
      <label for="toggle-all">Mark all as complete</label>
      <ul aura:id="todo-list" id="todo-list">
        <aura:iteration items="{!m.todos}" var="todo" indexVar="index">
          <aura:renderIf
            isTrue="{!or(v.location == '/', or(and(v.location == '/active', todo.completed == false), or(and(v.location == '/completed', todo.completed == true))))}">
            <todomvc:todo aura:id="{!'todo_' + todo.id}" todo="{!todo}" />
          </aura:renderIf>
        </aura:iteration>
      </ul>

    </section>

    <aura:renderIf isTrue="{!m.todos.length > 0}">
      <footer id="footer">
        <span id="todo-count">
          <strong>{!v.remainingCount}</strong>
          {!v.remainingCount != 1 ? ' items' : ' item'} left
        </span>
        <ul id="filters">
          <li>
            <a class="{!v.location == '/' ? 'selected' : ''}" href="#/">All</a>
          </li>
          <li>
            <a class="{!v.location == '/active' ? 'selected' : ''}" href="#/active">Active
            </a>
          </li>
          <li>
            <a class="{!v.location == '/completed' ? 'selected' : ''}" href="#/completed">Completed
            </a>
          </li>
        </ul>
        <aura:renderIf isTrue="{!(m.todos.length - v.remainingCount) > 0}">
          <button id="clear-completed" onclick="{!c.clearCompletedTodos}">Clear completed ({!m.todos.length - v.remainingCount})
          </button>
        </aura:renderIf>
      </footer>
    </aura:renderIf>
  </section>

  <footer id="info" class="info">
    <p>Double-click to edit a todo</p>
    <p>
      Created by <a href="https://github.com/skipsauls">Skip Sauls</a>
    </p>
    <p>
      Part of <a href="http://todomvc.com">TodoMVC</a>
    </p>
  </footer>

</aura:application>
