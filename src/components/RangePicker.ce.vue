<template>
  <a-config-provider :locale="locale1 === 'en-US' ? enUS : zhCN">
    <a-range-picker
      @change="onRangeChange"
      @ok="onRangeOk"
      @openChange="onOpenChange"
      @calendarChange="onCalendarChange"
      :style="_domStyle"
      :allow-clear="_allowClear"
      :autofocus="_autofocus"
      :bordered="_bordered"
      :date-render="_dateRender"
      :disabled="_disabled"
      :disabled-date="disabledDate"
      :dropdown-class-name="_dropdownClassName"
      :get-popup-container="_getPopupContainer"
      :input-read-only="_inputReadOnly"
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
      :disabled-time="disabledTime"
      :format="_format"
      :ranges="_ranges"
      :render-extra-footer="_renderExtraFooter"
      :separator="_separator"
      :show-time="_showTime || {}"
      :value="hackValue || timeRange"
  />
  </a-config-provider>
</template>
<script>
import { defineComponent, reactive, ref, watch } from 'vue';

// import cn from 'ant-design-vue/es/date-picker/locale/zh_CN';
// import en from 'ant-design-vue/es/date-picker/locale/en_US';

import enUS from 'ant-design-vue/es/locale/en_US';
import zhCN from 'ant-design-vue/es/locale/zh_CN';

import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn';
dayjs.locale('en');

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
  'value',
  'domStyle',
  'uuid'
]

export default defineComponent({
  props: propsStr,
  emits: ['onRangeChange', 'onRangeOk', 'onCalendarChange'],
  setup(props, {emit}) {
    // console.log(props, 8888888)

    const parseProps = reactive({})
    const timeRange = ref()
    const locale1 = ref()
    const dates = ref();
    const hackValue = ref();

    propsStr.forEach(v => {
      if (props[v] !== undefined && props[v] !== null) {
        if (v === 'value') {
          const tr = JSON.parse(props.value)
          console.log(tr)
          if (tr.length === 2 && tr[0] && tr[1]) {
            timeRange.value = [dayjs(tr[0]), dayjs(tr[1])]
          } else {
            timeRange.value = []
          }

        } else if (v === 'showTime') {
          parseProps[`_${v}`] = JSON.parse(props[v])

          if (parseProps[`_${v}`].defaultValue) {
            parseProps[`_${v}`].defaultValue =
                [dayjs(parseProps[`_${v}`].defaultValue[0]),
                  dayjs(parseProps[`_${v}`].defaultValue[1])]
          }

        } else if (v === 'locale') {
          parseProps[`_${v}`] = props[v]
        } else if (v === 'uuid') {
          parseProps[`_${v}`] = props[v]
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

          if (Array.isArray(tr) && tr.length === 2 && tr[0] && tr[1]) {
            timeRange.value = [dayjs(tr[0]), dayjs(tr[1])]
          } else {
            timeRange.value = []
          }

        },
        {deep: true}
    )

    watch(
        () => props.locale,
        (newProps) => {
          locale1.value = newProps
          dayjs.locale(newProps === 'en-US' ? 'en': 'zh-cn');
        },
        {deep: true}
    )

    // const disabledDate = current => {
    //   if (!Number.isNaN(Number(parseProps._disabledDate))) {
    //     if (!dates.value || dates.value.length === 0) {
    //       return false;
    //     }
    //     const tooLate = dates.value[0] && current.diff(dates.value[0], 'days') > parseProps._disabledDate;
    //     const tooEarly = dates.value[1] && dates.value[1].diff(current, 'days') > parseProps._disabledDate;
    //     return tooEarly || tooLate;
    //   } else if (Array.isArray(parseProps._disabledDate)) {
    //
    //     return current && (current > dayjs(parseProps._disabledDate[1]).endOf('day') ||
    //         current < dayjs(parseProps._disabledDate[0]).startOf('day'))
    //   }
    // };

    const disabledRangeTime = (_, type) => {
      // if (type === 'start') {
      //   return {
      //     disabledHours: () => range(0, 60),
      //     disabledMinutes: () => range(30, 60),
      //     disabledSeconds: () => [55, 56],
      //   };
      // }
      //
      // return {
      //   disabledHours: () => range(0, 60).splice(20, 4),
      //   disabledMinutes: () => range(0, 31),
      //   disabledSeconds: () => [55, 56],
      // };
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
      emit('onCalendarChange', val)
    };

    const onRangeChange = (value, dateString) => {
      emit('onRangeChange', value || [], dateString)
      emit('update:value', value || [])
    };

    const onRangeOk = value => {
      emit('onRangeOk', value)
    };

    const disabledDate = (current) => {
      if (window[props.uuid] && window[props.uuid].disabledDate) {
        return window[props.uuid].disabledDate(dates.value, current)
      }
    }

    const disabledTime = (current, type) => {
      if (window[props.uuid] && window[props.uuid].disabledTime) {
        return window[props.uuid]?.disabledTime(dates.value, current, type)
      }
    }



    return {
      onRangeChange,
      onRangeOk,
      ...parseProps,
      timeRange,
      dates,
      hackValue,
      disabledDate,
      onOpenChange,
      onCalendarChange,
      disabledRangeTime,
      disabledTime,
      dayjs,
      locale1,
      enUS,
      zhCN,
    };
  },
});
</script>

<style>
@import 'ant-design-vue/lib/date-picker/style/index.css';
@import 'ant-design-vue/lib/tag/style/index.css';
@import 'ant-design-vue/lib/button/style/index.css';
</style>
