<template>
  <a-range-picker
      @change="onRangeChange"
      @ok="onRangeOk"
      @openChange="onOpenChange"
      @calendarChange="onCalendarChange"
      :allow-clear="_allowClear"
      :autofocus="_autofocus"
      :bordered="_bordered"
      :date-render="_dateRender"
      :disabled="_disabled"
      :disabled-date="disabledDate"
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
      :value="hackValue || timeRange"
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
    const parseProps = reactive({})
    const timeRange = ref()
    const dates = ref();
    const hackValue = ref();

    propsStr.forEach(v => {
      if (props[v] !== undefined) {
        if (v === 'value') {
          const tr = JSON.parse(props.value)
          timeRange.value = [dayjs(tr[0]), dayjs(tr[1])]
        } else {
          parseProps[`_${v}`] = JSON.parse(props[v])
        }
      } else {
        parseProps[`_${v}`] = undefined
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

    const disabledDate = current => {
      if (!Number.isNaN(Number(parseProps._disabledDate))) {
        if (!dates.value || dates.value.length === 0) {
          return false;
        }
        const tooLate = dates.value[0] && current.diff(dates.value[0], 'days') > parseProps._disabledDate;
        const tooEarly = dates.value[1] && dates.value[1].diff(current, 'days') > parseProps._disabledDate;
        return tooEarly || tooLate;
      } else if (Array.isArray(parseProps._disabledDate)) {

        return current && (current > dayjs(parseProps._disabledDate[1]).endOf('day') ||
            current < dayjs(parseProps._disabledDate[0]).startOf('day'))
      }
    };

    let onOpenChange = open => {
      if (open) {
        dates.value = [];
        hackValue.value = [];
      } else {
        hackValue.value = undefined;
      }
    };

    const onCalendarChange = val => {
      dates.value = val;
    };

    const onRangeChange = (value, dateString) => {
      emit('onRangeChange', value || [], dateString)
      emit('update:value', value || [])
    };

    const onRangeOk = value => {
      emit('onRangeOk', value)
    };

    return {
      onRangeChange,
      onRangeOk,
      ...parseProps,
      timeRange,
      dates,
      hackValue,
      disabledDate,
      onOpenChange,
      onCalendarChange
    };
  },
});
</script>

<style>
@import 'ant-design-vue/lib/date-picker/style/index.css';
@import 'ant-design-vue/lib/tag/style/index.css';
@import 'ant-design-vue/lib/button/style/index.css';
</style>
