// ==UserScript==
// @name       Studietijdmeting Auto-Filler
// @namespace  studietijdmeting.is.boring
// @version    1.0
// @description  Automatically fills in the Studietijdmeting according to maxHours per course
// @match      https://studietijdmeting.howest.be/stm/student/listModulesAndPartimsForStudietijdmetingByStudent.jsp
// @copyright  2013+, Alex Van Maele
// @require    http://code.jquery.com/jquery-latest.pack.js
// ==/UserScript==

console.log("Studietijdmeting Auto-Filler loaded!");


var ignoreExistingTimes = false; // Set to true to overwrite existing times
var minHours = 1; // Minimum hours possible
var courses = { };

// Edit your courses like:
// courses["courseName"] = maxHoursForCourse;
courses["Beveiligingsproject"] = 10;
courses["Java"] = 4;
courses["Onderzoeksproject"] = 6;



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
		$('.partim:contains("'+ course +'")').parent().find("td:not(.partim)").find("input").each(function(e)
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
