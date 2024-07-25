//Categorizing Data

/* Input Json */
const employeeDataIn = {
  employee_1: {
    empid: "101",
    empname: "Vikram",
    empexperience: "2",
    empsalary: "10000",
    empdepartment: "IT",
  },
  employee_2: {
    empid: "102",
    empname: "Surya",
    empexperience: "3",
    empsalary: "20000",
    empdepartment: "IT",
  },
  employee_3: {
    empid: "103",
    empname: "Kamal",
    empexperience: "5",
    empsalary: "30000",
    empdepartment: "Finance",
  },
  employee_4: {
    empid: "104",
    empname: "Dhanush",
    empexperience: "2",
    empsalary: "15000",
    empdepartment: "Finance",
  },
  employee_5: {
    empid: "105",
    empname: "Surya",
    empexperience: "3",
    empsalary: "20000",
    empdepartment: "HR",
  },
  employee_6: {
    empid: "106",
    empname: "Kamal",
    empexperience: "5",
    empsalary: "30000",
    empdepartment: "HR",
  },
};
/* Input Json */

/* Logic Implementation Function */

function dataCategorizer(data, key) {
  let employeeDataOut = [];
  for (let emp in data) {
    if (data[emp][key] === categoryValue) {
      // console.log(emp+":")
      // console.log(data[emp])
      employeeDataOut.push([emp, data[emp]]);
    }
  }

  console.log(employeeDataOut);
}
/* Logic Implementation Function */

/* Function Call */
const categoryKey = "empexperience";
const categoryValue = "5";
dataCategorizer(employeeDataIn, categoryKey);
/* Function Call */

/* Expected Output */
/*
{
    employee_3:{
        empid: "103",
        empname:"Kamal",
        empexperience: "5",
        empsalary: "30000",
        empdepartment: "Finance"
    },
    employee_6:{
        empid: "106",
        empname:"Kamal",
        empexperience: "5",
        empsalary: "30000",
        empdepartment: "HR"
    }
} */
/* Expected Output */
