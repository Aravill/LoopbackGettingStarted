[![Loopback Logo](https://loopback.io/images/loopback_logo.png)](https://loopback.io/doc/index.html)
LoopBack is a highly-extensible, open-source Node.js framework that enables you to create dynamic end-to-end REST APIs with little or no coding.

## Description

This is a simple NodeJS Loopback application

## Requirements

- This application requires Loopback and StrongLoop to be globally installed. Use the [loopback tutorial](https://loopback.io/doc/en/lb2/Installation.html) to do so.

## Possible problems

- If you have a problem with permissions while installing node modules globally, use [this](https://docs.npmjs.com/getting-started/fixing-npm-permissions) tutorial to either re-install npm or change the default global directory for node modules

- If the StrongLoop API explorer is installed globally, but the application doesn't see it, install it locally using this solution:

 - Install StrongLoop locally like this

``` sh
npm install loopback-component-explorer --save-dev
```

 - And create a file ./server/component-config.json that contains:
``` sh
{
  "loopback-component-explorer": {
    "mountPath": "/explorer"
  }
}
```
## Resources
- [Loopback documentation](https://loopback.io/doc/index.html)
