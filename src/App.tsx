import React, { Suspense } from "react"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AppRoutes } from "./constant/AppRoutes"
import Loading from "./widget/loaders/Loading"

function App() {
	const HomeChatView = React.lazy(() => import("./views/HomeChatView"))
	return (
		<BrowserRouter basename={"/"}>
			<Suspense fallback={<Loading />}>
				<Routes>
					<Route path={AppRoutes.HOME_CHAT} element={<HomeChatView />} />
				</Routes>
			</Suspense>
		</BrowserRouter>
	)
}

export default App
