import "@babel/polyfill";
import React from "react";
import {render} from "react-dom";
import {Provider} from "react-redux";
import App from "#root/components/App";
import store from "#root/store";
import {createGlobalStyle} from "styled-components";

const GlobalStyle = createGlobalStyle`
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');
    body {
        margin: 0;
        padding: 0;
        min-width: 320px;
        font-family: Roboto, sans-serif;
    }
`;

render(
    <Provider store={store}>
        <GlobalStyle/>
        <App/>
    </Provider>,
    document.getElementById("app")
);