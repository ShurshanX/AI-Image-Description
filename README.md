AI Image Description Generator
================

**[English](./README.md)** | **[中文](./README_zh.md)**

**AI Image Description Generator** accurately extracts the key elements from images and interprets the creative purposes behind them, which can be applied in fields such as scientific research, artistic creation, and the mutual search between images and texts.  

* It is based on **ERNIE 3.5** OR **GEMINI-PRO-1.5** API;
* It supports multi languages;
* Integrating the **clerk.com** User Management Platform;
* It use Next.js to build full-stack web applications.;

Screenshots & Demo
----------------

![AI Image Description Generator Screenshot 1](./public/assets/screenshot-1.png "Screenshot 1")
![AI Image Description Generator Screenshot 2](./public/assets/screenshot-2.png "Screenshot 2")

DEMO: [www.imagedescriptiongenerator.xyz](https://imagedescriptiongenerator.xyz/)

Getting Started
----------------

Step 1. Node.js 18.17 or later.  
  
Step 2. Run the development server

```sh
cd <project_path>
npm install
npm run dev
```

Step 3. Open browser, visit **<http://localhost:3000>**

Official site
----------------

* [www.imagedescriptiongenerator.xyz](https://imagedescriptiongenerator.xyz/)

Directory Structure
----------------

```text
root      // next.js project
├─ public   
├─ src
	├─ app  //main page
    ├─ components     // next.js components
    ├─ dictionaries   // Add new language using the JSON file
    ├─ lib            // ernie and gemini api service 
```

Others
----------------

***⭐ If you like this project, please add a star ⭐***