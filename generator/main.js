const helpers = require('./tools/helpers');

function addAbsoluteImports(lines) {
  let lastImportIndex = lines.findIndex(line => line.match(/^import Vue/));

  // lines.splice(lastImportIndex += 1, 0, `import Element from 'element-ui';`);
  lines.splice(lastImportIndex += 1, 0, `import {
  Col, Row, Menu, Container,
  Submenu, Dropdown, DropdownMenu,
  DropdownItem, MenuItem, Tabs,
  TabPane, Input, Card,
  Form, FormItem, Select,
  Button, ButtonGroup, Table, TableColumn,
  Option, Upload, Dialog,
  Loading, Tag, Popover,
  RadioGroup, RadioButton, DatePicker,
  Switch, Cascader, Radio,
  CheckboxGroup, Checkbox, OptionGroup,
  Pagination, Alert, Tooltip,
  Message, MessageBox, Notification,
  Progress, TimePicker, MenuItemGroup,
  Collapse, CollapseItem,
  InputNumber, Steps, Step,
  Header, Badge, Main,
  Footer, Tree, Aside,
} from 'element-ui';`);
  lines.splice(lastImportIndex += 1, 0, `import 'element-ui/lib/theme-chalk/index.css';`);

  return lines;
}

module.exports = (api) => {
  helpers.updateFile(api, api.entryFile, lines => {
    lines = addAbsoluteImports(lines);
    lines.reverse();
    let lastImportIndex = lines.findIndex(line => line.match(/^import/));
    lines[lastImportIndex] += `\n`;
    // lines[lastImportIndex] += `\nVue.use(Element);`;
    lines[lastImportIndex] += `
Vue.use(Col);
Vue.use(Header);
Vue.use(Row);
Vue.use(Menu);
Vue.use(Container);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Input);
Vue.use(Card);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Select);
Vue.use(Button);
Vue.use(ButtonGroup);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Dialog);
Vue.use(Loading);
Vue.use(Tag);
Vue.use(Popover);
Vue.use(RadioGroup);
Vue.use(RadioButton);
Vue.use(DatePicker);
Vue.use(Switch);
Vue.use(Cascader);
Vue.use(Radio);
Vue.use(CheckboxGroup);
Vue.use(Checkbox);
Vue.use(OptionGroup);
Vue.use(Pagination);
Vue.use(Alert);
Vue.use(Tooltip);
Vue.use(Progress);
Vue.use(TimePicker);
Vue.use(MenuItemGroup);
Vue.use(Collapse);
Vue.use(CollapseItem);
Vue.use(InputNumber);
Vue.use(Steps);
Vue.use(Step);
Vue.use(Badge);
Vue.use(Main);
Vue.use(Footer);
Vue.use(Tree);
Vue.use(Aside);`;
    lines[lastImportIndex] += `\n`;
    lines[lastImportIndex] += `\nVue.router = router;`;
    lines[lastImportIndex] += `\nVue.store = store;`;
    lines[lastImportIndex] += `\n`;

    // prototype
    lines[lastImportIndex] += `\nVue.prototype.$api = API;`;
    // lines[lastImportIndex] += `\nVue.prototype.$message = Message;`;
    // lines[lastImportIndex] += `\nVue.prototype.$msgbox = MessageBox;`;
    // lines[lastImportIndex] += `\nVue.prototype.$notify = Notification;`;
    lines[lastImportIndex] += `\nVue.prototype.$consts = consts;`;

    lines.reverse().join('\n');

    return lines;
  });
}
