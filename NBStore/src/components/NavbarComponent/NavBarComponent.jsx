import { Checkbox, Rate } from 'antd'
import React from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue } from './style'
import PriceFilter from '../PriceFilter/PriceFilter'

const NavBarComponent = ({ onPriceFilterChange }) => {
    const onChange = () => { }
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option, index) => {
                    return (
                        <WrapperTextValue key={index}>{option}</WrapperTextValue>
                    )
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox style={{ marginLeft: 0 }} value={option.value}>{option.label}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ dispaly: 'flex' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span> {`tu ${option}  sao`}</span>
                        </div>
                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}
        }
    }

    return (
        <div>
            <PriceFilter onPriceChange={onPriceFilterChange} />

            <WrapperLableText>Danh mục</WrapperLableText>
            <WrapperContent>
                {renderContent('text', ['Tủ lạnh', 'TV', 'Máy giặt', 'Xe đạp', 'Xe hơi'])}
            </WrapperContent>
        </div>
    )
}

export default NavBarComponent
