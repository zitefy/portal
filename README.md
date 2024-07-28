<img src="https://github.com/user-attachments/assets/ab7f7be0-5f8c-4839-9fa8-4e476f7364e9" alt="zitefy" width="250" align="right">

# `portal` 🌐

> This is the web portal of zitefy, live [here](https://zitefy.com). Built with [solid.js](https://www.solidjs.com/) & typescript.

## Table Of Contents
* [What's this?](#whats-this)
   * [Role in the stack](#role-in-the-stack)
   * [Code Overview](#code-overview)
* [Setup Guide](#setup-guide)
   * [Prerequisites](#prerequisites)
   * [Build & Run](#build--run)

## What's this?
This is the web portal of zitefy. Essentially, the web app you see running on [zitefy.com](https://zitefy.com/). This is written using [solid.js](https://www.solidjs.com/) & typescript.

### Role in the stack
This portal does the following:

* allows users to login & register with the api.
* allows users to edit their zitefy profile
* allows users to browse the available templates
* act as a medium to create sites from templates
* serve as a site editor and integrates zitechef

### Code Overview
This is the code structure for this project. We chose solid.js over traditional stuff like react because of it's brevity and simpler nature. React's virtual DOM seems too complicated and forces us to declare more variables, which would increase the overall bundle size and memory footprint. So, we decided to go with something simple.

```
    |
    |- src/
    |   |
    |   |- api/ # utility functions for communicating with the api
    |   |   |
    |   |   |- anthropic.ts
    |   |   |- auth.ts
    |   |   |- base.ts
    |   |   |- cache.ts
    |   |   |- config.ts
    |   |   |- index.ts
    |   |   |- site.ts
    |   |   |- storage.ts
    |   |   |- template.ts
    |   |
    |   |- assets/
    |   |   |
    |   |   |- # some static assets like images
    |   |
    |   |- components/ # universally used components
    |   |   |
    |   |   |- Button.tsx
    |   |   |- DatePicker.tsx
    |   |   |- Header.tsx
    |   |   |- ImageUpload.tsx
    |   |   |- Loader.tsx
    |   |   |- Logo.tsx
    |   |   |- Modal.tsx
    |   |   |- # and a bunch of others
    |   |
    |   |- contexts/ # universal state managers
    |   |   |
    |   |   |- AuthContext.tsx # for auth obviously
    |   |
    |   |- pages/ # all the different pages
    |   |   |
    |   |   |- 404/ # not found
    |   |   |   |- components/
    |   |   |   |- 404.tsx # not working
    |   |   |   |- Taken.tsx # /*invalid username route
    |   |   |
    |   |   |- anthropic/
    |   |   |   |- ZiteChef.tsx # set api token page
    |   |   |
    |   |   |- auth/
    |   |   |   |- components/
    |   |   |   |- Login.tsx # /login route
    |   |   |   |- SignUp.tsx # /signup route
    |   |   |
    |   |   |- dashboard/
    |   |   |   |- Dashboard.tsx # / route
    |   |   |
    |   |   |- profile/
    |   |   |   |- components/
    |   |   |   |- Profile.tsx # /profile route
    |   |   |
    |   |   |- templates/
    |   |   |   |- components/
    |   |   |   |- Editor.tsx # /editor route
    |   |   |   |- Explorer.tsx # /explore route
    |   |     
    |   |- App.tsx
    |   |- index.css
    |   |- index.tsx
    |   |- types.d.ts
    |
    |- .gitignore
```

## Setup Guide
Follow this setup guide to install and run the project locally. There are no strict platform requirements.

### Prerequisites
* **bun**

    Install for linux/WSL or macOS by running this command
    ```
     $ curl -fsSL https://bun.sh/install | bash
    ```
    
    For Windows, open a powershell instance & run
    ```
     powershell -c "irm bun.sh/install.ps1 | iex"
    ```

* **Git CLI**

    For linux, skip this step. Install by running the executable for your platform available [here](https://git-scm.com/downloads).

### Build & Run
1. Clone this repository
    
    ```
     git clone https://github.com/zitefy/portal.git && cd portal/
    ```

2. Install dependencies

    ```
     bun install
    ```

3. Run the dev script

    ```
     bun dev
    ```

## Contributing
Thanks for your interest in contributing to this project. Please refer to the [contributing guide](https://github.com/zitefy/portal/blob/main/CONTRIBUTING.md).
