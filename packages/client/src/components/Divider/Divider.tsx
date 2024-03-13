import React, { FC } from 'react'
import { DividerProps } from './types'

const Divider: FC<DividerProps> = ({ className }) => {
  return <div className={className}></div>
}

export default Divider
