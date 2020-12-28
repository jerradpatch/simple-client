# simple-client
simple client architecture using axios, typescript, moca, chai, and mock axios

# Instructions

- note the "dist" folder is commited, normally it wouldnt be. However, in order to make it so the typescript doesnt have to be compile,
- node version "v14.15.0" or greater this was ran with. I would recommend installing node with "nvm" using this repo "https://github.com/nvm-sh/nvm"

1) clone the directory
2) install node
3) while in the directory run "npm i"
4) run the script with "npm run start" and the data should be output to the terminal
optional 5) run tests with "npm run test" 

- note: I didnt code up the tests for each function and validating output. Setting up the project, analysis, and writing the code, I believe is enough to get what was wanted from this exercise. I would have liked an expected output to compare my resulting output with.

example output below

```bash
> npm run start
{"amount":123.46,"id":0,"is_in_payment_plan":true,"next_payment_due_date":"2020-12-28T05:42:23.569Z","remaining_amount":20.96}
{"amount":100,"id":1,"is_in_payment_plan":true,"next_payment_due_date":"2020-12-28T05:42:23.569Z","remaining_amount":50}
{"amount":4920.34,"id":2,"is_in_payment_plan":true,"next_payment_due_date":"2020-12-28T05:42:23.569Z","remaining_amount":607.67}
{"amount":12938,"id":3,"is_in_payment_plan":true,"next_payment_due_date":"2020-12-28T05:42:23.569Z","remaining_amount":9247.74}
{"amount":9238.02,"id":4,"is_in_payment_plan":false,"next_payment_due_date":"2020-12-28T05:42:23.569Z","remaining_amount":9238.02}
```

# Implementation details
1) started by analizing the desired output and seeing the keys are derived
2) decided that the keys were best derived by following a method similar to how I would imagine SQL would do it.
  a) merging everything into a single table
  b) itterating over that resulting array to pull out the derived keys
3) setup the base client configuration with folder structure, typescript, services, testing, and environment configuration.
4) wrote the code from point 2

# improvements
1) improved unit and integration tests
2) circleci script to validate that the installation and run process will work on any machine
3) using sql lite to do selections before aggregating over the results to derive the desired keys
