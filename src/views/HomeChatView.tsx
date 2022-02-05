import React, { useState, useEffect, useReducer } from "react"
import { io, Socket } from "socket.io-client"
import avatar from "./../assets/icon/icons8-person-48.png"
import lynch from "./../assets/icon/lynch.jpg"
import Menu from "../widget/menu/Menu"
import "./HomeChatView.scss"
import Messages from "../widget/cards/Messages"
import Footer from "../widget/footer/Footer"

let socket: Socket = io()
const ENDPOINT = "http://localhost:5000"
socket = io(ENDPOINT)

interface IMesssage {
	message: string
	date: number
	type: "user" | "agent"
}

interface IState {
	messages: IMesssage[]
}
interface IAction {
	type: "user" | "agent"
	payload: IMesssage
}

const initialState = {
	messages: [],
}

const isReduser = (state: IState, action: IAction): IState => {
	switch (action.type) {
		case "user":
			return {
				messages: [
					...state.messages,
					{ type: "user", message: action.payload.message, date: action.payload.date },
				],
			}
		case "agent":
			return {
				messages: [
					...state.messages,
					{ type: "agent", message: action.payload.message, date: action.payload.date },
				],
			}
		default:
			return { ...state }
	}
}
const HomeChatView: React.FC = () => {
	const [state, dispatch] = useReducer(isReduser, initialState as IState)
	const [lastUserMessage, saveLastMessage] = useState("")

	useEffect(() => {
		requestFromServer()
	}, [])

	const sendToServer = (isMessage: string) => {
		let message = isMessage
		socket.emit("message", message)
	}

	const requestFromServer = () => {
		socket.on("message", (response) => {
			setTimeout(() => {
				sendAgentMessage(response)
			}, 2000)
		})
	}

	const sendUserMessage = () => {
		if (lastUserMessage) {
			dispatch({
				type: "user",
				payload: {
					message: lastUserMessage,
					date: +new Date(),
					type: "user",
				},
			})
			sendToServer(lastUserMessage)

			saveLastMessage("")
		}
	}
	const sendAgentMessage = (data: IMesssage) => {
		const { message, date, type } = data
		dispatch({
			type: "agent",
			payload: {
				message,
				date,
				type,
			},
		})
	}

	const inputMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault()
		saveLastMessage(e.target.value)
	}

	let agent = "David Lynch"

	return (
		<div className='chat'>
			<div className='chat-menu'>
				<Menu agent={agent} avatar={lynch} />
			</div>
			<div className='chat-block'>
				<Messages messages={state.messages} />
			</div>
			<div className='chat-footer'>
				<Footer
					lastUserMessage={lastUserMessage}
					sendUserMessage={sendUserMessage}
					inputMessage={inputMessage}
				/>
			</div>
		</div>
	)
}

export default HomeChatView
