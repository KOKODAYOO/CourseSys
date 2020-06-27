import Vue from 'vue';

const event = new Vue();

export default event;

//通过一个空的 Vue 实例作为中央事件总线（事件中心），
//用它来触发事件和监听事件,巧妙而轻量地实现了任何组件间的通信，
//包括父子、兄弟、跨级。