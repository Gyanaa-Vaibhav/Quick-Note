import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"


// Configuring Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCGr-nPwqd-cgB3JHpZdSDfruPxsb0ZXaE",
    authDomain: "notes-app-76e51.firebaseapp.com",
    projectId: "notes-app-76e51",
    storageBucket: "notes-app-76e51.appspot.com",
    messagingSenderId: "41418695797",
    appId: "1:41418695797:web:7f26fe29a6f94c8720843c",
    // DataBase URL : Form Firebase Realtime Data
    databaseURL : "https://notes-app-76e51-default-rtdb.asia-southeast1.firebasedatabase.app/"
}

const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
console.log(database)
// Linking with database
const referenceInDb = ref(database,"Note") 


// Fetching From Database using onValue works as getItem
onValue(referenceInDb, function (snapshot) {
    // Used to get items after deleting everything
    if (snapshot.exists()) {
        const exisitingNote = Object.values(snapshot.val())
        renderLeads(exisitingNote)
    }
})

let Notes = []
const input = document.querySelector(".input-btn")
const save = document.querySelector(".save-btn")
const clear = document.querySelector(".clear-btn")
const output = document.querySelector(".output-bx")

// Saving Notes
save.addEventListener("click", function () {
    Notes.push(input.value)
    // push() acts like array.push
    push(referenceInDb, input.value)
    input.value = ""
    renderLeads(Notes)
})

// Clearing Notes
clear.addEventListener("click", function () {
    Notes = []
    remove(referenceInDb)
    renderLeads(Notes);
})

// Rendering Notes
function renderLeads(lead) {
    let ans = "";
    for (let index = 0; index < lead.length; index++) {
        ans += `<li>${lead[index]}</li>`
    }
    output.innerHTML = ans
}



