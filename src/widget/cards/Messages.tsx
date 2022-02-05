import React, { useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import UserMessage from "../messages/UserMessage"
import AgentMessage from "../messages/AgentMessage"
import "./Messages.scss"
import moment from "moment"
import avatar from "./../../assets/icon/icons8-person-48.png"
import lynch from "./../../assets/icon/lynch.jpg"

interface IMesssage {
	message: string
	date: number
	type: "user" | "agent"
}

const sortByDate = (list: IMesssage[]): IMesssage[] => {
	return list.sort((a, b) => {
		return a.date - b.date
	})
}

const findLastAgent = (list: IMesssage[]): IMesssage => {
	const agents: IMesssage[] = list.filter((el) => el.type === "agent")
	return agents[agents.length - 1]
}

const Messages = (props: { messages: IMesssage[] }) => {
	const sortMessages = [...sortByDate(props.messages)]
	const lastAgent: IMesssage = findLastAgent(props.messages)

	let loading: any = useRef()

	useEffect(() => {
		loading.scrollIntoView(false)
	}, [props])

	return (
		<>
			<div className='messages-cards'>
				{sortMessages.map((el) => {
					let isDate: string = moment(el.date).format("lll")
					const isProps = { message: el.message, date: isDate, type: el.type }
					if (el.type === "user") {
						return (
							<div className='msg-user' key={nanoid()}>
								<UserMessage {...isProps} />
							</div>
						)
					} else {
						return (
							<div className='msg-agent' key={nanoid()}>
								{el.message === lastAgent.message ? (
									<AgentMessage {...isProps} icon={lynch} />
								) : (
									<AgentMessage {...isProps} />
								)}
							</div>
						)
					}
				})}
				<div
					ref={(e) => {
						loading = e
					}}
				></div>
			</div>
		</>
	)
}

export default Messages
