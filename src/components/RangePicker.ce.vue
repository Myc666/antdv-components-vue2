<template>
    <a-range-picker
        @change="onRangeChange"
        @ok="onRangeOk"
        :allow-clear="_allowClear"
        :autofocus="_autofocus"
        :bordered="_bordered"
        :date-render="_dateRender"
        :disabled="_disabled"
        :disabled-date="_disabledDate"
        :dropdown-class-name="_dropdownClassName"
        :get-popup-container="_getPopupContainer"
        :input-read-only="_inputReadOnly"
        :locale="_locale"
        :mode="_mode"
        :next-icon="_nextIcon"
        :open="_open"
        :placeholder="_placeholder"
        :popup-style="_popupStyle"
        :prev-icon="_prevIcon"
        :size="_size"
        :suffix-icon="_suffixIcon"
        :super-next-icon="_superNextIcon"
        :super-prev-icon="_superPrevIcon"
        :value-format="_valueFormat"
        :allow-empty="_allowEmpty"
        :default-picker-value="_defaultPickerValue"
        :disabled-time="_disabledTime"
        :format="_format"
        :ranges="_ranges"
        :render-extra-footer="_renderExtraFooter"
        :separator="_separator"
        :show-time="_showTime"
        :value="timeRange"
    />
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue';
import dayjs from 'dayjs'

const propsStr = [
  'allowClear',
  'autofocus',
  'bordered',
  'dateRender',
  'disabled',
  'disabledDate',
  'dropdownClassName',
  'getPopupContainer',
  'inputReadOnly',
  'locale',
  'mode',
  'nextIcon',
  'open',
  'picker',
  'placeholder',
  'popupStyle',
  'prevIcon',
  'size',
  'suffixIcon',
  'superNextIcon',
  'superPrevIcon',
  'valueFormat',
  'allowEmpty',
  'defaultPickerValue',
  'disabledTime',
  'format',
  'ranges',
  'renderExtraFooter',
  'separator',
  'showTime',
  'showTime.defaultValue',
  'value'
]

export default defineComponent({
  props: propsStr,
  emits: ['onRangeChange', 'onRangeOk'],
  setup(props, {emit}) {
    console.log(props, 77777777777)
    const parseProps = reactive({})
    const timeRange = ref([])

    propsStr.forEach(v => {
      if (props[v]) {
        if (v === 'value') {
          const tr = JSON.parse(props.value)
          timeRange.value = [dayjs(tr[0]), dayjs(tr[1])]
        } else {
          parseProps[`_${v}`] = ref(JSON.parse(props[v]))
        }
      }
    })

    watch(
        () => props.value,
        (newProps) => {
          const tr = JSON.parse(newProps)
          timeRange.value = [dayjs(tr[0]), dayjs(tr[1])]
        },
        {deep: true}
    )

    const onRangeChange = (value, dateString) => {
      emit('onRangeChange', value || [], dateString)
      emit('update:value', value || [])
    };

    const onRangeOk = value => {
      emit('onRangeOk', value)
    };


    console.log(parseProps, 999)
    return {
      onRangeChange,
      onRangeOk,
      ...parseProps,
      timeRange
    };
  },
});
</script>

<style>
@import 'ant-design-vue/lib/date-picker/style/index.css';
@import 'ant-design-vue/lib/tag/style/index.css';
@import 'ant-design-vue/lib/button/style/index.css';
</style>
