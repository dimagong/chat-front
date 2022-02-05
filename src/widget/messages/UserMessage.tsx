import React, { PureComponent } from "react"
import "./StyleMessage.scss"
interface IMesssage {
	message: string
	date: string
	type: "user" | "agent"
}

const UserMessage = ({ ...props }: IMesssage) => {
	const { message, date, type } = props
	return (
		<>
			<div className='item-message' style={{ backgroundColor: "#4caf50" }}>
				<p className='msg'>{message}</p>
				<p className='date'>{date}</p>
			</div>
		</>
	)
}

export default UserMessage
