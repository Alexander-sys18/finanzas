const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			message: null,
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			],
			token: localStorage.getItem("token") ?? undefined,
			dolarBcv: [],
			dolarParelelo: [],
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			getMessage: async () => {
				try{
					// fetching data from the backend
					const resp = await fetch(process.env.BACKEND_URL + "/api/hello")
					const data = await resp.json()
					setStore({ message: data.message })
					// don't forget to return something, that is how the async resolves
					return data;
				}catch(error){
					console.log("Error loading message from backend", error)
				}
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			},
			savetoken: (token) =>{
				setStore({ token })
				localStorage.setItem("token", token)
			},
			checkLogin: (redirect) => {
				const token = localStorage.getItem("token")
				const store = getStore()
				if (token == null || !store.token) {
					redirect("/Login")
				}
			},
			getDollarBCV: async() => {
				const API_URL = "https://pydolarvenezuela-api.vercel.app";
				const requestConfig = {
				  method: "GET",
				  headers: {
					"Content-type": "application/json", 
				  },
				};
			
				try {
				  const response = await fetch(API_URL + "/api/v1/dollar/bcv_oficial/bcv", requestConfig);
				  if (response.status !== 200) {
					console.log("Error en la solicitud. Code: ", response.status);
					return null;
				  }
				  const responseBody = await response.json();
				  setStore({ dolarBcv: responseBody.price });
				} catch (error) {
				  console.log(error);
				  return null;
				}
			},
			getDollarParelelo: async() => {
				const API_URL = "https://pydolarvenezuela-api.vercel.app";
				const requestConfig = {
				  method: "GET",
				  headers: {
					"Content-type": "application/json", 
				  },
				};
			
				try {
				  const response = await fetch(API_URL + "/api/v1/dollar/dolar_promedio/enparalelovzla", requestConfig);
				  if (response.status !== 200) {
					console.log("Error en la solicitud. Code: ", response.status);
					return null;
				  }
				  const responseBody = await response.json();
				  setStore({ dolarParalelo: responseBody.price });
				} catch (error) {
				  console.log(error);
				  return null;
				}
			  },
		}
	};
};

export default getState;
