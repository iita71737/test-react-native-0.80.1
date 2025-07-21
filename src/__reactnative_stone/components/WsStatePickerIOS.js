import React from 'react'
import { View, Dimensions } from 'react-native'
import { WsFlex, WsBtnSelect, WsText, WsDialog } from '@/components'
import { Picker } from '@react-native-picker/picker'
import $color from '@/__reactnative_stone/global/color'
import $theme from '@/__reactnative_stone/global/theme'
import { useTranslation } from 'react-i18next'
import moment from 'moment'

const WsStatePickerIOS = props => {
  const { t, i18n } = useTranslation()
  //RN get Dimensions
  const windowWidth = Dimensions.get('window').width
  const windowHeight = Dimensions.get('window').height

  // Prop
  const {
    nameKey,
    value,
    borderWidth,
    onChange,
    borderRadius,
    borderColor = $theme == 'light' ? $color.gray3l : $color.black3l,
    items = [],
    preText,
    pickerNum,
    placeholder = `${t('選擇')}`,
    defaultValue,
    enabled = true,
    title,
    loading,
    testID
  } = props

  // State
  const [visible, setVisible] = React.useState(false)
  const [selectedValue, setSelectedValue] = React.useState(value)
  const [text, setText] = React.useState(defaultValue ? defaultValue.label : '')

  // Function
  const $_setLabel = () => {
    items.forEach(item => {
      if (typeof item === 'object' && Object.keys(value).length != 0) {
        if (ObjCompare(item.value, value)) {
          setText(item.label)
        }
      }
      if (item.value === value) {
        setText(item.label)
      }
    })
  }

  const ObjCompare = (obj1, obj2) => {
    const Obj1_keys = Object.keys(obj1)
    const Obj2_keys = Object.keys(obj2)

    if (Obj1_keys.length !== Obj2_keys.length) {
      return false
    }
    for (let k of Obj1_keys) {
      if (obj1[k] !== obj2[k]) {
        return false
      }
    }
    return true
  }

  React.useEffect(() => {
    if (value) {
      $_setLabel()
    }
  }, [value, items])

  // Render
  return (
    <>
      <WsFlex>
        {preText && (
          <WsText
            style={{
              marginRight: 8
            }}>
            {preText}
          </WsText>
        )}
        <View
          style={{
            flex: 1,
            borderRadius: borderRadius,
            borderWidth: borderWidth,
            borderColor: borderColor,
          }}>
          <WsBtnSelect
            testID={testID}
            loading={loading}
            placeholder={t(placeholder)}
            pickerNum={pickerNum}
            text={t(text)}
            onPress={() => {
              setVisible(true)
              setText(text)
            }}
          />
        </View>
      </WsFlex>
      <WsDialog
        title={title}
        dialogVisible={visible}
        setDialogVisible={() => {
          setVisible(false)
        }}>
        <View
          style={{
            minWidth: windowWidth * 0.7
          }}>
          <Picker
            testID={'Picker'}
            style={{
              // borderWidth:1,
            }}
            itemStyle={{
              color: '#000'
            }}
            enabled={enabled}
            fontFamily={{
              color: '#000'
            }}
            selectedValue={selectedValue}
            placeholder={t(placeholder)}
            onValueChange={(itemValue, itemIndex) => {
              onChange(itemValue)
              setSelectedValue(itemValue)
              setVisible(false)
            }}>
            {items.map(item => (
              <Picker.Item
                key={item}
                label={t(item.label) ? t(item.label) : moment(item[nameKey]).format('YYYY-MM-DD') ? moment(item[nameKey]).format('YYYY-MM-DD') : item[nameKey]}
                value={item.value ? item.value : ''}
                style={{
                  fontSize: 14
                }}
              />
            ))}
          </Picker>
        </View>
      </WsDialog>
    </>
  )
}

export default WsStatePickerIOS
