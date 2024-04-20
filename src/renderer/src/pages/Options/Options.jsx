import { useState, useEffect } from 'react';
import { Form, Input, InputNumber, Button, Select, Slider, Switch, ColorPicker } from 'antd';
import useGlobalStore from '@renderer/store/index.js';
import { regbToObj } from '@renderer/utils/common.js';

const { TextArea } = Input;
function Options({}) {
  const [form] = Form.useForm();
  const { 
    clockStyle,
    changeClockType,
    isTop,
    changeIsTop,
    counts,
    chagneCounts,
    size,
    changeSize,
    tipsDelay,
    changeTipsDelay,
    cordColor,
    changeCardColor,
    timeColor,
    changeTimeColor,
    dataColor,
    changeDataColor,
    tipsColor,
    changeTipsColor,
    tipss,
    changeTipss,
   } = useGlobalStore();

   // 时钟款式切换
   const clockTypeChange = (value) => {
     form.setFieldValue({
      clockStyle: value
     })
     changeClockType(value);
   }

  // 时钟尺寸设置
   const sizeChange = (value) => {
    form.setFieldValue({
      size: value
     })
     changeSize(value);
   }

   // 是否置顶
   const onIsTopChange = (value) => {
    form.setFieldValue({
      isTop: value
     })
     changeIsTop(value);
   }

   // 卡片背景色修改
   const cardColorChange = (value) => {
     console.log('---- cardColorChange ----:', value);
     const { metaColor } = value;
     changeCardColor(`rgba(${metaColor.r},${metaColor.g},${metaColor.b},${metaColor.a})`);
    form.setFieldValue({
      cordColor: value
     })
   }

   // 时钟数字颜色
   const timeColorChange = (value) => {
    form.setFieldValue({
      timeColor: value
     })
     const { metaColor } = value;
     changeTimeColor(`rgba(${metaColor.r},${metaColor.g},${metaColor.b},${metaColor.a})`);
   }

   // 日期文字颜色
   const dataColorChange = (value) => {
    form.setFieldValue({
      dataColor: value
     })
     const { metaColor } = value;
     changeDataColor(`rgba(${metaColor.r},${metaColor.g},${metaColor.b},${metaColor.a})`);

   }

   // 底部提示文字颜色
   const tipsColorChange = (value) => {
    form.setFieldValue({
      tipsColor: value
     })
     const { metaColor } = value;
     changeTipsColor(`rgba(${metaColor.r},${metaColor.g},${metaColor.b},${metaColor.a})`);

   }

   // 底部提示文字配置
   const tipssChange = (value) => {
    form.setFieldValue({
      tipss: value.split('\n')
     })
     changeTipss(value.split('\n'));
   }

   // 底部文字滚播间隔
   const tipsDelayChange = (value) => {
    form.setFieldValue({
      tipsDelay: value
     })
     changeTipsDelay(value);
   }

  // 倒计时秒数
   const countsChange = (value) => {
    form.setFieldValue({
      counts: value
     })
     chagneCounts(value);
   }

   useEffect(() => {
     console.log('---- regbToObj ----:0', cordColor);
     console.log('---- regbToObj ----:1', cordColor, regbToObj(cordColor));
    form.setFieldsValue({
      clockStyle,
      isTop,
      counts,
      size,
      tipsDelay,
      cordColor: regbToObj(cordColor),
      timeColor: regbToObj(timeColor),
      dataColor: regbToObj(dataColor),
      tipsColor: regbToObj(tipsColor),
      tipss: tipss.join('\n')
    })
  }, []);

  return (
    <div className="warp">
      <Form
        form={form}
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          remember: true,
        }}
        autoComplete="off"
      >
        <Form.Item
          label="时钟款式"
          name="clockStyle"
        >
          <Select
            style={{ width: 168 }}
            onChange={clockTypeChange}
            options={[
              { value: 'normal', label: '普通数字' },
              { value: 'flip', label: '翻页时钟' }
            ]}
          />
        </Form.Item>

        <Form.Item
          label="时钟尺寸"
          name="size"
        >
          <Slider
            min={60}
            max={100}
            onChange={sizeChange}
            tooltip={{
              open: false,
            }}
          />
        </Form.Item>

        <Form.Item
          label="是否置顶"
          name="isTop"
        >
          <Switch onChange={onIsTopChange} />
        </Form.Item>

        <Form.Item
          label="卡片背景色"
          name="cordColor"
        >
          <ColorPicker format="rgb" onChange={cardColorChange} />
        </Form.Item>
 
        <Form.Item
          label="时钟文字颜色"
          name="timeColor"
        >
          <ColorPicker format="rgb" onChange={timeColorChange} />
        </Form.Item>

        <Form.Item
          label="顶部日期文字颜色"
          name="dataColor"
        >
          <ColorPicker format="rgb" onChange={dataColorChange} />
        </Form.Item>

        <Form.Item
          label="底部提示文字颜色"
          name="tipsColor"
        >
          <ColorPicker format="rgb" onChange={tipsColorChange} />
        </Form.Item>

        <Form.Item
          label="底部提示文字"
          name="tipss"
        >
          <TextArea rows={4} maxLength={200} onChange={tipssChange} />
        </Form.Item>

        <Form.Item
          label="提示文字滚播间隔(秒)"
          name="tipsDelay"
        >
          <InputNumber min={3} style={{ width: 168 }} onChange={tipsDelayChange} />
        </Form.Item>

        <Form.Item
          label="倒计时秒数"
          name="counts"
        >
          <InputNumber min={10} style={{ width: 168 }} onChange={countsChange} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button htmlType="reset" className="mr-[10px]">
            重置
          </Button>
          <Button type="primary" htmlType="submit">
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Options