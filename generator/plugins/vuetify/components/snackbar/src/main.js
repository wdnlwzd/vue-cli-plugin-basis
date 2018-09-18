import Vue from 'vue';
import Main from './Main.vue';

const SnackbarConstructor = Vue.extend(Main);

let instance;
let instances = [];
let seed = 1;

const Snackbar = (options) => {
  let opts = options || {};

  if (typeof opts === 'string') {
    opts = {
      message: opts,
    };
  }

  let id = `message_${seed += 1}`;

  instance = new SnackbarConstructor({
    data: opts,
  });
  instance.id = id;
  instance.vm = instance.$mount();
  document.body.appendChild(instance.vm.$el);
  instance.vm.visible = true;
  instance.dom = instance.vm.$el;
  instance.dom.style.zIndex = seed + 1001;
  instances.push(instance);
  return instance.vm;
};

Snackbar.close = (id) => {
  for (let i = 0, len = instances.length; i < len; i += 1) {
    if (id === instances[i].id) {
      instances.splice(i, 1);
      break;
    }
  }
};

Snackbar.closeAll = () => {
  for (let i = 0, len = instances.length; i < len; i += 1) {
    instances[i].close();
  }
};

export default Snackbar;
