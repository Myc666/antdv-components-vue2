<template>
    <a-range-picker
        @change="onRangeChange"
        @ok="onRangeOk"
        :allow-clear="allowClear"
        :autofocus="autofocus"
        :bordered="bordered"
        :date-render="dateRender"
        :disabled="disabled"
        :disabled-date="disabledDate"
        :dropdown-class-name="dropdownClassName"
        :get-popup-container="getPopupContainer"
        :input-read-only="inputReadOnly"
        :locale="locale"
        :mode="mode"
        :next-icon="nextIcon"
        :open="open"
        :placeholder="placeholder"
        :popup-style="popupStyle"
        :prev-icon="prevIcon"
        :size="size"
        :suffix-icon="suffixIcon"
        :super-next-icon="superNextIcon"
        :super-prev-icon="superPrevIcon"
        :value-format="valueFormat"
        :allow-empty="allowEmpty"
        :default-picker-value="defaultPickerValue"
        :disabled-time="disabledTime"
        :format="format"
        :ranges="ranges"
        :render-extra-footer="renderExtraFooter"
        :separator="separator"
        :show-time="showTime"
        v-model="value"
    />
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: [
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
  ],
  emits: ['onChange', 'onOk', 'onRangeChange', 'onRangeOk'],
  setup(props, {emit}) {
    console.log(props, 888);

    const onChange = (value, dateString) => {
      emit('onChange', value, dateString)
    };

    const onOk = value => {
      emit('onOk', value)
    };


    const onRangeChange = (value, dateString) => {
      emit('onRangeChange', value, dateString)
    };

    const onRangeOk = value => {
      emit('onRangeOk', value)
    };

    return {
      onChange,
      onOk,
      onRangeChange,
      onRangeOk,
    };
  },
});
</script>
