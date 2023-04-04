# automation-exercise-webdriverio
* [Introduction](#introduction)
* [Tools](#tools)
* [Test Approach](#testapproach)
* [Automation Approach](#automationapproach)
* [Installation](#installation)
* [Usage](#usage)
* [More Links](#morelinks)

## Introduction
The goal of this repository is to help as a reference on how to approach a testing project focusing more on automation but also give insight on the test approach in general to give the reader more context.

This project uses https://automationexercise.com/ as test application and WebdriverIO as automation testing tool.
The intention is also to help quick start with WebdriverIO with the examples contained here. 

WebdriverIO is a progressive automation framework built to automate modern web and mobile applications. It simplifies the interaction with your app and provides a set of plugins that help you create a scalable, robust and stable test suite.
We will be using  some of those as well

Mocha is a Javascript test framework for NodeJS. This will be used to create the test case files

## Tools
* NodeJS (https://nodejs.org/en/download/)
* WebdriverIO (https://webdriver.io/)
* Mocha (https://mochajs.org/)
* Allure Report (https://webdriver.io/docs/allure-reporter/)
* Wdio Video Reporter (https://webdriver.io/docs/wdio-video-reporter)
* Google Chrome (https://www.google.com/chrome/)
* Visual Studio Code (https://code.visualstudio.com/) (but any other code editor would do)

## Test Approach
Focus should be in the individual pages and actions that can be performed where positive(e.g. happy paths),edge (e.g. max/min, ranges) and negative scenarios (e.g. wrong inputs) should be covered. 

E2E flows will be covered as well but the use of them is reduced to avoid having too many lengthy scenarios that take too much time to run.
Long E2E flows are more error-prone as well, hence they could be difficult to run sometimes.

Since the goal is that most of the test cases are automated and run constantly, it is in our best interest to keep them as short as possible. 
At the end we want everything as granular as possible but at the same time covering all that is needed (or at least most of it).
Like this, it's easier to segregate the test cases in different test suites. We can then control the execution better and reduce the execution time using parallel execution.

To design the scenarios we will need to identify the different actions that can be done in each page and all the input data that can be given, both mandatory and optional, so the correct expected result can be set. 
For this, collaboration with other QA members, Business Analyst and Product Owners will be needed.
At the moment of defining test cases try to be as meticulous as possible, take into consideration the little details.
If something is not clear or you have doubt, make a note of it and share it with the team.
You could either get an answer and know better the application or you could identify a gap that no one spotted before.

After the test cases are defined the next good thing to do is to start to classify them. 
Which ones will be your smoke test (these ideally will be run along with the PRs), which ones regression (these are more but can be run less frequently. At least once each iteration though)

Another important thing to do is to identify the test cases that require special preconditions or dependencies, like data created beforehand or a specific type of user.
This may slow down the execution while trying to meet the preconditions so having those spotted can help to plan ahead and even the preparations could be automated

Next some examples of the possible scenarios for the UI pages:

### Navigation bar
* Check the different links take you to the expected page(one test case for each link)
* For not logged in user "Logged as ${name}" should not be there
* For logged in users "Logged as ${name}" should be there

### Home page
* Validate the changing add section (Would need to know the content that is supposed to be displaying)
* Validate Recommended items section (Would need to know how the content displayed there is determined)
* Browse for specific product
* Browser products filtering by category (will end up taking the user to products page with the filter results)
* Browser products filtering by brands (will end up taking the user to products page with the filter results)
* View product details (will end up taking the user to products page)

### Products Page
* Search valid product with search field
* Search invalid product with search field
* Search product with filter by category
* Search product with filter by brands
* Add product to cart -  continue shopping
* Add product to cart -  view cart
* View product details - add to cart - negative quantity
* View product details - add to cart - positive quanity
* View product details - add to cart - max quantity
  (Need to check how the max is defined, either in general or per product. What to do if the user tries to add more)

* View product details - leave a review - no input
* View product details - leave a review - just name
* View product details - leave a review - just email
* View product details - leave a review - just message
* View product details - leave a review - miss one input field
* View product details - leave a review - all fields

### Cart Page
* Validate cart items are the expected
* Remove item
* Proceed to Checkout - No user logged in - Continue on Cart
* Proceed to Checkout - No user logged in - Register/Login
* Proceed to Checkout - Logged in user - Register/Login

### Checkout Page
* Validate order items are the expected
* Place order with comment
* Place order without comment

### Payment Page
* Try to submit - without input
* Try to submit - with card name only
* Try to submit - with card name only

## Automation Approach
### Scope
As mentioned above, many test cases can be defined for the application under test but to keep it simple only one E2E flow will be covered which has multiple flows in it:

1. Enter the website and scroll down about halfway down the page.
2. Chose a product and click on “View product” under the picture of the product.
3. In the Quantity box enter 30
4. Click “Add to cart”
5. Click on “Proceed to Checkout”
6. Fill in an email address and click on “Register / Login”
7. Enter name and email under “New User Signup”
8. Fill in all information and click on “Create Account”
9. Click on “Continue” under “ACCOUNT CREATED!” title
10. Click on the Cart in the header
11. Click on “Proceed to checkout”
12. Add a comment and click on “Place Order”
13. Fill in fake Credit Card information and click on “Pay and Confirm Order”
14. Click on “Continue” button
15. Click on “Logout” on top header
16. On the “Login to your account” box and enter with previously created user
17. Click on “Contact us” on the header
18. Fill required data and Click on “Submit”
19. Press “OK” in the pop up
20. Finally, click on the “Logout” button on the header.

### Implementation
The page object model approach will be used. A page.js file will be created for each page of the UI with xpaths of the elements to use and methods to the actions that can be done in that page.
There could be common actions amongst the pages. That functionality will be in base.page.js file and the other page files will extend from it so, it is defined once but available wherever is needed.

The aim will be to have granularity. The actions that could be used in more than one place, better encapsulate them in smaller methods to have the building blocks to create bigger flows. 
For example, in the different forms that are in the application, it's better to have a method to give the input data only instead of having in the same method the submission of the form. 
There could be flows where we want to input the information and then do another action, validate something instead of submit. 
That way the same method to give the input data can be used in both positive and negative scenarios (giving the proper input data of course)
This will help to create new flows faster and reduce maintenance effort.

Another aspect to keep into consideration is the data-driven approach.
There are scenarios where the same steps are done just with different data (e.g. login/signup) so this could be beneficial to leverage. 
This can also help if there are multiple environments for the application (which is pretty common)
This can be a future enhancement for the project

### Reports
Apart from the default spec report (which only gives you a summary in console of the execution), Allure report is used in the project. 
This will save the information of the execution on a folder called allure-results. 
Using the allure commandline tool, a html report can be generated out of the information from the allure-results folder. 
This will be stored in allure-report folder.

In the wdio.conf.js there is code in some of the hooks to delete these 2 folders and create the report at the end of the execution automatically so just need to execute npx allure open command in the terminal to open it. 

This makes difficult to share the report with other members since this spins a local server to open the report properly and that would mean they need to have some setup on their machines. To avoid this is adviced to have a centralized place where the executions are run and the report publish for easier access but there is a workaround with a tool to create a pdf out of the allure report. Reference : https://github.com/MihanEntalpo/allure-single-html-file

Another report option is the video reporter which takes multiple screenshots during the execution and at the end generates a video out of them.
The good thing is that it integrates well with allure report. It embeds the video into the html report without additional setup
The bad thing is that it can make the execution go a bit slower and consume more storage in your machine. Also, it was identified that it fails when an alert appears.
You would need to make the reporter skip taking a screenshot when that happens to avoid the failure.

To avoid using this report you can simply comment it out from the reporters section in the wdio.conf.js file:

```
wdio.conf.js:

const allure = require('allure-commandline');
const video = require('wdio-video-reporter');
import fs from "fs";

exports.config = {
...
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false,
            addConsoleLogs: true,
        }],
        // [video, {
        //     saveAllVideos: true,
        //     outputDir: 'video-report',
        //     addExcludedActions: ['click']
        // }]
        //'reportportal',
    ],
...
}
```
For more information about the configurations of the reports you can visit the reference links shared in the [Tools](#tools) section

## Installation
Installing NodeJS wille be the starting point. Visit the page above and download it for your OS. 
With NodeJS the rest of the javascript dependencies will be downloaded using the NPM.

### For reusing this project
To follow the content in this project:

* Clone the project
* Open a terminal on the project location
* Run `npm install` command in the terminal
    
Ideally the modules versions shouldn't be a problem. The one that may need to be updated is the chromedriver depending on your chrome version.
Just update the chromedriver version in the package.json to the one that matches your browser.

### For new project
If you would like to create your own project from scratch, you can run in a terminal the command 

        npm init wdio .

This will download the relevant Webdriver io packages from the web and help to setup wdio file, used for settings and manage the framework execution

* Install allure reporter

        npm install @wdio/allure-reporter --save-dev

* Need allure command line to generate the report

        npm install -g allure-commandline --save-dev

* Install wdio video reporter (optional)

        npm install wdio-video-reporter

## Usage
There are several forms to run your test cases. The easiest one is to execute

    npx wdio run wdio.conf.js

or simply

    npx wdio

This runs the test cases using the wdio as input to know what test cases to execute and other settings like wait times, instances to spawn, browser driver to use, etc.
After an execution you can run `npx allure generate allure-results` to create the report and `npx allure open` to open it. To clean/remove the allure-results `npx allure generate --clean allure-results`

Although the project already has settings to have the allure-results folder cleaned before the tests execution and the report generated after so you just have to open it
    
**Note:** Each new test execution will replace the last report. Back it up in case you want to keep it

In the wdio.conf.js file it will be important to define which spec/suites to run:

```
wdio.conf.js:

const allure = require('allure-commandline');
const video = require('wdio-video-reporter');
import fs from "fs";

exports.config = {
...
    specs: [
        './test/specs/automation-exercise/**.js',
    ],
...
}
```

Since here we only have one test case we can leave the configuration as is but keep it in mind for when you have more tests and suites

As an extra input on the tool, you can use additional configuration files when executing. For example, for different environments.
An example of the command will be 

    npx wdio config/stg.conf.js

This still uses the wdio.conf.js file but will also use the additional specified conf.js file and will override or add additional parameters like URL, accounts, numbers, etc. specific of an environment

There are more parameters that can be added to the command like `--spec` to specify a particular spec(s) file(s) or `--exclude` to ignore spec files

One thing to note is that there are plenty Wdio Hooks that can be configured from the wdio.conf.js file. This are like test/suite setup/teardown.
We use some of these to clean and generate the allure reporter each run and another hook to make the framework take a screenshot when there is a failure

Custom scripts can be created from the package.json file to define like batch files to run specific sets of tests easier.
Then you need to run the command to call that specific script. Example of the command:

    npm run automation-test-store-tests

This will need 'automation-test-store-tests to be added in the package.json file:
```
package.json file:
{
...
	"scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "wdio": "wdio run wdio.conf.js",
        "automation-test-store-tests": "npx wdio --spec test/specs/automation-test-store/*.spec.js"
    },
...
}
```
Custom test suites can be created from the wdio file as well:
```
wdio.conf.js:

const allure = require('allure-commandline');
import fs from "fs";
const commands = require('./utils/commands.js');

exports.config = {
...
    suites: {
        smoke: [
            'test/specs/automation-test-store/add-items-to-basket.spec.js',
            'test/specs/webdriver-university/locating-elements.spec.js',
            'test/specs/webdriver-university/contact-us.spec.js'
        ],
        automationteststore: [
            'test/specs/automation-test-store/add-items-to-basket.spec.js'
        ]
    },
...
}
```
Run the following command to run them:

    npx wdio --suite smoke

Both of these approaches, custom scripts and custom suites, can be combined by having the suites in the wdio file and adding a script in the package.json
to execute them

This is not implemented in the current project since there is only one test case as of now 
but most surely this will come in handy once there are more automation test cases created

## More Links
* WebdriverIO Docs - https://webdriver.io/docs/gettingstarted
* WebdriverIO API  - https://webdriver.io/docs/api

![WebdriverIO Logo](https://v6.webdriver.io/img/webdriverio.png)
