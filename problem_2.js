// Calculate Cutoff for Given Marks
// Check Whether he/she is eligible to apply the course

/* Input */
const studentMarks = {
  maths: 50,
  physics: 50,
  chemistry: 50,
  biology: 50,
};
/* Input */

/* Logic Implementation Function */
let cutoff = 0;
function calculateCutoff(marksJson) {
  for (const iter in marksJson) {
    console.log(marksJson[iter]);
    cutoff = cutoff + marksJson[iter] / 4;
  }
  console.log("The cutoff is:" + cutoff);
}

const eligibilityCutOff = 75;
function checkEligibility(mark) {
  if (mark > eligibilityCutOff) {
    console.log("YOU ARE ELIGIBLE ");
  } else {
    console.log("BETTER LUCK NEXT TIME");
  }
}
/* Logic Implementation Function */

/* Function Call */
calculateCutoff(studentMarks);
checkEligibility(cutoff);
/* Function Call */

/* Expected Output */

// The cutoff is: 77.80
// You are Eligible

/* Expected Output */
