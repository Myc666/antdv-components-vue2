import { RangePicker } from 'ant-design-vue'
import comp from './src/components/RangePicker.ce.vue'
import { defineCustomElement } from 'vue'

customElements.define('some-component-ce', defineCustomElement(comp))
