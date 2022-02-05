import React, { PureComponent } from "react"
import "./Footer.scss"
import icon from "../../assets/icon/send-message.png"

interface IProps {
	sendUserMessage: () => void
	inputMessage: (e: React.ChangeEvent<HTMLInputElement>) => void
	lastUserMessage: string
}

const Footer = ({ ...props }: IProps) => {
	return (
		<>
			<div className='footer'>
				<input
					value={props.lastUserMessage}
					onChange={props.inputMessage}
					className='footer-inpt'
					type='text'
					placeholder='Your message'
				/>
				<img className='footer-img' src={icon} alt='footer' onClick={props.sendUserMessage} />
			</div>
		</>
	)
}

export default Footer

//<button onClick={sendUserMessage}>Click</button>
