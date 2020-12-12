$(document).ready(function () {
    // Set current day
    $('#currentDay').text(getCurrentDay())

    // Event listener for the save button
    $("button, i").click(function (event) {
        const time = event.target.id
        const task = $.trim($(`#${event.target.id}-event`).val())
        saveEvent(time, task)
    });
});

function getCurrentDay() {
    return moment().format('MMMM Do YYYY, h:mm a')
}

function saveEvent(time, task) {
    const eventIndex = events.findIndex(e => e.time === time)
    events[eventIndex] = {...events[eventIndex], task}
    localStorage.setItem('events', JSON.stringify(events));
}

function renderEvents(events) {
    events.forEach(event => {
        $(".container").append(`
            <div class="row">
                <div class="hour">${event.time}</div>
                <textarea id="${event.time}-event" name="${event.time}" class="${getHourState(event.hour)}">
                    ${event.task}
                </textarea>
                <button class="saveBtn" id="${event.time}"><i class="fas fa-save" id="${event.time}"></i></button>
            </div>`
        );
    })
}

function getHourState(hour) {
    const currentTime = moment().hour()
    if (currentTime > hour) return "past"
    if (currentTime < hour) return "future"
    if (currentTime === hour) return "present"
}

const workHours = [9, 10, 11, 12, 13, 14, 15, 16, 17]
const savedEvents = JSON.parse(localStorage.getItem('events'));
const events = savedEvents ? savedEvents : workHours.map(hour => ({ hour, time: moment().hour(hour).format('ha'), task: "" }))

renderEvents(events)