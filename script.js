
const slotsDiv = document.getElementById("slots");
const bookedDiv = document.getElementById("bookedSlots");


const API_URL = "http://localhost:5050";



const sampleSlots = [
    { id: 1, slot_time: "09:00 AM" },
    { id: 2, slot_time: "10:00 AM" },
    { id: 3, slot_time: "11:00 AM" },
    { id: 4, slot_time: "02:00 PM" }
];


const sampleBookedSlots = [
    { slot_time: "12:00 PM", booked_by: "Rahul" },
    { slot_time: "01:00 PM", booked_by: "Priya" },
    { slot_time: "03:00 PM", booked_by: "Arjun" }
];


function loadSlots() {

    fetch(API_URL + "/get_slots")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            
            displaySlots(data.available_slots);
        })
        .catch(function() {
            
            displaySlots(sampleSlots);
        });

}


function displaySlots(slots) {

   
    slotsDiv.innerHTML = "";

    
    slots.forEach(function(slot) {

       
        let button = document.createElement("button");
        button.innerText = slot.slot_time;

        button.onclick = function() {

            let name = prompt("Enter your name");

            if (!name) {
                alert("Please enter your name");
                return;
            }

           
            fetch(API_URL + "/book_slot", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    slot_id: slot.id,
                    name: name
                })
            })
            .then(function(res) {
                return res.json();
            })
            .then(function(response) {

                alert(response.msg);

                loadSlots();
                loadBookedSlots();
            })
            .catch(function() {

                alert("Demo mode: booking not saved");

            });

        };

       
        slotsDiv.appendChild(button);

    });

}



function loadBookedSlots() {

    fetch(API_URL + "/booked_slots")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            displayBookedSlots(data.booked_slots);

        })
        .catch(function() {

            displayBookedSlots(sampleBookedSlots);

        });

}


function displayBookedSlots(slots) {

    bookedDiv.innerHTML = "";

    slots.forEach(function(slot) {

        let div = document.createElement("div");

        div.className = "booked-item";

        div.innerText = slot.slot_time + " - " + slot.booked_by;

        bookedDiv.appendChild(div);

    });

}


loadSlots();
loadBookedSlots();