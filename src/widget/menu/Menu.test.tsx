import React from "react"
import { render, unmountComponentAtNode } from "react-dom"
import { screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import Menu from "./Menu"

export {}

let container: any = null
beforeEach(() => {
	container = document.createElement("div")
	document.body.appendChild(container)
})

afterEach(() => {
	unmountComponentAtNode(container)
	container.remove()
	container = null
})

it("component witn mane and icon", () => {
	act(() => {
		render(<Menu agent={"David Lynch"} avatar={""} />, container)
	})
	//screen.getByRole("")
	expect(container.textContent).toBe("David Lynch")
	const img = screen.getByRole("img")
	expect(img).toBeInTheDocument()
	expect(img).toHaveClass("menu-avatar")
	expect(img).toHaveAttribute("alt")
})
