
/**
 * Copyright 2017 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Search developers.google.com/web for articles tagged
 * "Headless Chrome" and scrape results from the results page.
 */

'use strict';

const puppeteer = require('puppeteer');
require('dotenv').config();

(async() => {

  // Public Vars
  const email = ['plateratetester@gmail.com', '	plateratetesteralt@gmail.com', 'michael.nti@lc.cuny.edu','bot@platerate.com'] // passwords for these accounts = ['This is not a password', 'This is a password']
  const pass = ['Bloop!', 'Wham!','12345678']
  const folderName = 'autoRegressionTester'
  const street = ['1 5th Avenue', '1 Broadway']
  const city = ['New York', 'New York','NYC']
  const zip = ['10012', '10004']
  const country = ['USA', 'USA']
  const phone = ['555-5555', '444-4444']
  const birthDay = ['01/01/1970', '03/12/2015']
  const search = ['Pizza', 'Pasta', 'Chinese Food']

  let isBrowserClosed = false

  // Public functions
  const t = () => ((new Date()).toTimeString()).slice(0,8)
  const tn = () => (new Date()).getTime()
  const tn1 = tn()

  let tally = 1

  const fnTally = () => (tally++)
  const errMsg = (tally, action, title, err) => {
    let msg = `fn() no. ${tally} - time: ${t()}. DID NOT ${action} on ${title}.  ${err}. \n`

    return msg
  }

  //Different actions that the bot will do
  const findElement = async(elem, title, action, input, isFullPage) => {
    let msg, isError = false, tally = fnTally()
    
    if (!isBrowserClosed) {
      try {
        if (action === 'check') {
          const checkbox = await page.$(elem)
        } else {
          await page.waitForSelector(elem, true, false, timeout)
        }
        try {
          if (action === 'type') {
            await page.type(elem, input, title)
          } else if (action === 'click') {
            await page.click(elem)
          } else if (action === 'check') {
            await checkbox.click()
            const checked = await page.evaluate(checkbox => checkbox.checked, checkbox)
          } else if (action === 'upload') {
            await page.upload(elem)
          } else if (action === 'photograph') {
            let path = `${title}.png`
            await page.screenshot({ path, fullPage: isFullPage })
          } 
          msg = `fn() no. ${tally} - time: ${t()}. '${title}' (${elem}) was ${action}${action === 'type' ? 'd' : 'ed'}.\n`
          await page.screenshot({ path: `${tally}.png`, fullPage: true })
        } catch(err) {
          msg = errMsg(tally, action, title, err)
          isError = true
        }
  
      } catch(err) {
        msg = errMsg(tally, action, title, err)
        isError = true
      }
  
      console.log(msg)
      if (isError) {
        findElement('body', title, 'photograph', 'dummyStr', true).then( () => {
          browser.close()
          isBrowserClosed = true
        })
        
      }
    } else {
      console.log(`${errMsg(tally, action, title, err)} The Browser is now closed.\n`)
    }
  }

  // launch browser, open brower page
  const browser = await puppeteer.launch({
    devtools: false,
    headless: false,
    slowMo: 40 
    // slow down by 205ms
  })
  //const browser = await puppeteer.launch()

  console.log(`fn() no. ${fnTally()} - time: ${t()}. Launched the Chromium Browser.\n`)
  const page = await browser.newPage()
  console.log(`fn() no. ${fnTally()} - time: ${t()}. Opened a Chromium Browser page.\n`)
  const urls = ['https://staging.platerate.guru', 'http://localhost:3003/']

  
  // Navigate to URL
  const timeout = 1000 * 60 * 5
  await page.goto(urls[0], timeout)
  console.log(`fn() no. ${fnTally()} - time: ${t()}. Navigated to ${urls[0]}.\n`)

  //FIXED FEEDBACK LINK
 /*** FEEDBACK LINK WORK IN PROGRESS: the robot does not find the feedback link element because it did not click the nav bar. Now fixed***/

  //Clicks tab on home page
  await findElement('button[type="button"]','tab','click');

  //click the Feedback link
  await findElement('a#feedback','Feedback link','click')

  // /* FEEBACK FORM: EMAIL, SUBJECT AND TEXT-INPUT AND SUBMISSION */
  await findElement('input#user-email.form-control','email','type',email[0])

  // Type Subject
  await findElement('input#feedback-subject.form-control','subject line','type',pass[0])

  // Type Sharing Feeback
  await findElement('textarea.form-control', 'textarea', 'type', 'Hello, this is the Auto-regression tester.  I\'m testing the feedback e-mail functionality.')

   // Click on Send Feedback
   await findElement('button.btn.btn-default', 'Send Feedback', 'submit')

  /**BELOW IS NAVIGATIONG THROUGH HOME/SEARCH - James Cervantes */

  //Clicks tab on home page
   await findElement('button[type="button"]','tab','click');

  // clicks "Home/Search"
   await findElement('a[href="/"]','home-search','click');

  //to Food&Drink
   await findElement('a#toMenuItem','Food&Drink_link','click');

  //Search pizza
   await findElement('input#search', 'Search_For_Food', 'type', search[0]);

  //type location
   await findElement('input#locationinput','Type_Your_Location','type',city[2])

  //click search button
   await findElement('button#searchbutton','Press_Search Food_Button','click');

  //Make selection on restaurant
   await findElement('a[href="/menuitems/4c6c3b1323c1a1cd5efc18cf/5b182caf56cf750dc2684f64"]', 'Choose_Your_Restaurant', 'click');

  /* ^^^^^ABOVE ARE NAVIGATIONS THROUGH HOME/SEARCH^^^^*/

  /**NAVIGATE TO LOG IN PAGE */

  //click Navbar_Toggle
  await findElement('button.navbar-toggle','navbar_Toggle','click')
  
  //CLICK ON LOG IN LINK
  await findElement('a[href="/users/login"]','Click_On_LogIn_Link','click')

  /**^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ */

  // Type email
  await findElement('input[type="email"]', 'email', 'type', email[2])

  // Type password
  await findElement('input[type="password"]', 'password', 'type', pass[2])

  // Click on submit
  await findElement('button[type="submit"]', 'Log In', 'click')

  // Click on the navbar toggle
  await findElement('button[type="button"]', 'Navbar Toggle', 'click')

  // Click on My PlateRate LinkTypeC
  await findElement('a[href="/users/profile"]', 'My PlateRate link', 
  'click')

  // Click on Name and Email accordion
  await findElement('a[href="#collapseZero"]', 'Name and Email accordion', 'click')

  // Upload picture
  //await findElement('#fileInput', 'avatar upload', 'upload', 'selfie.jpeg')
  
  // Type First Name
  await findElement('input#firstName', 'First Name', 'type', 'James')
  
  // Type Last Name
  await findElement('input#lastName', 'Last Name', 'type', 'Cervantes')
  
  // Type Email
  await findElement('input#email', 'Email', 'type', email[2])
  
  // Click on Personal Information
  await findElement('a[href="#collapseOne"]', 'Personal Information accordion', 'click')
  
  // Type Street
  await findElement('input#street', 'Street', 'type', '1714 Yates Ave')
  
  // Type City
  await findElement('input#city', 'City', 'type', 'Bronx')
  
  // Type Zip code
  await findElement('input#postalCode', 'Zip Code', 'type', '10461')
  
  // Type Country
  await findElement('span#select2-country-container', 'Country', 'click')
  
  //Choose country
  await findElement('input.select2-search__field','United_States','type','United States')

  // Type Phone
  await findElement('input#phone', 'Phone', 'type', '7183064656')
  
  // Type Birthday
  await findElement('input#birthday', 'Birthday', 'type', '08-31-1995')
  
  // Type Gender
  // await findElement('select#gender','Choose_gender','click')

  // await findElement('option[value="Female"]','Chose_Female', 'click')
  
  // Check Contact Preferences: By Email
  await findElement('input#byEmail', 'By Email', 'click')
  
  // Check Contact Preferences: By Sms
  await findElement('input#bySms', 'By Text Message', 'click')
  
  // Check Contact Preferences: By Sms
  await findElement('input#never', 'Please don\'t contact me', 'click')

  // Click on Dietary Preferences
  await findElement('a[href="#collapseTwo"]', 'Dietary Preferences accordion', 'click')
  await findElement('input[type="checkbox"]', 'No dietary preference', 'click')
  /****Check Dietary Preferences****/
  // for (let i = 0; i<47; i++) {
  //   const selector = `input:nth-child(${i}).diet-options`
  //   console.log(`Clicking ${selector}`)
  //   const checkbox = await page.$(selector)
  //   await checkbox.click()
  //   const checked = await page.evaluate(checkbox => checkbox.checked, checkbox)
  //   console.log(`${selector} is checked`, checked)
  // }

  var list = ['input#Almond-Free.diet-options','input#Antibiotic-Free.diet-options','input#Biodynamic.diet-options']
  var randomN = Math.floor(Math.random()*3);
   await findElement(list[randomN],'diet-options','click')


  // Click on Sensory Experience
  await findElement('a[href="#collapseTa"]', 'Sensory Experience accordion', 'click')
  
  // Set Sweet Slider
  await findElement('input#sweet', 'sweet slider', 'type', '0, 10')
  
  // Set Salty Slider
  await findElement('input#salty', 'salty slider', 'type', '10, 20')
  
  // Set Umami Slider
  await findElement('input#savory', 'umami slider', 'type', '20, 30')
  
  // Set Bitter Slider
  await findElement('input#bitter', 'Bitter slider', 'type', '30, 40')
  
  // Set sour Slider
  await findElement('input#sour', 'sour slider', 'type', '40, 50')
  
  // Set spicy Slider
  await findElement('input#spicy', 'spicy slider', 'type', '50, 60')
  
  // Set healthy Slider
  await findElement('input#healthy', 'healthy slider', 'type', '60, 70')
  
  // Set presentation Slider
  await findElement('input#presentation', 'presentation slider', 'type', '70, 80')
  
  // Set Portion Size Slider
  await findElement('input#quantity', 'Portion Size slider', 'type', '80, 90')
  
  // Set Value for Price Slider
  await findElement('input#value_for_price', 'Value for Price slider', 'type', '90, 100')
  
  // Click on Restaurant Preferences
  await findElement('a[href="#collapseRp"]', 'Restaurant Preferences accordion', 'click') 
  
  // Set Noise level Slider
  await findElement('input#noise_level', 'Noise level slider', 'type', '0, 10')
  
  // Set Service Slider
  await findElement('input#service_rating', 'Service slider', 'type', '10, 20')
  
  // Set Ambiance Slider
  await findElement('input#classy_ambience', 'Ambiance slider', 'type', '20, 30')
  
  // Set Ambiance Slider
  await findElement('input#cleanliness', 'Ambiance slider', 'type', '30, 40')


  // Click on Past Ratings
  await findElement('a:nth-child(6)', 'Past Ratings accordion', 'click')
  
  // Take picture of past ratings page
  await takeApic('past_ratings', true)

  // Click on Account Settings
  await findElement('a:nth-child(7)', 'Account Settings accordion', 'click')

  // Click on Password Change
  await findElement('a[href="/users/password/change"]', 'Password change button', 'click') 

  // Type current Password
  await findElement('input[placeholder="Current Password"]', 'Current Password input', 'type', pass[0])

  // Type New Password
  await findElement('input[placeholder="New Password"]', 'New Password input', 'type', pass[1])

  // Type Confirm New Password
  await findElement('input[placeholder="Confirm New Password"]', 'Confirm New Password input', 'type', pass[1])

  // In case of Error pop-up, Click on Cancel button
  await findElement('button.confirm', 'Error Pop-up confirm button', 'click')

  // Click on Account Settings a 2nd time
  await findElement('a:nth-child(7)', 'Account Settings accordion', 'click')

  // Click on Password Change a 2nd time
  await findElement('a[href="/users/password/change"]', 'Password change button', 'click') 

  // Type current Password a 2nd time
  await findElement('input[placeholder="Current Password"]', 'Current Password input', 'type', pass[1])

  // Type New Password a 2nd time
  await findElement('input[placeholder="New Password"]', 'New Password input', 'type', pass[0])

  // Type Confirm New Password a 2nd time
  await findElement('input[placeholder="Confirm New Password"]', 'Confirm New Password input', 'type', pass[0])

  // In case of Error pop-up, Click on Cancel button
  await findElement('button.confirm', 'Error Pop-up confirm button', 'click')

  // Click on the Add Referrer Accordion
  await findElement('a:nth-child(8)', 'Add Referrer Accordion', 'click')

  // Input referrer e-mail
  await findElement('input#referrer-email', 'Email', 'type', email[1])

  // Click on Send Invite Button
  await findElement('button.send-referral', 'Send Invite Button', 'click')
  
  // Click on Home/Search Link
  await findElement('a[href="/"]', 'Navbar Toggle', 'click')

  // Click on Share Link
  await findElement('a[href="/socialshare"]', 'Social Share link', 'click')

  // Click on Twitter social share button
  await findElement('iframe.twitter-share-button', 'Twitter social Share button', 'click')
  await takeApic('twitterPopup', true)

  // Click on Facebook social share button
  await findElement('iframe[title="fb:share_button Facebook Social Plugin"]', 'Facebook social Share button', 'click')
  await takeApic('facebookPopup', true)

  // Click on LinkedIn social share button
  await findElement('span#li_ui_li_gen_1527968981535_0', 'LinkedIn social Share button', 'click')
  await takeApic('linkedInPopup', true)

  // Click on Google social share button
  await findElement('iframe[title="G+"]', 'Google social Share button', 'click')
  await takeApic('googlePopup', true)

  // Type Social Share E-mail
  await findElement('input#referrer-email', 'Email', 'type', email[1])

  // Type Social Share E-mail text
  await findElement('textarea.form-control', 'textarea', 'type', 'Hello, this is a test')

  // Click on Send Invite button
  await findElement('button#sent_invite', 'social share e-mail send button', 'click')
    
  // Click on Feedback link
  await findElement('#feedback', 'Feedback link', 'click')
  
  // Enter subject on subject line
  await findElement('input#feedback-subject', 'subject line', 'type', 'testing')
  
  // Type Social Share E-mail text
  await findElement('textarea.form-control', 'textarea', 'type', 'Hello, this is the Auto-regression tester.  I\'m testing the feedback e-mail functionality.')
  
  // Click on Send Feedback
  await findElement('textarea.form-control', 'textarea', 'type', 'Hello, this is the Auto-regression tester.  I\'m testing the feedback e-mail functionality.')
  await findElement('button[type="submit"]', 'Feedback send button', 'click')
  
  // Click on Home/Search Link
  await findElement('a[href="/"]', 'Home/Search link', 'click')
  
  //default food tab for finding a food
  await findElement('.item-input', '\'Pizza\'', 'type', 'Pizza')
  
  // Type zipcode
  await findElement('#locationinput', 'zip code \'11385\'', 'type', '11385')
  
  // Click on Search food & drink
  await findElement('button[id="searchbutton"]', 'Search Button', 'click')
  
  // Take a picture of the results
  takeApic(title, true)
 
  // Click on Home/Search Link
  await findElement('#toRestaurant', 'Restaurant tab', 'click')
  
  //Click on Restaurant Tab
  await findElement('a[href="/"]', 'Navbar Toggle', 'click')
  
  //Type name of restaurant
  await findElement('.restaurant-input', 'Restaurant input', 'type', 'Hetman\'s')
  
  // Type zipcode
  await findElement('#locationinput', 'zip code \'11385\'', 'type', '11385')
  
  // Click on Search
  await findElement('button[id="searchbutton"]', 'Search Button', 'click')
  
  // Take a picture of the results
  takeApic('restaurant_search_result', true)
  
  // Click on 'View This restaurant'
  await findElement('.view-venue-btn', 'view this restaurant button', 'click')
  
  // Upload Restaurant picture 
  await findElement('#fileInput', 'restaurant upload', 'upload', 'restaurant.jpg')

  // Take picture of uploaded restaurant
  takeApic('restaurant_search_result', true)
  
  // Click on logout link
  const logoutLink = '#logout'
  await page.waitForSelector(logoutLink, true, false, timeout)
  await page.click(logoutLink)
  console.log(`puppeteer: I clicked on the logout link at ${t()}.\n`)

  const fileName = 'platerate.png'
  await page.screenshot({path: fileName, fullPage: true})

  console.log(`puppeteer: I took a screenshot: to view it, look for the file named ${fileName} in my root folder (${folderName}).\n`)

  console.log(`puppeteer: I will now close the browser.  From launch to close, ${tn11-tn1} milliseconds, or ${(tn11-tn1)/1000} seconds or ${(tn11-tn1)/(1000 * 60)} minutes have elapsed \n`)

  process.on("unhandledRejection", (reason, p) => {
    console.error("Unhandled Rejection at: Promise", p, "reason:", reason);
    browser.close()
  })

  await browser.close()
})()