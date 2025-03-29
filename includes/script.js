$(document).ready(()=> {
    let dateStart, dateEnd;
    //Date Starting today (No Past dates able to select)
    dateStart = $("#dateStart").datepicker({
        showAnim: "slideDown",
        minDate: 0,
        maxDate: "+1y",
        onSelect: (dateText, inst) => {
            newStartDate(dateText)
        }
    });
    //Date Up To a Year
    dateEnd = $("#dateEnd").datepicker({
        showAnim: "slideDown",
        minDate: "+1d",
        maxDate: "+1y"
    });
    //Making a new min date for my dateEnd, creating new date object and setting as one day after
    let newStartDate = ((dateText)=>{
        try {
            let newDate =  new Date(dateText)
            newDate.setDate(newDate.getDate() + 1);
            dateEnd.datepicker("option", "minDate", newDate);
        } catch(err) {
            $("#errorMessage").html("Date not selected...");
            console.log(err)
        }
    });
    //Calculate Stay
    const oneDay = 24 * 60 * 60 * 1000;
    //Map a room to a price
    const roomMap = new Map([
        ["Standard", 159],
        ["Double", 229],
        ["Suite", 359]
    ]);

    //Show results
    let showResults = ((duration, roomChoice) => {
        let roomCost = roomMap.get(roomChoice); //Get the room price based on the choice.
        let totalCost = (duration * roomCost);
        $("#bookingResults").html(`
            <h4>Thank you for booking...</h4>
            <p class="card-text">Your length of stay is ${duration} days.</p>
            <p class="card-text">$${roomCost} per night in the ${roomChoice} room.</p>
            <p class="card-text">Total is $${totalCost}</p>
        `);
    });

    $("#errorMessage").hide();
    $("#btnBookStay").on("click", ()=>{
        try{ 
            $("#errorMessage").hide();
            let startDate = dateStart.datepicker( 'getDate' );
            let endDate =  dateEnd.datepicker( 'getDate' );

            if(startDate == null || endDate == null) { 
                throw "Please select both your stay dates."; 
            }

            const roomChoice = $("input[name='btnRoomType']:checked").val();
            let duration = ((endDate - startDate) / oneDay) 
            showResults(duration, roomChoice);
        } 
        catch(err) {
            $("#errorMessage").show().html(err);
            console.log(err);
        }
    });
});