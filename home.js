import { initializeApp } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-auth.js";
import { getDatabase, ref, onValue, push, set, update } from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

const dots_vertical = document.querySelector(".dots-vertical");
const pop_up_menu = document.querySelector(".pop-up-menu");
const pop_up_menu_items = document.querySelectorAll(".pop-up-menu-item");
const capture_image = document.querySelector("#capture_image");
const open_camera = document.querySelector("#open_camera");

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
    } else {
        window.open("index.html","_self");
    }
});

pop_up_menu.setAttribute('hidden',true);

dots_vertical.addEventListener("click",function(e){
    pop_up_menu.toggleAttribute('hidden');
});

pop_up_menu_items.forEach(function(pop_up_menu_item){ 
    pop_up_menu_item.addEventListener("click",function(e){
        pop_up_menu.toggleAttribute('hidden');
        if(e.currentTarget.dataset.section === "signout"){
            if(confirm("Do you want to sign out?")){
                signOut(auth).then(() => {
                }).catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    alert(errorMessage);
                });
            }
            return;
        }
        if(e.currentTarget.dataset.section !== "close"){
            add_category.setAttribute('hidden',true);
            add.setAttribute('hidden',true);
            view.setAttribute('hidden',true);
            document.querySelector("#"+e.currentTarget.dataset.section).removeAttribute('hidden');
        }
    });
});

capture_image.addEventListener("click",function(e){
    open_camera.click();
});