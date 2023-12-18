import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';

import App from './App';
import './index.css';
  
// // Check if the browser supports service workers
// if ('serviceWorker' in navigator) {
// 	// Get all service worker registrations
// 	navigator.serviceWorker.getRegistrations()
// 	  .then(registrations => {
// 		// Unregister each service worker
// 		registrations.forEach(registration => {
// 		  registration.unregister()
// 			.then(success => {
// 			  console.log('Service Worker unregistered:', success);
// 			})
// 			.catch(error => {
// 			  console.error('Error during Service Worker unregister:', error);
// 			});
// 		});
// 	  })
// 	  .catch(error => {
// 		console.error('Error getting service worker registrations:', error);
// 	  });
//   }
  

const onWorkerReady = () => {
	console.log("SW is ready");
}
navigator.serviceWorker.register("sw.js");
navigator.serviceWorker.ready.then(onWorkerReady);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	// <React.StrictMode>
		<App />
	// </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();