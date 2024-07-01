import React from 'react';
import ReactDOMServer from 'react-dom/server';

interface Props {
    [key: string]: any;
}

const render = (viewName: string, props: Props) => {
    const componentPath = path.join(__dirname, 'views', viewName);
    const Component = require(componentPath).default;

    return ReactDOMServer.renderToString(React.createElement(Component, props));
};

export default render;