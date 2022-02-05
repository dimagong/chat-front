import React, { PureComponent } from "react"
import "./StyleMessage.scss"
interface IMesssage {
	message: string
	date: string
	type: "user" | "agent"
	icon?: any
}

const AgentMessage = ({ ...props }: IMesssage) => {
	const { message, date, icon } = props
	const iconStyle: string = icon ? "icon" : "icon-none"
	return (
		<>
			<div className='item-message' style={{ backgroundColor: "#ff9800" }}>
				<img className={iconStyle} src={icon} alt='icon-agent' />
				<p className='msg'>{message}</p>
				<p className='date'>{date}</p>
			</div>
		</>
	)
}

export default AgentMessage
