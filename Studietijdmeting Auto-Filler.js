// ==UserScript==
// @name       Studietijdmeting Auto-Filler
// @namespace  studietijdmeting.is.boring
// @description  Automatically fills in the Studietijdmeting according to maxHours per course.
// @match      *://*.studietijdmeting.howest.be/stm/student/listModulesAndPartimsForStudietijdmetingByStudent.jsp*
// @require    http://code.jquery.com/jquery-latest.pack.js
// @grant	none
// ==/UserScript==

console.log("Studietijdmeting Auto-Filler loaded!");


var ignoreExistingTimes = false; // Set to true to overwrite existing times
var minHours = 1; // Minimum hours possible
var courses = { };

// Edit your courses like:
// courses["courseName"] = maxHoursForCourse;
courses["Stage en eindwerk"] = 10;
courses["Forensische ICT tools"] = 4;
courses["Linux Server security"] = 4;



function getRandomTime(minHours, maxHours)
{
	var hours = Math.floor((Math.random()*maxHours)+minHours);
	var minutes = 30 * Math.floor((Math.random()*2));
	minutes = minutes == 0 ? "00" : minutes;
	return hours + ":" + minutes;
}

function fillTimes()
{
	for(course in courses)
	{		
		$('th, .partim:contains("'+ course +'")').parent().find("td:not(.partim)").find("input").each(function(e)
		{
			if(ignoreExistingTimes || ($(this).val() == "" || $(this).val() == "00:00" || $(this).val() == "0:0"))
			{
				var randomTime = getRandomTime(minHours, courses[course]);
				$(this).val(randomTime);
			}
		});
	}
}

fillTimes();