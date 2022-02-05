import React, { PureComponent } from "react"
import "./Menu.scss"

interface IProps {
	avatar?: any
	agent: string
}

const Menu: Function = (props: IProps) => {
	return (
		<>
			<div className='menu'>
				<img className='menu-avatar' src={props.avatar} alt='avatar' />
				<p className='menu-agent'>{props.agent}</p>
			</div>
		</>
	)
}

export default Menu
