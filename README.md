# PlateRate-Tester
Auto Regression Tester

Testing framework - WebdriverIO

# Prerequisites
Node JS
Visual Studio Code

# Installation

Pull project into the local folder

npm install

# Run tests in headless mode

Run all test suites
npm run test

Run specific test suite
npm run suite <suite_name>

# Run tests in locally without headless mode

Run all test suites
npm run test:local

Run specific test suite
npm run suite:local <suite_name>

# Environment variables
ENV=test will run test on test environment - i.e ENV=test npm tun test
ENV=staging will run test on test environment - i.e ENV=staging npm tun test
