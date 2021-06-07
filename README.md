# RN-Challenge
WellMart is a team of fun, fast, and friendly builders. Everyone from interns to the CEO have some level of technical skill. Everyone is judged based on their creation and outcome. Not their background. Not their appearances.

We welcome all kinds of builders, creators, and designers. This challenge is specifically for developers. We don't care much about your resume. If you think you can build awesome products and learn fast. This challenge is for you.

This is a set of open ended challenges for you to show us your skills. Clone this repo, build an awesome app, and open a PR. The whole team will review your creation.

## Instructions
### 1. Learn
- Feel free to learn from any resources. [React Native Website](https://reactnative.dev), [YouTube](https://www.youtube.com/results?search_query=react+native+tutorial), etc. 
- We have a udemy account you can borrow (reach out to team@wellmart.id). This one is really good. Please reach out!

### 2. Build
- You have 1 week to complete the challenge. We can see the commits timeline
- Implementation (code) and design (UI/UX) will be evaluated

### 3. Show
- Impress us with your skills
- Go beyond the requirements
- Beat the competition
- Join us
- Win

### Submissions
- Setup your dev environment by following this ([React Native Getting started Guide](https://reactnative.dev/docs/getting-started))
- Clone the challenge repository
- Create a dedicated branch
- Write your code
- Commit your changes
- Fork the challenge repository
- Issue a Pull Request
- Notify us. Please send an email to team@wellmart.id

### Suggestions
- Make it easy for us to try your app. Add instructions on how to run your demo. There's a section below you can fill in
- Don't be afraid if you're still a newbie. We will judge what you built adjusted with your experience. If you're just starting out, but can learn fast. We want you :)
- Make something fun. We love to party too! :D
- You can use Expo or Vanilla React Native. Our codebase is Vanilla (Ejected from Expo) though. Here's to learn more about [Expo workflows](https://docs.expo.io/introduction/managed-vs-bare/)
- Get used to coding in TypeScript
- Be prepared to explain your decisions and your thought process in the next interview. We're curious about how you think! :)

## Challenge
Joko is a very responsible and organized person. He writes down all his to-do items in a day. And clears all the things he needs to do before the day ends

Create a React Native app where Joko can keep track of the things he need to do in his day

## Requirements
Your app should be able to complete these tasks:
- Add a new to-do item
- Mark a to-do item as done
- Delete a to-do item
- Edit a to-do item
- Display all to-dos in a list or a grid
- Filter between completed and incomplete items

### Bonus:
- Enable search for the to-do items
- Include animations
- Persist data using Contexts and/or Async Storage
- Call some public API (image, video, weather, clocks, up to you)
- Save data to a backend server (like firebase)
- Do some kind of sharing
- Somehow make this boring app fun! show some crazy pokemon animation or something :P

## How to run the demo
1. Run the app -- for best experience use web browser.
2. Register with your email (I use firebase authentication on this feature).
3. Login with your registered email.
4. You can add, edit, and remove task (I use firestore to store the data).

notes = process status show in console (success/error).

### Things that need to improve
1. I hit firestore api every task being updated, i think this is bad because app will too often call the firestore api. For the next improvement, i think i will make task being updated just when user logout or every day.
2. I make feature that can group the task by date. So user can make future to-do-list. for now, there is only interface but the feature doesn't work.
3. User experience and User Interface.
4. Clean the code. I make this app with brute-force technique due to lack of time given and my knowledge about the stack.
5. I use localfile for image source, in Expo the image will not shown. So, i use url image that i store on gcs (google cloud storage). But, the image is blinking it's like the image is always rendering. I still dont have solution for this problem.
6. Styling in Expo is different from web browser. I will learn more to fix this.
7. Validation for every input.
8. Use async storage.
9. Make search feature

I want to share about how i build this app. For me, this is quite challenging because this is my first time use react, react-native, typescript, firebase firestore to build app and i haven't worked on frontend in long time maybe 6-7 months cause i focused on backend tech like php and go. As you can see maybe this app is kinda messed up because i build this app while learning about the tech stack (react, react-native, typescript, firebase) with the given time i haven't able to make this app clean. I feel i learned a lot from working on this project.



