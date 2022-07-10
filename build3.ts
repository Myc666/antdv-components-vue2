import SomeComponent from './src/components/RangePicker.vue'
import { defineCustomElement } from 'vue'


customElements.define('some-component-ce', defineCustomElement(SomeComponent));
