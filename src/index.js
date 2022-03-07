import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
// import {MoralisProvider} from 'react-moralis';
import {ChakraProvider, extendTheme}  from '@chakra-ui/react';

const theme = extendTheme({
  config: {
    initialColorMode: "light",
  },
});

// const moralisAppId = "rpwIHrPvItjQU3UDqNWab2ILKPmUBFdPEYpmaWA3";
// const moralisServerUrl = "https://k5dzq9it9wlw.usemoralis.com:2053/server";
// const moralisAppId="oekGhbuq0kfiNBgktbq1shqT7jmW4Djci0DbZ6Jn";
// const moralisServerUrl="https://wmieztcay6uu.usemoralis.com:2053/server";
ReactDOM.render(
  <React.StrictMode>
    {/* <MoralisProvider appId={moralisAppId} serverUrl={moralisServerUrl}> */}
      <ChakraProvider theme={theme}>
        <App />
      </ChakraProvider>
    {/* // </MoralisProvider> */}
  
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
