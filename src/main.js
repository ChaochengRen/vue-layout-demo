import Vue from 'vue'
import App from './App.vue'
import hui from 'h_ui';
import 'h_ui/dist/h_ui.min.css';

Vue.use(hui);

import HLine from 'h_charts/lib/line'
import HHistogram from 'h_charts/lib/histogram'
import HPie from 'h_charts/lib/pie'
Vue.component(HLine.name, HLine);
Vue.component(HHistogram.name, HHistogram);
Vue.component(HPie.name, HPie);

import Table from './components/widgets/Table';
import PieChart from './components/widgets/PieChart';
import LineChart from './components/widgets/LineChart';
import BarChart from './components/widgets/BarChart';
Vue.component("RTable", Table);
Vue.component("LineChart", LineChart);
Vue.component("PieChart", PieChart);
Vue.component("BarChart", BarChart);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
