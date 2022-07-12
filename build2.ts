
import { defineCustomElement, createApp  } from 'vue'
import { RangePicker } from "ant-design-vue";

// import 'ant-design-vue/lib/date-picker/style/css';

const VueCustomComponent = defineCustomElement(RangePicker)

// let aaa = RangePicker.setup();


// Register as custom element
customElements.define('some-component-ce', VueCustomComponent);
