import { Steps} from 'antd'
import React from 'react'
// const StepComponent = ({current = 0, items = []}) => {
//   return (
//     <Steps current={current}>
//     {items.map((item) => {
//       return (
//         <CustomStep key={item.title} title={item.title} description={item.description} />
//       )
//     })}
//   </Steps>
//   )
// }

const StepComponent = ({ current = 0, items = [] }) => {
  const steps = items.map((item) => ({
    key: item.title,
    title: item.title,
    description: item.description,
  }));

  return (
    <Steps current={current} items={steps} />
  );
};

export default StepComponent