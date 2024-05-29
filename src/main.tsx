import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { BrowserRouter } from "react-router-dom"
import ReactDOM from "react-dom/client"
import React from "react"

import App from "./App.tsx"
import "./index.css"

const cacheTime = 1000 * 60 * 60 * 24 // 24 hours

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			staleTime: cacheTime,
			refetchOnWindowFocus: false,
			refetchOnMount: false,
		},
	},
})

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<BrowserRouter>
				<App />
			</BrowserRouter>
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	</React.StrictMode>
)
